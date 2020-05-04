(function (nx) {
    /**
     * define NeXt based application
     */
    var Shell = nx.define(nx.ui.Application, {
        methods: {
            start: function () {
                //your application main entry

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
                        iconType:'model.icon'
                    },
                    // node set config
                    nodeSetConfig: {
                        label: 'model.name',
                        iconType: 'model.iconType'
                    },
                    // link config
                    linkConfig: {
                        // multiple link type is curve, could change to 'parallel' to use parallel link
                        linkType: 'curve',
                        sourcelabel: 'model.srcIfName',
                        targetlabel: 'model.tgtIfName'
                    },
                    // show node's icon, could change to false to show dot
                    showIcon: true,
                    linkInstanceClass: 'MyExtendLink' 
                });

                //set data to topology
                topo.data(topologyData);
                //attach topology to document
                topo.attach(this);
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

    // create application instance
    var shell = new Shell();
    // invoke start method
    shell.start();
})(nx);
