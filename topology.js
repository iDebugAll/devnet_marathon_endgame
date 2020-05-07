

var topologyData = {
    "links": [
        {
            "id": 0,
            "source": 7,
            "srcDevice": "edge-sw01.devnet.lab",
            "srcIfName": "Gi0/2",
            "target": 5,
            "tgtDevice": "core-rtr01.devnet.lab",
            "tgtIfName": "Gi0/0/0/1"
        },
        {
            "id": 1,
            "source": 7,
            "srcDevice": "edge-sw01.devnet.lab",
            "srcIfName": "Gi0/3",
            "target": 3,
            "tgtDevice": "core-rtr02.devnet.lab",
            "tgtIfName": "Gi0/0/0/1"
        },
        {
            "id": 2,
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi3",
            "target": 3,
            "tgtDevice": "core-rtr02.devnet.lab",
            "tgtIfName": "Gi0/0/0/2"
        },
        {
            "id": 3,
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi4",
            "target": 1,
            "tgtDevice": "dist-sw01.devnet.lab",
            "tgtIfName": "Eth1/3"
        },
        {
            "id": 4,
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi6",
            "target": 0,
            "tgtDevice": "dist-rtr02.devnet.lab",
            "tgtIfName": "Gi6"
        },
        {
            "id": 5,
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi5",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/3"
        },
        {
            "id": 6,
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi2",
            "target": 5,
            "tgtDevice": "core-rtr01.devnet.lab",
            "tgtIfName": "Gi0/0/0/2"
        },
        {
            "id": 7,
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi3",
            "target": 3,
            "tgtDevice": "core-rtr02.devnet.lab",
            "tgtIfName": "Gi0/0/0/3"
        },
        {
            "id": 8,
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi4",
            "target": 1,
            "tgtDevice": "dist-sw01.devnet.lab",
            "tgtIfName": "Eth1/4"
        },
        {
            "id": 9,
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi5",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/4"
        },
        {
            "id": 10,
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi2",
            "target": 5,
            "tgtDevice": "core-rtr01.devnet.lab",
            "tgtIfName": "Gi0/0/0/3"
        },
        {
            "id": 11,
            "source": 1,
            "srcDevice": "dist-sw01.devnet.lab",
            "srcIfName": "Eth1/1",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/1"
        },
        {
            "id": 12,
            "source": 1,
            "srcDevice": "dist-sw01.devnet.lab",
            "srcIfName": "Eth1/2",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/2"
        }
    ],
    "nodes": [
        {
            "icon": "router",
            "id": 0,
            "model": "CSR1000V",
            "name": "dist-rtr02.devnet.lab",
            "serial_number": "9YZKNQKQ566",
            "layerSortPreference": 7,
            "primaryIP": "10.10.20.176",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=dist-rtr02.devnet.lab"
        },
        {
            "icon": "switch",
            "id": 1,
            "model": "Nexus9000 9000v Chassis",
            "name": "dist-sw01.devnet.lab",
            "serial_number": "9MZLNM0ZC9Z",
            "layerSortPreference": 8,
            "primaryIP": "10.10.20.177",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=dist-sw01.devnet.lab"
        },
        {
            "icon": "switch",
            "id": 2,
            "model": "Nexus9000 9000v Chassis",
            "name": "dist-sw02.devnet.lab",
            "serial_number": "93LCGCRUJA5",
            "layerSortPreference": 8,
            "primaryIP": "10.10.20.178",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=dist-sw02.devnet.lab",
        },
        {
            "icon": "router",
            "id": 3,
            "model": "n/a",
            "name": "core-rtr02.devnet.lab",
            "serial_number": "n/a",
            "layerSortPreference": 5,
            "primaryIP": "10.10.20.174",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=core-rtr02.devnet.lab",
        },
        {
            "icon": "router",
            "id": 4,
            "model": "CSR1000V",
            "name": "dist-rtr01.devnet.lab",
            "serial_number": "9S78ZRF2V2B",
            "layerSortPreference": 7,
            "primaryIP": "10.10.20.175",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=dist-rtr01.devnet.lab"
        },
        {
            "icon": "router",
            "id": 5,
            "model": "n/a",
            "name": "core-rtr01.devnet.lab",
            "serial_number": "n/a",
            "layerSortPreference": 5,
            "primaryIP": "10.10.20.173",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=core-rtr01.devnet.lab",
        },
        {
            "icon": "router",
            "id": 6,
            "model": "CSR1000V",
            "name": "internet-rtr01.virl.info",
            "serial_number": "9LGWPM8GTV6",
            "layerSortPreference": 1,
            "primaryIP": "10.10.20.181",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=internet-rtr01.virl.info",
        },
        {
            "icon": "switch",
            "id": 7,
            "model": "IOSv",
            "name": "edge-sw01.devnet.lab",
            "serial_number": "927A4RELIGI",
            "layerSortPreference": 3,
            "primaryIP": "10.10.20.172",
            "dcimDeviceLink": "http://localhost:32768/dcim/devices/?q=edge-sw01.devnet.lab",
        }
    ]
};