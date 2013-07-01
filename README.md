# Time.js 简化js中对Date对象的使用

##创建对象

```js
var time1 = new Calendar(new Date());
var time2 = new Calendar('2012-02-29 12:12:12');
```

可以传入Date对象或者是yyyy-MM-dd hh:mm:ss格式的时间，创建Calendar对象

## 格式化输出时间
```js
var time2Format = time2.format('yyyy-MM-dd hh:mm:ss D');
//输出 '2012-02-29 12:12:12 星期三'
```

参数中y表示年， M表示月， d表示天， h表示小时， m表示分钟， s表示秒，D表示星期

##向前或向后n时间
```js
var tomorrow = time2.add('date', 1);
// tomorrow = time2 = '2012-03-01 12:12:12';
var lastMonth = time2.add('month', -1);
// lastMonth = time2 = "2012-02-01 12:12:12";
```

第一个参数表示要变化的字段， 第二个表示变化的大小，可正，可负。调用后会变化原始值。

##与另外一个时间进行比较
```js
// time2 = "2012-02-01 12:12:12";
var ct = time2.compareTo('2012-02-01 14:00:00');
// 也可以是 time2.compareTo(new Calendar('2012-02-01 14:00:00'));
// ct < 0
```

返回值==0表示两个时间相等， 返回值 > 0表示参数较靠前， 返回值 < 0表示参数较靠后。

##获得属性值
```js
var year = time2.get('year');
var month = time2.get('month');
var date = time2.get('date');
var hour = time2.get('hour');
var minute = time2.get('minute');
var second = time2.get('second');
var day = time2.get('day');
```
根据参数获得当前时间的年月日等信息

```js
//提供了一些快捷接口
var nextMonth = time2.nextMonth(); //下个月
var lastMonth = time2.lasttMonth(); //上个月
var tomorrow = time2.tomorrow();  //明天
var yesterday = time2.yesterday(); //昨天
```

## 获得月份含有的天数
```js
Calendar.daysInMonth(2012, 2); //2012年2月含有的天数
````

##获得当前时间的Calendar对象
```js
Calendar.now();
```