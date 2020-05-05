# DevNet Marathon - Topology Visualization
Вариант реализации задания на визуализацию сетевых топологий для Cisco DevNet Марафона.

### Используемый стек:
  - Python3
  - [Nornir](https://nornir.readthedocs.io/en/latest/)
  - [NAPALM](https://napalm.readthedocs.io/en/latest/)
  - [NeXt UI](https://developer.cisco.com/site/neXt/) (JS+HTML5)

### Установка и первичная настройка:
Установите зависимости:
```sh
$ mkdir ~/devnet_marathon_endgame
$ cd ~/devnet_marathon_endgame
$ git clone https://github.com/iDebugAll/devnet_marathon_endgame.git
$ cd devnet_marathon_endgame
$ pip3 install -i requirements.txt
```
Отредактируйте конфигурационные файлы Nornir для доступа на целевую сетевую инфраструктуру.
По умолчанию используется модуль SimpleInventory.
В файле nornir_config.yml необходимо указать используемые файлы хостов и групп.
Файл хостов, используемый по умолчанию, настроен на работу по SSH с сетевой топологией из [Cisco Modeling Labs](https://devnetsandbox.cisco.com/RM/Diagram/Index/685f774a-a5d6-4df5-a324-3774217d0e6b?diagramType=Topology) в Cisco Devnet Sandbox.
Для подключения к Cisco DevNet Sandbox требуется бесплатная регистрация, резервирование и VPN-доступ.

### Использование:
Для синхронизации топологии необходимо запустить скрипт generate_topology.py.
После того, как скрипт завершит работу, необходимо открыть файл main.html.
```
$ python3.7 generate_topology.py 
Изменений в топологии не обнаружено.
Для просмотра топологии откройте файл main.html
```

![sample_topology](/samples/sample_topology.png)

### Возможности и описание работы:

Решение является [кросплатформенным](https://napalm.readthedocs.io/en/latest/support/), интегрируемым и расширяемым.

Для получения информации от сетевых устройств используется модуль NAPALM с запуском через Nornir.
Задействуются getter'ы GET_LLDP_NEIGHBORS_DETAILS (сбор LLDP-соседств) и GET_FACTS (общие данные об устройстве для вывода в подсказке).
Скрипт протестирован на IOS, IOS-XE и NX-OS.

Реализована базовая обработка возможных ошибок и нормализация данных.

Поддерживается сценарий с отсутствующими LLDP-соседствами (internet-rtr01.virl.info на примере выше).
Поддерживается сценарий с отсутствием доступа на одиночные промежуточные устройства (core-rtr01.devnet.lab и core-rtr02.devnet.lab на примере выше) при условии запущенного на них LLDP.

Типы пиктограмм выбираются автоматически на основании анонсируемых устройством capabilities по LLDP.

Для визуализации используется набор инструментов NeXt UI. Получаемая в результате страница main.html содержит интерактивную форму с визуализацией проанализированного участка сети.

Пиктограммы устройств могут перемещаться мышью в произвольном направлении с адаптивной отрисовкой линков. Поддерживается выделение и групповое перемещение.
При наведении указателя на элемент топологии автоматически затемняются все несвязанные с ним ноды и линки.

По левому клику мыши на устройство выводится меню со справочной информацией:
![node_details](/samples/sample_node_details.png)

Серийный номер и модель указываются для устройств на основании вывода GET_FACTS там, где это возможно.
Для устройств, на которые имеется доступ, может быть добавлена произвольная информация.
Аналогично для линков:

![node_details](/samples/sample_link_details.png)

При каждом запуске скрипта generate_topology.py выполняется анализ изменений топологии.
Полученные с устройств детали топологии записываются, помимо прочего, в файл cached_topology.json
Данный файл считывается при старте и сравнивается с текущим полученным от устройств состоянием.
В результате данные о добавленных и удаленных в топологии устройствах и линках выводится в консоль:

```
$ python3.7 generate_topology.py 
Обнаружены изменения в топологии:

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Новые соединения между устройствами:
vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
От dist-rtr01.devnet.lab(Gi4) к dist-sw01.devnet.lab(Eth1/3)
От dist-rtr01.devnet.lab(Gi6) к dist-rtr02.devnet.lab(Gi6)
От dist-rtr01.devnet.lab(Gi5) к dist-sw02.devnet.lab(Eth1/3)
От dist-rtr02.devnet.lab(Gi4) к dist-sw01.devnet.lab(Eth1/4)
От dist-rtr02.devnet.lab(Gi5) к dist-sw02.devnet.lab(Eth1/4)
От dist-sw01.devnet.lab(Eth1/1) к dist-sw02.devnet.lab(Eth1/1)
От dist-sw01.devnet.lab(Eth1/2) к dist-sw02.devnet.lab(Eth1/2)

Для просмотра топологии откройте файл main.html
```



