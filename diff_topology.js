

var topologyData = {
    "links": [
        {
            "id": 0,
            "is_dead": "no",
            "is_new": "yes",
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi3",
            "target": 3,
            "tgtDevice": "core-rtr02.devnet.lab",
            "tgtIfName": "Gi0/0/0/2"
        },
        {
            "id": 1,
            "is_dead": "no",
            "is_new": "yes",
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi4",
            "target": 1,
            "tgtDevice": "dist-sw01.devnet.lab",
            "tgtIfName": "Eth1/3"
        },
        {
            "id": 2,
            "is_dead": "no",
            "is_new": "yes",
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi6",
            "target": 0,
            "tgtDevice": "dist-rtr02.devnet.lab",
            "tgtIfName": "Gi6"
        },
        {
            "id": 3,
            "is_dead": "no",
            "is_new": "yes",
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi5",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/3"
        },
        {
            "id": 4,
            "is_dead": "no",
            "is_new": "yes",
            "source": 4,
            "srcDevice": "dist-rtr01.devnet.lab",
            "srcIfName": "Gi2",
            "target": 5,
            "tgtDevice": "core-rtr01.devnet.lab",
            "tgtIfName": "Gi0/0/0/2"
        },
        {
            "id": 5,
            "is_dead": "no",
            "is_new": "no",
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi3",
            "target": 3,
            "tgtDevice": "core-rtr02.devnet.lab",
            "tgtIfName": "Gi0/0/0/3"
        },
        {
            "id": 6,
            "is_dead": "no",
            "is_new": "no",
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi4",
            "target": 1,
            "tgtDevice": "dist-sw01.devnet.lab",
            "tgtIfName": "Eth1/4"
        },
        {
            "id": 7,
            "is_dead": "no",
            "is_new": "no",
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi5",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/4"
        },
        {
            "id": 8,
            "is_dead": "no",
            "is_new": "no",
            "source": 0,
            "srcDevice": "dist-rtr02.devnet.lab",
            "srcIfName": "Gi2",
            "target": 5,
            "tgtDevice": "core-rtr01.devnet.lab",
            "tgtIfName": "Gi0/0/0/3"
        },
        {
            "id": 9,
            "is_dead": "no",
            "is_new": "no",
            "source": 1,
            "srcDevice": "dist-sw01.devnet.lab",
            "srcIfName": "Eth1/1",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/1"
        },
        {
            "id": 10,
            "is_dead": "no",
            "is_new": "no",
            "source": 1,
            "srcDevice": "dist-sw01.devnet.lab",
            "srcIfName": "Eth1/2",
            "target": 2,
            "tgtDevice": "dist-sw02.devnet.lab",
            "tgtIfName": "Eth1/2"
        },
        {
            "id": 11,
            "is_dead": "yes",
            "is_new": "no",
            "source": 7,
            "srcDevice": "edge-sw01.devnet.lab",
            "srcIfName": "Gi0/2",
            "target": 5,
            "tgtDevice": "core-rtr01.devnet.lab",
            "tgtIfName": "Gi0/0/0/1"
        },
        {
            "id": 12,
            "is_dead": "yes",
            "is_new": "no",
            "source": 7,
            "srcDevice": "edge-sw01.devnet.lab",
            "srcIfName": "Gi0/3",
            "target": 3,
            "tgtDevice": "core-rtr02.devnet.lab",
            "tgtIfName": "Gi0/0/0/1"
        }
    ],
    "nodes": [
        {
            "icon": "router",
            "id": 0,
            "is_dead": "no",
            "is_new": "no",
            "model": "CSR1000V",
            "name": "dist-rtr02.devnet.lab",
            "serial_number": "9YZKNQKQ566"
        },
        {
            "icon": "switch",
            "id": 1,
            "is_dead": "no",
            "is_new": "no",
            "model": "Nexus9000 9000v Chassis",
            "name": "dist-sw01.devnet.lab",
            "serial_number": "9MZLNM0ZC9Z"
        },
        {
            "icon": "switch",
            "id": 2,
            "is_dead": "no",
            "is_new": "no",
            "model": "Nexus9000 9000v Chassis",
            "name": "dist-sw02.devnet.lab",
            "serial_number": "93LCGCRUJA5"
        },
        {
            "icon": "router",
            "id": 3,
            "is_dead": "no",
            "is_new": "no",
            "model": "n/a",
            "name": "core-rtr02.devnet.lab",
            "serial_number": "n/a"
        },
        {
            "icon": "router",
            "id": 4,
            "is_dead": "no",
            "is_new": "yes",
            "model": "CSR1000V",
            "name": "dist-rtr01.devnet.lab",
            "serial_number": "9S78ZRF2V2B"
        },
        {
            "icon": "router",
            "id": 5,
            "is_dead": "no",
            "is_new": "no",
            "model": "n/a",
            "name": "core-rtr01.devnet.lab",
            "serial_number": "n/a"
        },
        {
            "icon": "unknown",
            "id": 6,
            "is_dead": "no",
            "is_new": "no",
            "model": "CSR1000V",
            "name": "internet-rtr01.virl.info",
            "serial_number": "9LGWPM8GTV6"
        },
        {
            "icon": "dead_node",
            "id": 7,
            "is_dead": "yes",
            "is_new": "no",
            "model": "IOSv",
            "name": "edge-sw01.devnet.lab",
            "serial_number": "927A4RELIGI"
        }
    ]
};