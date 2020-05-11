(function (nx) {
    /**
     * Приложение на NeXt UI
     */
    // Инициализация топологии
    var topo = new nx.graphic.Topology({
        // Ширина и высота view приложения
        width: 1200,
        height: 700,
        // Процессор данных, отвечает за расстановку нод.
        // 'force' стремится расставить ноды на равном 
        // удалении друг от друга. 'quick' расставляет их
        // в произвольных местах
        dataProcessor: 'force',
        // уникальный идентификатор нод и линков
        identityKey: 'id',
        // Конфигурация нод
        nodeConfig: {
            label: 'model.name',
            iconType:'model.icon',
            color: function(model) {
                if (model._data.is_new === 'yes') {
                    return '#148D09'
                }
            },
        },
        // Конфигурация  Node Set (на будущее)
        nodeSetConfig: {
            label: 'model.name',
            iconType: 'model.iconType'
        },
        // Настройки tooltip content (меню при нажатии на ноду)
        tooltipManagerConfig: {
            nodeTooltipContentClass: 'CustomNodeTooltip'
        },
        // Конфигурация линков
        linkConfig: {
            // Отображение множественных линков дугами,
            // можно поменять на 'parallel'
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
        // Отображать пиктограммы нод, при false отрисует точку
        showIcon: true,
        linkInstanceClass: 'MyExtendLink' 
    });

    topo.registerIcon("dead_node", "img/dead_node.png", 49, 49);

    var Shell = nx.define(nx.ui.Application, {
        methods: {
            start: function () {
                // записать данные топологии из переменной
                topo.data(topologyData);
                // и прикрепить их к документу
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
                    content: [{
                        tag: 'a',
                        content: '{#node.model.name}',
                        props: {"href": "{#node.model.dcimDeviceLink}"}
                    }],
                    props: {
                        "style": "border-bottom: dotted 1px; font-size:90%; word-wrap:normal; color:#003688"
                    }
                }, {
                    tag: 'p',
                    content: [
                        {
                        tag: 'label',
                        content: 'IP: ',
                    }, {
                        tag: 'label',
                        content: '{#node.model.primaryIP}',
                    }
                    ],
                    props: {
                        "style": "font-size:80%;"
                    }
                },{
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

    // создать инстанс приложения
    var shell = new Shell();
    // запустить приложение
    shell.start();
})(nx);
