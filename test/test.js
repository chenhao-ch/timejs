var date1 = date2 = date3 = date4 = date5 = null;

module("test Calendar", {
	setup:function(){
	  var d = new Date();
	  d.setFullYear('2012', '0', '31');
	  d.setHours('12');
	  d.setMinutes('52');
	  d.setSeconds('41');
      date1 = new Calendar();
      date2 = new Calendar(d);  //2012-01-31 12:52:41
      date3 = new Calendar('2013-04-24');
      date4 = new Calendar('2013-03-31');
      date5 = Calendar.now();
	},
	teardown: function(){
      date1 = date2 = date3 = date4 = date5 = null;
	}
});

test("Calendar format", function(assert){
  equal(date1.format('yyyy-MM-dd hh:mm:ss D'), "1970-01-01 08:00:00 星期四");
  equal(date2.format('yyyy-MM-dd hh:mm:ss D'), "2012-01-31 12:52:41 星期二");
  equal(date3.format('yyyy-MM-dd hh:mm:ss D'), "2013-04-24 00:00:00 星期三");
  equal(date4.format('yyyy-MM-dd hh:mm:ss D'), "2013-03-31 00:00:00 星期日");
});

test("Calendar add", function(){
  equal(date1.add('year', 10).format('yyyy-MM-dd hh:mm:ss'), "1980-01-01 08:00:00");
  equal(date2.add('month', -4).format('yyyy-MM-dd hh:mm:ss'), "2011-09-30 12:52:41");
  equal(date2.add('month', 10).format('yyyy-MM-dd hh:mm:ss'), "2012-07-30 12:52:41");
  equal(date3.add('date', 10).format('yyyy-MM-dd hh:mm:ss'), "2013-05-04 00:00:00");
  equal(date4.add('hour', -2).format('yyyy-MM-dd hh:mm:ss'), "2013-03-30 22:00:00");
});

test("Calendar compareTo", function(){
  equal(date1.compareTo(date2) < 0, true);
  equal(date4.compareTo(date4) == 0, true);
  equal(date4.compareTo(date2) > 0, true);
});

test("Calendar get", function(){
  equal(date1.get('year'), '1970');
  equal(date1.get('month'), '1');
  equal(date1.get('hour'), '8');
  equal(date2.get('second'), '41');
  equal(date2.get('minute'), '52');
  equal(date2.get('year'), '2012');
  equal(date3.get('month'), '4');
  equal(date4.get('hour'), '0');
  equal(date4.get('date'), '31');
  equal(date4.get('day'), '星期日');
});

test("Calendar nextMonth", function(){
  equal(date1.nextMonth().format('yyyy-MM-dd hh:mm:ss'), '1970-02-28 08:00:00');
  equal(date2.nextMonth().format('yyyy-MM-dd hh:mm:ss'), '2012-02-29 12:52:41');
  equal(date3.nextMonth().format('yyyy-MM-dd hh:mm:ss'), '2013-05-31 00:00:00');
  equal(date4.nextMonth().format('yyyy-MM-dd hh:mm:ss'), '2013-04-30 00:00:00');
});

test("Calendar nextMonth keepDay", function(){
  equal(date1.nextMonth(true).format('yyyy-MM-dd hh:mm:ss'), '1970-02-01 08:00:00');
  equal(date2.nextMonth(true).format('yyyy-MM-dd hh:mm:ss'), '2012-02-29 12:52:41');
  equal(date3.nextMonth(true).format('yyyy-MM-dd hh:mm:ss'), '2013-05-24 00:00:00');
  equal(date4.nextMonth(true).format('yyyy-MM-dd hh:mm:ss'), '2013-04-30 00:00:00');
});

test("Calendar lastMonth", function(){
  equal(date1.lastMonth().format('yyyy-MM-dd hh:mm:ss'), '1969-12-31 08:00:00');
  equal(date2.lastMonth().format('yyyy-MM-dd hh:mm:ss'), '2011-12-31 12:52:41');
  equal(date3.lastMonth().format('yyyy-MM-dd hh:mm:ss'), '2013-03-31 00:00:00');
  equal(date4.lastMonth().format('yyyy-MM-dd hh:mm:ss'), '2013-02-28 00:00:00');
});

test("Calendar lastMonth keepDay", function(){
  equal(date1.lastMonth(true).format('yyyy-MM-dd hh:mm:ss'), '1969-12-01 08:00:00');
  equal(date2.lastMonth(true).format('yyyy-MM-dd hh:mm:ss'), '2011-12-31 12:52:41');
  equal(date3.lastMonth(true).format('yyyy-MM-dd hh:mm:ss'), '2013-03-24 00:00:00');
  equal(date4.lastMonth(true).format('yyyy-MM-dd hh:mm:ss'), '2013-02-28 00:00:00');
});

test("Calendar tomorrow", function(){
  equal(date1.tomorrow().format('yyyy-MM-dd hh:mm:ss'), '1970-01-02 08:00:00');
  equal(date2.tomorrow().format('yyyy-MM-dd hh:mm:ss'), '2012-02-01 12:52:41');
  equal(date3.tomorrow().format('yyyy-MM-dd hh:mm:ss'), '2013-04-25 00:00:00');
  equal(date4.tomorrow().format('yyyy-MM-dd hh:mm:ss'), '2013-04-01 00:00:00');
});

test("Calendar yesterday", function(){
  equal(date1.yesterday().format('yyyy-MM-dd hh:mm:ss'), '1969-12-31 08:00:00');
  equal(date2.yesterday().format('yyyy-MM-dd hh:mm:ss'), '2012-01-30 12:52:41');
  equal(date3.yesterday().format('yyyy-MM-dd hh:mm:ss'), '2013-04-23 00:00:00');
  equal(date4.yesterday().format('yyyy-MM-dd hh:mm:ss'), '2013-03-30 00:00:00');
});

test("Calendar daysInMonth", function(){
  equal(Calendar.daysInMonth('2012', '01'), 31);
  equal(Calendar.daysInMonth('2012', '02'), 29);
  equal(Calendar.daysInMonth('2013', '04'), 30);
  equal(Calendar.daysInMonth('2013', '02'), 28);
  equal(Calendar.daysInMonth('2011', '07'), 31);
});

test('Calendar now', function(){
  var d = new Date();
  equal(Calendar.now().get('d').getTime(), d.getTime());
});