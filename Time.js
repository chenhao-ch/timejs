/**
 * 传入参数，生成相应对象。
 * @param date   js Date对象或者yyyy-MM-dd hh:mm:ss,
 */
(function(global) {
  'use strict';

  var Calendar = function(date) {
    //设置正确的日期
    this.d = new Date(0);
    if(date instanceof Date) {
      this.d = date;
    } else if (typeof date === 'string') {
      var ds = date.split(' ');
      ds[1] = ds[1] || '00:00:00';

      var dates = ds[0].split('-'),
          times = ds[1].split(':');
      this.d.setFullYear(dates[0], dates[1] - 1, dates[2]);
      this.d.setHours(times[0] || '00');
      this.d.setMinutes(times[1] || '00');
      this.d.setSeconds(times[2] || '00');
    } else if (date instanceof Calendar){
      return date;
    }

    this.data = this.fillData(this.d);

    return this;
  }

  global.Calendar = Calendar;
  var cp = Calendar.prototype;

  /**
   * 补全字段到两位
   */
  cp.complete = function(time, completion) {
    time = parseInt(time);
    if (completion) {
      time = (time < 10) ? ('0' + time) : ('' + time);
    }
    return time;
  }

  /**
   * 根据时间补充其他字段
   */
  cp.fillData = function(d) {
    d = d || this.d;
    var data = {
      year   : d.getFullYear(),
      month  : d.getMonth() + 1,
      date   : d.getDate(),
      hour   : d.getHours(),
      minute : d.getMinutes(),
      second : d.getSeconds(),
      day : '星期'
    };
    switch (d.getDay()) {
      case 0: data['day'] += '日'; break;
      case 1: data['day'] += '一'; break;
      case 2: data['day'] += '二'; break;
      case 3: data['day'] += '三'; break;
      case 4: data['day'] += '四'; break;
      case 5: data['day'] += '五'; break;
      case 6: data['day'] += '六'; break;
    }
    
    return data;
  }
  
  /**
   * 格式化输出
   */
  cp.format = function(format) {
    format = format || '';
    return format.replace(/y+/g, this.data['year'])
                 .replace(/M+/g, this.complete(this.data['month'], true))
                 .replace(/d+/g, this.complete(this.data['date'], true))
                 .replace(/h+/g, this.complete(this.data['hour'], true))
                 .replace(/m+/g, this.complete(this.data['minute'], true))
                 .replace(/s+/g, this.complete(this.data['second'], true))
                 .replace(/D+/g, this.data['day']);
  }
  
  /**
   * 为指定的日历字段添加或减去指定的时间量
   */
  cp.add = function(field, amount) {
    if(!field || !amount) {
      return;
    }
    var newVal = this.data[field] + amount;
    switch(field) {
      case 'year': this.d.setFullYear(newVal); break;
      case 'month': 
        this.d.setDate(1); 
        this.d.setMonth(newVal); 
        this.d.setDate(0);
        if(this.d.getDate() > this.data['date']) {
          this.d.setDate(this.data['date']);
        }
        break; 
      case 'date': this.d.setDate(newVal); break;
      case 'hour': this.d.setHours(newVal); break;
      case 'minute': this.d.setMinutes(newVal); break;
      case 'second': this.d.setSeconds(newVal); break;
    }

    this.data = this.fillData(this.d);

    return this;
  }
  
  /**
   * 比较两个时间
   */
  cp.compareTo = function(anotherCalendar) {
    anotherCalendar = new Calendar(anotherCalendar);
    var anotherTime = anotherCalendar.get('d', true).getTime();
    return this.get('d').getTime() - anotherTime;
  }

  /**
   * 获得某一字段的数值, 默认不进行格式化
   */
  cp.get = function(field, completion) {
    var result = undefined;
    if(field === 'd') {
      return this.d;
    } else if(field) {
      result = this.data[field];
    }

    if(result !== undefined && result !== null && field !== 'day') {
      result = this.complete(result, completion);
    }
    return result;
  }
  
  /**
   * 当前时间的下个月
   * keepDay： true 日期不变，
   *           false 日期变为月末
   */
  cp.nextMonth = function(keepDay) {
    this.d.setDate(1);
    this.d.setMonth(this.data['month'] + 1);
    this.d.setDate(0);
    if(keepDay && this.d.getDate() > this.data['date']) {
      this.d.setDate(this.data['date']);
    }

    this.data = this.fillData(this.d);
    return this;
  }

  /**
   * 当前时间的上个月
   */
  cp.lastMonth = function(keepDay) {
    this.d.setDate(0);
    if(keepDay && this.d.getDate() > this.data['date']) {
      this.d.setDate(this.data['date']);
    }

    this.data = this.fillData(this.d);
    return this;
  }
  
  /**
   * 当前时间的明天
   */
  cp.tomorrow = function() {
    this.d.setDate(this.data['date'] + 1);
    this.data = this.fillData(this.d);
    return this;
  }
  
  /**
   * 当前时间的昨天
   */
  cp.yesterday = function() {
    this.d.setDate(this.data['date'] - 1);
    this.data = this.fillData(this.d);
    return this;
  }
  
  /**
   * 参数月份中的天数
   */
  Calendar.daysInMonth = function(year, month) {
    year = parseInt(year);
    month = parseInt(month);
    var d = new Date();
    d.setFullYear(year);
    d.setDate(1);
    d.setMonth(month);
    d.setDate(0);
    return d.getDate();
  }
 
  /**
   * 获得当前时间的日历
   */
  Calendar.now = function() {
    return new Calendar(new Date());
  }
})(window || {});