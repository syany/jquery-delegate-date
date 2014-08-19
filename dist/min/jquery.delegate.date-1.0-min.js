/*
 * $.Date v1.0
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Copyright 2013 syany
 * Dual licensed under the MIT or GPL Version 3 licenses.
 * Date: 2014-08-05
 */
(function(c,f,d){c.extend({getLocale:function(){var v=navigator.browserLanguage||navigator.language||navigator.userLanguage||d;if(!!!v){throw Error("It was not possible to get the locale information.")}return v.substr(0,2)},isUndefined:function(v){return jQuery.type(v)==="undefined"},sleep:function(w){w=w||0;var v=new Date().getTime();var x=v+w;while(v<x){v=new Date().getTime()}}});var r=Date,m=12,u=7,a=12,e=86400000,b=3600000,q=600000,i=1000,l=[],h={},k=-1;var o={a:function(){return this.getAmPm()},G:function(){return this.getEra()},y:function(){return this.getYear()},yy:function(){return g(this.getFullYear()%100,2)},yyyy:function(){return g(this.getFullYear()%10000,4)},yyyyy:function(){return g(this.getFullYear()%100000,5)},M:function(){return this.getMonth("min")},MM:function(){return g(this.getMonth("min")%100,2)},MMM:function(){return this.getMonth("abbr")},MMMM:function(){return this.getMonth("normal")},w:function(){return this.getWeekOfMonth()},W:function(){return this.getWeekOfYear()},D:function(){return this.getDayOfYear()},DDD:function(){return g(this.getDayOfYear()%1000,3)},d:function(){return this.getDay()},dd:function(){return g(this.getDay()%100,2)},F:function(){return this.getWDay()},f:function(){return this.getWDay()},e:function(){return this.getWDay("min")},ee:function(){return this.getWDay("abbr")},eee:function(){return this.getWDay("normal")},E:function(){return this.getWDay("min")},EE:function(){return this.getWDay("abbr")},EEE:function(){return this.getWDay("normal")},H:function(){return this.getHours()},HH:function(){return g(this.getHours()%100,2)},h:function(){return this.getHours()%a||a},hh:function(){return g((this.getHours()%a||a)%100,2)},K:function(){return this.getHours()+1},KK:function(){return g((this.getHours()+1)%100,2)},k:function(){return(this.getHours()%a||a)+1},kk:function(){return g(((this.getHours()%a||a)+1)%100,2)},m:function(){return this.getMinutes()},mm:function(){return g(this.getMinutes()%100,2)},s:function(){return this.getSeconds()},ss:function(){return g(this.getSeconds()%100,2)},S:function(){return this.getMilliseconds()},SSS:function(){return g(this.getMilliseconds()%1000,3)},X:function(){return Math.floor(this.getTime()/i)},Z:function(){return this.toTimezoneOffsetString()},z:function(){return this.getTimezoneOffset()}},p=function(w){if(c.isUndefined(w)){w=0}if(c.isUndefined(l[w])){for(var v=l.length;v<=w;v++){l[v]=c.Date.newInstance(c.Date)}}else{if(!!!l[w]._DELEGATE_OBJ_||isNaN(l[w]._DELEGATE_OBJ_)){l[w]=c.Date.newInstance(c.Date)}}return l[w]},j=function(){if(c.Date.isLeapYear(this.getFullYear())){this.lastDayList=[31,29,31,30,31,30,31,31,30,31,30,31]}else{this.lastDayList=[31,28,31,30,31,30,31,31,30,31,30,31]}},s=function(){return(!!c.Date.langs[this.getLocale()])?c.Date.langs[this.getLocale()]:c.Date.langs[this.defaultLocale]},g=function(x,w){var v="00000";var y=v+x;while(y.length<=w){y=v+y}return(y).slice(-1*w)},t=function(x,w){var v=s.apply(this);if(!!v[x]){return this.format(v[x])}else{return this.delegateMethod(w)}},n=function(){var v=this.getFullYear();if(v===k){return}var z={};var x=this.getLocaleLabel("holidays",d,true);var y;for(var w in x){if(c.isFunction(x[w])){y=x[w].apply(this,arguments);z[y.format("yyyy/MM/dd 00:00:00")]=w}else{y=c.Date.newInstance(c.Date,[x[w]]);if(isNaN(y._DELEGATE_OBJ_)){continue}z[y.setYear(v).format("yyyy/MM/dd 00:00:00")]=w}}h=z;k=v};c.Date=c.Delegate.inheritInstance(r,function(){if(isNaN(this._DELEGATE_OBJ_)){return this._DELEGATE_OBJ_}j.apply(this,arguments);this.locale=c.getLocale();this.name="$.Date"});c.extend(c.Date,{langs:{en:{months:{normal:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),abbr:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),min:"1_2_3_4_5_6_7_8_9_10_11_12".split("_")},weekdays:{normal:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),abbr:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),min:"Su_Mo_Tu_We_Th_Fr_Sa".split("_")},time:{am:"AM",pm:"PM"},localeFormat:"ee MMM dd yyyy HH:mm:ss UTCZ",localeDateFormat:"eee, MMMM dd, yyyy",localeTimeFormat:"HH:mm:ss",era:{"A.D.":[0]},holidays:{"new Year days":"01/01"},ntpJSONP:"http://json-time.appspot.com/time.json?tz=UTC&callback=?"}},format:function(v){if(arguments.length===0){throw Error("this method needs arguments.")}var x=[].slice.call(arguments,1);var w=c.Date.newInstance(c.Date,x);return w.format(v)},isLeapYear:function(v){if(arguments.length===0){throw Error("this method needs arguments.")}return(v%4===0&&v%100!==0)||v%400===0},isDate:function(){if(arguments.length===0){throw Error("this method needs arguments.")}var v=p(0).newDelegateInstance.apply(p(0),arguments);return !!!isNaN(v)},toWDayNumber:function(y,x){if(!!c.isUndefined(y)){throw Error("argument Error.")}x=x||"abbr";var A=p();var z=A.getLocaleLabel.apply(A,["weekdays",x,true]);for(var w=0,v;(v=z[w]);w++){if(y===v){return w}}return d}});c.extend(c.Date.prototype,{defaultLocale:"en",addYear:function(v){if(!!!c.isNumeric(arguments[0])){throw Error("argument Error.")}return this.setFullYear(this.getFullYear()+v)},addMonth:function(z){if(!!!c.isNumeric(arguments[0])){throw Error("argument Error.")}var v;var y;var x;if(z>=0){v=Math.floor(z/m);y=Math.floor(z%m);x=this.getMonth()+y;if(x>11){v+=1;x=x-m}}else{v=Math.ceil(z/m);y=Math.ceil(z%m);x=this.getMonth()+y;if(x<0){v-=1;x=m+x}}var w=p(0).setTime(this.getTime());w.setTime(this.getTime());w.setMonth(x).setFullYear(w.getFullYear()+v);if(w.getDay()!==this.getDay()){this.setDay(1);return this.setMonth(x).setFullYear(this.getFullYear()+v).setMonthEnd()}else{return this.setMonth(x).setFullYear(this.getFullYear()+v)}},addDay:function(w){w=w||0;var v=this.getTime();v+=(e*w);return this.setTime(v)},addHours:function(w){w=w||0;var v=this.getTime();v+=(b*w);return this.setTime(v)},addMinutes:function(w){w=w||0;var v=this.getTime();v+=(q*w);return this.setTime(v)},addSeconds:function(w){w=w||0;var v=this.getTime();v+=(i*w);return this.setTime(v)},addMilliseconds:function(w){w=w||0;var v=this.getTime();v+=w;return this.setTime(v)},format:function(w){var v=w.replace(/(a|G|yyyyy?|yy?|MM?M?M?|w|W|DDD|D|dd?|F|f|ee?e?|EE?E?|HH?|hh?|KK?|kk?|mm?|ss?|SSS|S|X|Z|z)/g,(function(y,x){return o[x].apply(this,arguments)}).bind(this));return v},isLeapYear:function(){return c.Date.isLeapYear(this.getFullYear())},isHoliday:function(){var v=this.getWDay();if(v===0||v===6){return true}n.apply(this);return(!!h[this.format("yyyy/MM/dd 00:00:00")])},clone:function(){return c.Date.newInstance(c.Date,this.getTime())},compareDate:function(){var w=c.Date.newInstance(c.Date,[].slice.call(arguments));w.trancateHours();var v=this.clone();v.trancateHours();return(w.getTime()-v.getTime())/e},compareTime:function(){var v=this.newDelegateInstance.apply(this,[].slice.call(arguments));return v.getTime()-this._DELEGATE_OBJ_.getTime()},getLocale:function(){return this.locale},getLocaleLabel:function(x,z,y){var w=s.apply(this);var v=w[x]||d;if(!!v){if(!!z){v=v[z]||d}}if(!!!y&&!!!v){w=c.Date.langs[this.defaultLocale];if(!!z){v=w[x][z]||d}else{v=w[x]||d}}return v},getAmPm:function(){var v=this.getLocaleLabel("time",d,true);return(this.delegateMethod("getHours")<a)?v.am:v.pm},getEra:function(){var y=this.getLocaleLabel("era",d,true);var v=this.delegateMethod("getFullYear");var w="";for(var x in y){if(y[x].length===1){if(v<y[x][0]){w=x+(v-y[x][0]);break}}else{if(v>=y[x][0]&&v<y[x][1]){w=x+(v-y[x][0]+1);break}}}return w},getDayOfYear:function(){var v=p(0).setTime(this.getTime()).setDay(1).setMonth(0);return Math.ceil((this.getTime()-v.getTime())/e)},getWeekOfMonth:function(){var v=p(0).setTime(this.getTime()).setDay(1).trancateHours();var x=v.getWDay()-1;var w=Math.floor((this.getDay()+x)/u);return(v.getWDay()===0)?w+1:w},getWeekOfYear:function(){var v=p(0).setDay(1).setMonth(0).trancateHours();var x=v.getWDay()-1;var w=Math.floor((this.getDayOfYear()+x)/u);return(v.getWDay()===0)?w+1:w},getDate:function(){return this.delegateMethod("toDateString",arguments)},getMonthString:function(){var v=arguments[0]||"abbr";var w=this.getLocaleLabel("months",v);return w[this.getMonth()]},getMonth:function(){if(!!arguments[0]){return this.getMonthString(arguments[0])}else{return this.delegateMethod("getMonth",arguments)}},getDay:function(){return this.delegateMethod("getDate",arguments)},getWDayString:function(){var v=arguments[0]||"abbr";var w=this.getLocaleLabel("weekdays",v);return w[this.getWDay()]},getWDay:function(){if(!!arguments[0]){return this.getWDayString(arguments[0])}else{return this.delegateMethod("getDay",arguments)}},getTimezoneOffset:function(){return this.delegateMethod("getTimezoneOffset",arguments)*-1},getTimezoneOffsetTime:function(){return this.getTimezoneOffset()*q},setLocale:function(v){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}this.locale=v;return this},setDate:function(){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}this.delegateMethod("setTime",[Date.parse(arguments[0])]);j.apply(this,arguments);return this},setYear:function(v){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}if((0+v)<1000){v=v+2000}this.delegateMethod("setYear",[v]);j.apply(this,arguments);return this},setFullYear:function(v){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}this.setYear.apply(this,[v]);return this},setMonth:function(){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}if(!!arguments[1]){var w=arguments[1];var x=this.getLocaleLabel("months",w);for(var v=0,y=x[v];(y=x[v]);v++){if(y===arguments[0]+""){this.delegateMethod("setMonth",[v]);break}}}else{this.delegateMethod("setMonth",arguments)}j.apply(this,arguments);return this},setDay:function(){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}this.delegateMethod("setDate",arguments);j.apply(this,arguments);return this},setMonthEnd:function(){if(this.getMonth()===11){return this.setYear(this.getFullYear()+1).setMonth(0).setDay(0)}else{return this.setMonth(this.getMonth()+1).setDay(0)}},setNumberWeekday:function(z,B,C){if(arguments.length<2){throw Error("argument Error.")}if(!!C){if(z>5){z=5}else{if(z<0){z=0}}}var x=p(0).setTime(this.getTime());var v=p(1).setTime(this.getTime());var A=x.setDay(1).getWDay();var y=B-A+1;if(y<=0){y+=u}v.setDay(y);var w=v.getTime();w+=(e*u*z);x.setTime(w);if(!!C&&(v.getMonth()!==x.getMonth()||v.getFullYear()!==x.getFullYear())){return this.setNumberWeekday(z-1,B,C)}else{this.setTime(w);return this}},setLastWeekday:function(v){return this.setNumberWeekday(5,v,true)},setNow:function(){this.delegateMethod("setTime",[c.Date.now()]);j.apply(this,arguments);return this},roundDays:function(){if(!!!c.Date.isDate.apply(this,arguments)){return -1}var v=this.compareDate.apply(this,arguments);if(v<0){return Math.abs(v)}return v},roundHolidays:function(){if(!!!c.Date.isDate.apply(this,arguments)){return -1}var y=this.compareDate.apply(this,arguments);var v=c.Date.newInstance(c.Date,[].slice.call(arguments));var A=this.clone();var z=0;var x=void 0;if(y<=0){y=Math.abs(y);x=v}else{if(y>0){x=A}}for(var w=0;w<=y;w++,x.addDay(1)){if(!!x.isHoliday()){z++}}return z},roundWorkdays:function(){if(!!!c.Date.isDate.apply(this,arguments)){return -1}var y=this.compareDate.apply(this,arguments);var v=c.Date.newInstance(c.Date,[].slice.call(arguments));var A=this.clone();var z=0;var x=void 0;if(y<=0){y=Math.abs(y)+1;x=v}else{if(y>0){x=A}}for(var w=0;w<y;w++,x.addDay(1)){if(!!!x.isHoliday()){z++}}return z},syncNTP:function(){var v=c.Deferred();c.ajaxSetup({timeout:3*i});var w=this.getLocaleLabel("ntpJSONP",d,true);var x=this;c.getJSON(w).done(function(y){x.setDate(y.datetime);v.resolve(x,y)}).fail(function(){console.log("failed sync NTP[syncNTP].");x.setDate(new Date().getTime());v.reject(x)});return v.promise()},toLocaleString:function(){return t.apply(this,["localeFormat","toLocaleString"])},toLocaleDateString:function(){return t.apply(this,["localeDateFormat","toLocaleDateString"])},toLocaleTimeString:function(){return t.apply(this,["localeTimeFormat","toLocaleTimeString"])},toTimezoneOffsetString:function(){var x=this.getTimezoneOffset();var y=(x<0)?"-":"+";var v=Math.abs(x);var w=p(0);w.setTime(v);return y+g(w.getHours()%100,2)+g(w.getMinutes()%100,2)},trancateMonth:function(){return this.setMonth(0).trancateDay()},trancateDay:function(){return this.setDay(1).trancateHours()},trancateHours:function(){return this.setHours(0).trancateMinutes()},trancateMinutes:function(){return this.setMinutes(0).trancateSeconds()},trancateSeconds:function(){return this.setSeconds(0).trancateMilliseconds()},trancateMilliseconds:function(){return this.setMilliseconds(0)}})})(jQuery,window);(function(b,a,c){b.Date.prototype.getYear=b.Date.prototype.getFullYear;b.Date.prototype.getDYear=b.Date.prototype.getDayOfYear;b.Date.prototype.getWMonth=b.Date.prototype.getWeekOfMonth;b.Date.prototype.getWYear=b.Date.prototype.getWeekOfYear;b.Date.prototype.getDayOfWeek=b.Date.prototype.getWDay;b.Date.prototype.parse=b.Date.prototype.setDate;a.DDate=b.Date})(jQuery,window);(function(c,b,d){var a=function(){if(c.Date.isLeapYear(this.getUTCFullYear())){this.lastDayList=[31,29,31,30,31,30,31,31,30,31,30,31]}else{this.lastDayList=[31,28,31,30,31,30,31,31,30,31,30,31]}};c.extend(c.Date.prototype,{getUTCMonthString:function(){var e=arguments[0]||"abbr";var f=this.getLocaleLabel("months",e);return f[this.getUTCMonth()]},getUTCMonth:function(){if(!!arguments[0]){return this.getUTCMonthString(arguments[0])}else{return this.delegateMethod("getUTCMonth",arguments)}},getUTCDay:function(){return this.delegateMethod("getUTCDate",arguments)},getUTCWDayString:function(){var e=arguments[0]||"abbr";var f=this.getLocaleLabel("weekdays",e);return f[this.getUTCWDay()]},getUTCWDay:function(){if(!!arguments[0]){return this.getUTCWDayString(arguments[0])}else{return this.delegateMethod("getUTCDay",arguments)}},setUTCDate:function(){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}this.delegateMethod("setUTCTime",[Date.parse(arguments[0])]);a.apply(this,arguments);return this},setUTCYear:function(e){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}if((0+e)<1000){e=e+2000}this.delegateMethod("setUTCYear",[e]);a.apply(this,arguments);return this},setUTCFullYear:function(e){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}this.setUTCYear.apply(this,[e]);return this},setUTCMonth:function(){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}if(!!arguments[1]){var f=arguments[1];var g=this.getLocaleLabel("months",f);for(var e=0,h=g[e];(h=g[e]);e++){if(h===arguments[0]+""){this.delegateMethod("setUTCMonth",[e]);break}}}else{this.delegateMethod("setUTCMonth",arguments)}a.apply(this,arguments);return this},setUTCDay:function(){if(c.isUndefined(arguments[0])){throw Error("argument Error.")}this.delegateMethod("setUTCDate",arguments);a.apply(this,arguments);return this}});c.Date.prototype.getUTCYear=c.Date.prototype.getUTCFullYear;c.Date.prototype.getUTCDayOfWeek=c.Date.prototype.getUTCWDay;c.Date.prototype.setUTCDayOfWeek=c.Date.prototype.setUTCWDay;c.Date.prototype.parseUTC=c.Date.prototype.setUTCDate})(jQuery,window);