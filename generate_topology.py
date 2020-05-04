
import os
import json

from nornir import InitNornir
from nornir.plugins.tasks.networking import napalm_get

NORNIR_CONFIG_FILE = "nornir_config.yml"
OUTPUT_TOPOLOGY_FILENAME = 'topology.js'
CACHED_TOPOLOGY_FILENAME = 'cached_topology.json'
TOPOLOGY_FILE_HEAD = "\n\nvar topologyData = "

nr = InitNornir(config_file=NORNIR_CONFIG_FILE)

icon_type_map = {
    'router': 'router',
    'switch': 'switch',
    'bridge': 'switch',
    'station': 'host'
}

interface_full_name_map = {
    'Eth': 'Ethernet',
    'Fa': 'FastEthernet',
    'Gi': 'GigabitEthernet',
    'Te': 'TenGigabitEthernet',
}


def if_fullname(ifname):
    for k, v in interface_full_name_map.items():
        if ifname.startswith(v):
            return ifname
        if ifname.startswith(k):
            return ifname.replace(k, v)
    return ifname


def if_shortname(ifname):
    for k, v in interface_full_name_map.items():
        if ifname.startswith(v):
            return ifname.replace(v, k)
    return ifname


def get_icon_type(device_cap_name):
    return icon_type_map.get(device_cap_name, 'unknown')


def get_host_data(task):
    task.run(
        task=napalm_get,
        getters=['facts', 'lldp_neighbors_detail']
    )


def normalize_result(nornir_job_result):
    global_lldp_data = {}
    global_facts = {}
    for device, output in nornir_job_result.items():
        if output[0].failed:
            global_lldp_data[device] = []
            global_facts[device] = []
            continue
        device_fqdn = output[1].result['facts']['fqdn']
        if not device_fqdn:
            device_fqdn = device
        global_facts[device_fqdn] = output[1].result['facts']
        global_lldp_data[device_fqdn] = output[1].result['lldp_neighbors_detail']
    return global_lldp_data, global_facts


def extract_lldp_details(lldp_data_dict):
    discovered_hosts = set()
    lldp_capabilities_dict = {}
    global_interconnections = []
    for host, lldp_data in lldp_data_dict.items():
        if not host:
            continue
        discovered_hosts.add(host)
        if not lldp_data:
            continue
        for interface, neighbors in lldp_data.items():
            for neighbor in neighbors:
                if not neighbor['remote_system_name']:
                    continue
                discovered_hosts.add(neighbor['remote_system_name'])
                lldp_capabilities_dict[neighbor['remote_system_name']] = (
                    neighbor['remote_system_enable_capab'][0]
                )
                local_end = (host, interface)
                remote_end = (
                    neighbor['remote_system_name'],
                    if_fullname(neighbor['remote_port'])
                )
                link_is_already_there = (
                    (local_end, remote_end) in global_interconnections
                    or (remote_end, local_end) in global_interconnections
                )
                if link_is_already_there:
                    continue
                global_interconnections.append((
                    (host, interface),
                    (neighbor['remote_system_name'], if_fullname(neighbor['remote_port']))
                ))
    return [discovered_hosts, global_interconnections, lldp_capabilities_dict]


def generate_topology_json(*args):
    discovered_hosts, interconnections, lldp_capabilities_dict, facts = args
    host_id = 0
    host_id_map = {}
    topology_dict = {'nodes': [], 'links': []}
    for host in discovered_hosts:
        device_model = 'n/a'
        device_serial = 'n/a'
        if facts.get(host):
            device_model = facts[host].get('model', 'n/a')
            device_serial = facts[host].get('serial_number', 'n/a')
        host_id_map[host] = host_id
        topology_dict['nodes'].append({
            'id': host_id,
            'name': host,
            'model': device_model,
            'serial_number': device_serial,
            'icon': get_icon_type(lldp_capabilities_dict.get(host, ''))
        })
        host_id += 1
    link_id = 0
    for link in interconnections:
        topology_dict['links'].append({
            'id': link_id,
            'source': host_id_map[link[0][0]],
            'target': host_id_map[link[1][0]],
            'srcIfName': if_shortname(link[0][1]),
            'srcDevice': link[0][0],
            'tgtIfName': if_shortname(link[1][1]),
            'tgtDevice': link[1][0],
        })
        link_id += 1
    return topology_dict


