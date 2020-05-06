(function (nx) {
    /**
     * define NeXt based application
     */
    // initialize a topology
    var topo = new nx.graphic.Topology({
        // set the topology view's with and height
        width: 1200,
        height: 800,
        dataProcessor: 'force',
        identityKey: 'id',
        // node config
        nodeConfig: {
            // label display name from of node's model, could change to 'model.id' to show id
            label: 'model.name',
            iconType:'model.icon',
            color: function(model) {
                if (model._data.is_new === 'yes') {
                    return '#148D09'
                }
            },
        },
        // node set config
        nodeSetConfig: {
            label: 'model.name',
            iconType: 'model.iconType'
        },
        // set custom tooltip content class
        tooltipManagerConfig: {
            nodeTooltipContentClass: 'CustomNodeTooltip'
        },
        // link config
        linkConfig: {
            // multiple link type is curve, could change to 'parallel' to use parallel link
            linkType: 'curve',
            sourcelabel: 'model.srcIfName',
            targetlabel: 'model.tgtIfName',
            style: function(model) {
                if (model._data.is_dead === 'yes') {
                    return { 'stroke-dasharray': '5' }
                }
            },
            color: function(model) {
                if (model._data.is_dead === 'yes') {
                    return '#E40039'
                }
                if (model._data.is_new === 'yes') {
                    return '#148D09'
                }
            },
        },
        // show node's icon, could change to false to show dot
        showIcon: true,
        linkInstanceClass: 'MyExtendLink' 
    });

    topo.registerIcon("dead_node", "img/dead_node.png", 49, 49);

    var Shell = nx.define(nx.ui.Application, {
        methods: {
            start: function () {
                //your application main entry
                //set data to topology
                topo.data(topologyData);
                //attach topology to document
                topo.attach(this);
            }
        }
    });

    nx.define('CustomNodeTooltip', nx.ui.Component, {
        properties: {
            node: {},
            topology: {}
        },
        view: {
            content: [{
                tag: 'div',
                content: [{
                    tag: 'h5',
                    content: '{#node.model.name}',
                    props: {
                        "style": "border-bottom: dotted 1px; font-size:90%; word-wrap:normal; color:#003688"
                    }
                }, {
                    tag: 'p',
                    content: [
                        {
                        tag: 'label',
                        content: 'Model: ',
                    }, {
                        tag: 'label',
                        content: '{#node.model.model}',
                    }
                    ],
                    props: {
                        "style": "font-size:80%;"
                    }
                }, {
                    tag: 'p',
                    content: [{
                        tag: 'label',
                        content: 'S/N: ',
                    }, {
                        tag: 'label',
                        content: '{#node.model.serial_number}',
                    }],
                    props: {
                        "style": "font-size:80%; padding:0"
                    }
                },
            ],
            props: {
                "style": "width: 150px;"
            }
        }]
        }
    });

    nx.define('Tooltip.Node', nx.ui.Component, {
        view: function(view){
            view.content.push({
            });
            return view;
        },
        methods: {
            attach: function(args) {
                this.inherited(args);
                this.model();
            }
        }
    });

    nx.define('MyExtendLink', nx.graphic.Topology.Link, {
        properties: {
            sourcelabel: null,
            targetlabel: null
        },
        view: function(view) {
            view.content.push({
                name: 'source',
                type: 'nx.graphic.Text',
                props: {
                    'class': 'sourcelabel',
                    'alignment-baseline': 'text-after-edge',
                    'text-anchor': 'start'
                }
            }, {
                name: 'target',
                type: 'nx.graphic.Text',
                props: {
                    'class': 'targetlabel',
                    'alignment-baseline': 'text-after-edge',
                    'text-anchor': 'end'
                }
            });
            
            return view;
        },
        methods: {
            update: function() {
                
                this.inherited();
                
                
                var el, point;
                
                var line = this.line();
                var angle = line.angle();
                var stageScale = this.stageScale();
                
                // pad line
                line = line.pad(18 * stageScale, 18 * stageScale);
                
                if (this.sourcelabel()) {
                    el = this.view('source');
                    point = line.start;
                    el.set('x', point.x);
                    el.set('y', point.y);
                    el.set('text', this.sourcelabel());
                    el.set('transform', 'rotate(' + angle + ' ' + point.x + ',' + point.y + ')');
                    el.setStyle('font-size', 12 * stageScale);
                }
                
                
                if (this.targetlabel()) {
                    el = this.view('target');
                    point = line.end;
                    el.set('x', point.x);
                    el.set('y', point.y);
                    el.set('text', this.targetlabel());
                    el.set('transform', 'rotate(' + angle + ' ' + point.x + ',' + point.y + ')');
                    el.setStyle('font-size', 12 * stageScale);
                }
            }
        }
    });

    var currentLayout = 'auto'

    horizontal = function() {
        if (currentLayout === 'horizontal') {
            return;
        };
        currentLayout = 'horizontal';
        var layout = topo.getLayout('hierarchicalLayout');
        layout.direction('horizontal');
        layout.levelBy(function(node, model) {
            return model.get('layerSortPreference');
            console.log(model.get('layerSortPreference'));
        });
        topo.activateLayout('hierarchicalLayout');
    };

    vertical = function() {
        if (currentLayout === 'vertical') {
            return;
        };
        currentLayout = 'vertical';
        var layout = topo.getLayout('hierarchicalLayout');
        layout.direction('vertical');
        layout.levelBy(function(node, model) {
          return model.get('layerSortPreference');
        });
        topo.activateLayout('hierarchicalLayout');
    };

    // create application instance
    var shell = new Shell();
    // invoke start method
    shell.start();
})(nx);
