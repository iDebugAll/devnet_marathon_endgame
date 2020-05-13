# DevNet Marathon - Topology Visualization
An automated topology visualization solution for online Cisco DevNet Marathon Finale.
May 2020.

### Solution Technology Stack:
  - Python3
  - [Nornir](https://nornir.readthedocs.io/en/latest/)
  - [NAPALM](https://napalm.readthedocs.io/en/latest/)
  - [NeXt UI](https://developer.cisco.com/site/neXt/) (JS+HTML5)

### Installation:
Install dependencies:
```sh
$ mkdir ~/devnet_marathon_endgame
$ cd ~/devnet_marathon_endgame
$ git clone https://github.com/iDebugAll/devnet_marathon_endgame.git
$ cd devnet_marathon_endgame
$ pip3 install -r requirements.txt
```
Edit Nornir configuration files in order to access your target network infrastructure.
SimpleInventory module is used by default.
Specify required hosts and groups filenames in nornir_config.yml.
Default hosts file in this repo is configured for SSH access to [Cisco Modeling Labs](https://devnetsandbox.cisco.com/RM/Diagram/Index/685f774a-a5d6-4df5-a324-3774217d0e6b?diagramType=Topology) network topology in Cisco Devnet Sandbox.
This Cisco DevNet Sandbox requires free registration, lab reservation (just a few clicks), and VPN-access (AnyConnect) to allow for connectivity.

### Usage:
Run generate_topology.py script to syncronize the topology.
Open main.html upon script completion.
```
$ python3.7 generate_topology.py 
No topology changes since last run.
Open main.html to view the topology.
```

![sample_topology](/samples/sample_topology.png)

Visualization engine utilizes NeXt UI 'force' dataprocessor.
Its internal algorithms try to spreads out the nodes automatically so they would be as equally distant as possible.
It usually provides a proper layout even for compex an hyerarchical topologies. But the whole orientation of the levels might be unpredictable because of the core logic. A new layout is generated on each page reload.
A layer orientation feature is implemented in order to improve visual experience. 

### Features and workflow:

The solution is [crosspatform](https://napalm.readthedocs.io/en/latest/support/) and extensible.
It is tested on IOS, IOS-XE, and NX-OS.

NAPALM is used along with Nornir to retrieve the data from hosts:
  - NAPALM GET_LLDP_NEIGHBORS_DETAILS getter returns LLDP neighbors details;
  - NAPALM GET_FACTS getter returns general device info we can use for visualization.

The script accepts an initialized Nornir as an input. Mandatory items:
  - IP-addresses of network devices;
  - Valid credentials with read-only access to those devices.

The script output consists of:
  - topology.js file with JS topology objects for NeXt UI;
  - cached_topology.json file with JSON-representation of the analyzed topology.
  - diff_topology.js file with visualized topology changes as
    compared to last known cached_topology.json.
  - Console output of the topology diff check result.

topology.js is being rewritten on every run. Repository contains a sample result based on [Cisco Modeling Labs](https://devnetsandbox.cisco.com/RM/Diagram/Index/685f774a-a5d6-4df5-a324-3774217d0e6b?diagramType=Topology) topology from Cisco DevNet Sandbox.

The script implements general error handling and data normalization.
Data collection attempt runs on all the nodes in Nornir inventory.
A standalone node with Nornir host object name is included to resulting topology in case of any errors.

The script is able to handle missing LLDP adjacencies properly (internet-rtr01.virl.info above).
The script may handle missing access to sinle intermediate nodes properly (core-rtr01.devnet.lab and core-rtr02.devnet.lab above) in case if they run LLDP.

Node icons are being chosen automatically based on points below with descending priority:
  - Based on LLDP capabilities received and collected from neighbors.
  - Based on device model. Device connection must be successful in this case. Model must be present in GET_FACTS result.
  - Default value is 'unknown' (question mark icon).

NeXt UI Toolset is used for topology visualization. Resulting main.html page contains an interactive form with analyzed topology layout.

You can move the nodes with a cursor in random direction to change layout. 
Group selection and drag is also supported.
Cursor pointing to a node automatically highlights it.

Left mouse button click on a node triggers a custom menu display:<br/>
![node_details](/samples/sample_node_details.png)

Serial number and model are assigned based on GET_FACTS result if present.
It is technically possible to add any desired info for devices we have access to.

Similar output for links (not customized yet):<br/>
![link_details](/samples/sample_link_details.png)

generate_topology.py analyzes the topology on every run.
It writes resulting topology detail to cached_topology.json along with other files.
This chache file is imported every time on the start to be able to compare the topology states.
Diff result with deleted and added nodes and links is printed out to the console.
diff_topology.js would contain the merged topology with some extended attributes for visualization.
diff_page.html contains the diff topology layout.

Sample console output:
```
$ python3.7 generate_topology.py 
Open main.html to view the topology.

Topology changes have been discovered:

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
New network devices:
vvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Hostname: dist-rtr01.devnet.lab

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Deleted devices:
vvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Hostname: edge-sw01.devnet.lab

^^^^^^^^^^^^^^^^^^^^^
New interconnections:
vvvvvvvvvvvvvvvvvvvvv
From dist-rtr01.devnet.lab(Gi3) To core-rtr02.devnet.lab(Gi0/0/0/2)
From dist-rtr01.devnet.lab(Gi4) To dist-sw01.devnet.lab(Eth1/3)
From dist-rtr01.devnet.lab(Gi6) To dist-rtr02.devnet.lab(Gi6)
From dist-rtr01.devnet.lab(Gi5) To dist-sw02.devnet.lab(Eth1/3)
From dist-rtr01.devnet.lab(Gi2) To core-rtr01.devnet.lab(Gi0/0/0/2)

^^^^^^^^^^^^^^^^^^^^^^^^^
Deleted interconnections:
vvvvvvvvvvvvvvvvvvvvvvvvv
From edge-sw01.devnet.lab(Gi0/2) To core-rtr01.devnet.lab(Gi0/0/0/1)
From edge-sw01.devnet.lab(Gi0/3) To core-rtr02.devnet.lab(Gi0/0/0/1)

Open diff_page.html to view the changes.
Optionally, open main.html and click 'Display diff' button
```

diff.html sample view:

![sample_diff](/samples/sample_diff.png)

It's pretty intuitive :)


### Experimental and additional features:

The solution implements automatic horizontal and vertical layer alignment.
By default the topology is formed by 'force' dataprocessor.
Use 'horizontal' and 'vertical' buttons in main.html and diff_page.html to activate new layout.

Alignment is based on role attribute in Nornir inventory host objects.
Same role nodes would be on the same topology level. 
Level hyerarchy is stored in NX_LAYER_SORT_ORDER in generate_topology.py:

```python
NX_LAYER_SORT_ORDER = (
    'undefined',
    'outside',
    'edge-switch',
    'edge-router',
    'core-router',
    'core-switch',
    'distribution-router',
    'distribution-switch',
    'leaf',
    'spine',
    'access-switch'
)
```

Assign a role from the list above (or update the list) to the nodes to enable this logic:

```yaml
dist-rtr02:
    hostname: 10.10.20.176
    platform: ios
    groups:
        - devnet-cml-lab
    data:
        role: distribution-router
```

Default role in case of missing attribute is 'undefined'.
Repo contains a valid sample.

Horizontal alignment sample:
![sample_layout_horizontal](/samples/sample_layout_horizontal.png)