def write_topology_file(topology_json, header=TOPOLOGY_FILE_HEAD, dst=OUTPUT_TOPOLOGY_FILENAME):
    with open(dst, 'w') as topology_file:
        topology_file.write(header)
        topology_file.write(json.dumps(topology_json, indent=4, sort_keys=True))
        topology_file.write(';')


def write_topology_cache(topology_json, dst=CACHED_TOPOLOGY_FILENAME):
    with open(dst, 'w') as cached_file:
        cached_file.write(json.dumps(topology_json, indent=4, sort_keys=True))


def read_cached_topology(filename=CACHED_TOPOLOGY_FILENAME):
    if not os.path.exists(filename):
        return {}
    if not os.path.isfile(filename):
        return {}
    cached_topology = {}
    with open(filename, 'r') as file:
        try:
            cached_topology = json.loads(file.read())
        except:
            return {}
    return cached_topology


def get_topology_diff(cached, current):
    cached_links = [((x['srcDevice'], x['srcIfName']), (x['tgtDevice'], x['tgtIfName'])) for x in cached['links']]
    cached_nodes = [(x['name'],) for x in cached['nodes']]
    links = [((x['srcDevice'], x['srcIfName']), (x['tgtDevice'], x['tgtIfName'])) for x in current['links']]
    nodes = [(x['name'],)for x in current['nodes']]
    diff_nodes = {'added': [], 'deleted': []}
    diff_links = {'added': [], 'deleted': []}
    for node in nodes:
        if node in cached_nodes:
            continue
        diff_nodes['added'].append(node)
    for cached_node in cached_nodes:
        if cached_node in nodes:
            continue
        diff_nodes['deleted'].append(cached_node)
    for src, dst in links:
        if not (src, dst) in cached_links and not (dst, src) in cached_links:
            diff_links['added'].append((src, dst))
    for src, dst in cached_links:
        if not (src, dst) in links and not (dst, src) in links:
            diff_links['deleted'].append((src, dst))
    return diff_nodes, diff_links


def print_diff(diff):
    diff_nodes, diff_links = diff
    if not (diff_nodes['added'] or diff_nodes['deleted'] or diff_links['added'] or diff_links['deleted']):
        print('Изменений в топологии не обнаружено.')
        return
    print('Обнаружены изменения в топологии:')
    if diff_nodes['added']:
        print('')
        print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        print('Новые сетевые устройства:')
        print('vvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
        for node in diff_nodes['added']:
            print(f'Имя устройства: {node[0]}')
    if diff_nodes['deleted']:
        print('')
        print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        print('Удаленные сетевые устройства:')
        print('vvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
        for node in diff_nodes['deleted']:
            print(f'Имя устройства: {node[0]}')
    if diff_links['added']:
        print('')
        print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        print('Новые соединения между устройствами:')
        print('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
        for src, dst in diff_links['added']:
            print(f'От {src[0]}({src[1]}) к {dst[0]}({dst[1]})')
    if diff_links['deleted']:
        print('')
        print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        print('Удаленные соединения между устройствами:')
        print('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
        for src, dst in diff_links['deleted']:
            print(f'От {src[0]}({src[1]}) к {dst[0]}({dst[1]})')
    print('')


def good_luck_have_fun():
    get_host_data_result = nr.run(get_host_data)
    GLOBAL_LLDP_DATA, GLOBAL_FACTS = normalize_result(get_host_data_result)
    TOPOLOGY_DETAILS = extract_lldp_details(GLOBAL_LLDP_DATA)
    TOPOLOGY_DETAILS.append(GLOBAL_FACTS)
    TOPOLOGY_DICT = generate_topology_json(*TOPOLOGY_DETAILS)
    CACHED_TOPOLOGY = read_cached_topology()
    write_topology_file(TOPOLOGY_DICT)
    write_topology_cache(TOPOLOGY_DICT)
    if CACHED_TOPOLOGY:
        print_diff(get_topology_diff(CACHED_TOPOLOGY, TOPOLOGY_DICT))
    print(f'Для просмотра топологии откройте файл main.html')


if __name__ == '__main__':
    good_luck_have_fun()
