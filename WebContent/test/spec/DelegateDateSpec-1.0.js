;
(function() {
  describe('$.Date', function() {

    describe('#01 Instance Test', function() {

      beforeEach(function() {
        $.Date.removeInstance();
      });
      afterEach(function() {});

      it("[T] Function results Date String. [$.Date('2014/07/07 00:01:00') => '2014/07/07 00:01:00']", function() {
        expect($.Date('2014/07/07 00:01:00')).toEqual(Date('2014/07/07 00:01:00'));
      });
      it("[+] Basic new without param. [($.Date.getInstance() => $.Date instance]", function() {
        expect($.Date.getInstance()).not.toBe(null);
      });
      it("[+] Basic new with param. [$.Date.getInstance(2014, 08, 08) => '2014/08/08']", function() {
        expect($.Date.getInstance(2014, 08, 08)).not.toBe(null);
      });
      it("[+] Basic new with param. [$.Date.getInstance('2013/06/01 0:00:12') => '2013/06/01 0:00:12']", function() {
        expect($.Date.getInstance('2013/06/01 0:00:12')).not.toBe(null);
      });
    });

    describe('#02 isLeapYear Test', function() {

      beforeEach(function() {
        $.Date.removeInstance();
      });
      afterEach(function() {});

      it("[+] 2008 is LeapYear [$.Date.isLeapYear('2008')).toBe(true)].", function() {
        expect($.Date.isLeapYear('2007')).toBe(false);
        expect($.Date.isLeapYear('2008')).toBe(true);
        expect($.Date.isLeapYear('2009')).toBe(false);
      });
      it("[+] 2000 is LeapYear [$.Date.isLeapYear('2000')).toBe(true)].", function() {
        expect($.Date.isLeapYear('1999')).toBe(false);
        expect($.Date.isLeapYear('2000')).toBe(true);
        expect($.Date.isLeapYear('2001')).toBe(false);
      });
      it("[+] 2100 is not LeapYear [$.Date.isLeapYear('2100')).toBe(false)].", function() {
        expect($.Date.isLeapYear('2099')).toBe(false);
        expect($.Date.isLeapYear('2100')).toBe(false);
        expect($.Date.isLeapYear('2101')).toBe(false);
        expect($.Date.isLeapYear('2102')).toBe(false);
        expect($.Date.isLeapYear('2103')).toBe(false);
        expect($.Date.isLeapYear('2104')).toBe(true);
      });
      it("[+] $.Date instances isLeapYear(2100) is false [$.Date.getInstance().setYear(2100).isLeapYear('2100')).toBe(false)].", function() {
        // var $date = Object.create($.Date.prototype, $.Delegate.prototype);
        var $date = $.Date.getInstance();
        expect($date.setYear(2099).isLeapYear('2099')).toBe(false);
        expect($date.setYear(2100).isLeapYear('2100')).toBe(false);
        expect($date.setYear(2101).isLeapYear('2101')).toBe(false);
        expect($date.setYear(2102).isLeapYear('2102')).toBe(false);
        expect($date.setYear(2103).isLeapYear('2103')).toBe(false);
        expect($date.setYear(2104).isLeapYear('2104')).toBe(true);
      });
    });

    describe('#03 isDate Test', function() {
      it("[+] 2001/1/1 is true [$.Date.isDate('2001/1/1')).toBe(true)]", function() {
        expect($.Date.isDate('2001/1/1')).toBe(true);
      });
      it("[+] Fri May 02 2014 is true [$.Date.isDate('Fri May 02 2014')).toBe(true)].", function() {
        expect($.Date.isDate('Fri May 02 2014')).toBe(true);
      });
      it("[+] 22222222/2/29 is not true [$.Date.isDate('22222222/2/29')).not.toEqual(true)]", function() {
        expect($.Date.isDate('22222222/2/29')).not.toEqual(true);
      });
      it("[+] 'aaa' is not true [$.Date.isDate('aaa')).not.toEqual(true)].", function() {
        expect($.Date.isDate('aaa')).not.toEqual(true);
      });
      it("[+] '2014,1,1,9,0,0' is true [$.Date.isDate(2014,1,1,9,0,0)).toEqual(true)]", function() {
        expect($.Date.isDate(2014,1,1,9,0,0)).toEqual(true);
      });
      it("[+] '2014,a,32' is not true [$.Date.isDate(2014,'a',32)).not.toEqual(true)]", function() {
        expect($.Date.isDate(2014,'a',32)).not.toEqual(true);
      });
    });

    describe('#04 setYear Test', function() {
      var $date = void (0);

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance();
      });

      it("[+] 2004 is 2004 [$date.setYear(2004).getFullYear()).toBe(2004)].", function() {
        expect($date.setYear(2004).getFullYear()).toBe(2004);
      });
      it("[+] 4 is 2004 (*Not 1904!!) [$date.setYear(4).getFullYear()).toBe(2004)].", function() {
        expect($date.setYear(4).getFullYear()).toBe(2004);
      });
      it("[+] 0 is 2000 (*Not 1900!!) [$date.setYear(0).getFullYear()).toBe(2000)].", function() {
        expect($date.setYear(0).getFullYear()).toBe(2000);
      });
      it("[+] 9999 is 9999 [$date.setYear(9999).getFullYear()).toBe(9999)] Specific JavaScript.", function() {
        expect($date.setYear(9999).getFullYear()).toBe(9999);
      });
      it("[T] No-param throw Error [$date.setYear() => throw Error('argument Error.')].", function() {
        try {
          $date.setYear();
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });
      it("[T] 'aa' param throw Error [$date.setYear('aa') => throw Error('argument Error.')].", function() {
        try {
          $date.setYear('aa');
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });
    });
    // describe('#05 compareDate Test', function() {
    // var $date = void(0);
    //
    // beforeEach(function() {
    // $date = $.Date.getInstance().setYear(14).setMonth(6).setDate(14).setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
    // //$date.setYear(14).setMonth(6).setDate(14);
    // });
    //
    // it("[+] compareDate 2014/7/14 compare 2014/7/14 is '0'.", function() {
    // expect($date.compareDate('2014/7/14 00:00:00')).toBe(0);
    // });
    // it("[+] compareDate 2014/7/14 compare 2014/7/13 is less than 0(<0).", function() {
    // expect($date.compareDate('2014/7/13 00:00:00')).toBeLessThan(0);
    // });
    // it("[+] compareDate 2014/7/14 compare 2014/7/14 is greater than 0(>0).", function() {
    // expect($date.compareDate('2014/7/15 00:00:00')).toBeGreaterThan(0);
    // });
    //
    // it("[+] compareDate 2014/7/14 compare 2014/6/14 is less than 0(<0).", function() {
    // expect($date.compareDate('2014/6/14 00:00:00')).toBeLessThan(0);
    // });
    // it("[+] compareDate 2014/7/14 compare 2014/8/14 is greater than 0(>0).", function() {
    // expect($date.compareDate('2014/8/14 00:00:00')).toBeGreaterThan(0);
    // });
    //
    // it("[+] compareDate 2014/7/14 compare 2013/7/14 is less than 0(<0).", function() {
    // expect($date.compareDate('2013/7/14 00:00:00')).toBeLessThan(0);
    // });
    // it("[+] compareDate 2014/7/14 compare 2015/7/14 is greater than 0(>0).", function() {
    // expect($date.compareDate('2015/7/14 00:00:00')).toBeGreaterThan(0);
    // });
    //
    // it("[+] compareDate 2014/7/14 compare 2014/7/14 01:00:00 is 0.", function() {
    // expect($date.compareDate('2014/7/14 01:00:00')).toBe(0);
    // });
    // it("[+] compareDate 2014/7/14 compare 2014/7/14 00:01:00 is 0.", function() {
    // expect($date.compareDate('2014/7/14 00:01:00')).toBe(0);
    // });
    // it("[+] compareDate 2014/7/14 compare 2014/7/14 00:00:01 is 0.", function() {
    // expect($date.compareDate('2014/7/14 00:00:01')).toBe(0);
    // });
    // it("[+] compareDate 2014/7/14 compare 2014/7/14 00:00:00.001 is 0.", function() {
    // expect($date.compareDate('2014/7/14 00:00:00.001')).toBe(0);
    // });
    // });
    describe('#05 setFullYear Test', function() {
      var $date = void (0);

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance();
      });

      it("[+] setFullYear 2004 is 2004.", function() {
        expect($date.setFullYear(2004).getFullYear()).toBe(2004);
      });
      it("[+] setFullYear 4 is 2004.", function() {
        expect($date.setFullYear(4).getFullYear()).toBe(2004);
      });
      it("[+] setFullYear 0 is 2000.", function() {
        expect($date.setFullYear(0).getFullYear()).toBe(2000);
      });
      it("[+] setFullYear 9999 is 9999.", function() {
        expect($date.setFullYear(9999).getFullYear()).toBe(9999);
      });
      it("[T] setFullYear not param throw Error.", function() {
        try {
          $date.setFullYear();
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });
      it("[T] setFullYear 10000 param throw Error.", function() {
        try {
          $date.setFullYear(10000);
        } catch (e) {
          expect(e).toThrow();
        }
      });
      it("[T] setFullYear aa param throw Error.", function() {
        try {
          $date.setFullYear('aa');
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });
    });
    describe('#06 $.getLocale Test', function() {
      var brLang = null, lang = null, userLang = null;
      beforeEach(function() {
        $.Date.removeInstance();
        brLang = navigator.browserLanguage;
        lang = navigator.language;
        userLang = navigator.userLanguage;
      });

      afterEach(function() {
        navigator.browserLanguage = brLang;
        navigator.language = lang;
        navigator.userLanguage = userLang;
      });

      // it("[+] getLocale is en from navigator.browserLanguage.", function() {
      // if (!!navigator.browserLanguage) {
      // navigator.browserLanguage = 'en_BR';
      // expect($.getLocale()).toBe('en');
      // } else {
      // expect($.getLocale()).not.toBe('en');
      //
      // }
      // });
      // it("[+] getLocale is en from navigator.language.", function() {
      // //navigator.browserLanguage = null;
      // //navigator.language = 'en_BR';
      // $.extend(navigator ,{
      // browserLanguage : null,
      // language :'en_BR'
      // });
      // expect($.getLocale()).toBe('en');
      // });
      // it("[+] getLocale is en from navigator.userLanguage.", function() {
      // navigator.browserLanguage = null;
      // navigator.language = null;
      // navigator.userLanguage ='en_BR';
      // expect($.getLocale()).toBe('en');
      // });
      // it("[+] getLocale is en from navigator.language.", function() {
      // //navigator.browserLanguage = void(0);
      // navigator.language = 'en_BR';
      // expect($.getLocale()).toBe('en');
      // });
    });
    describe('#07 getLocaleLabel Test', function() {
      var $date = void (0);
      var jTime = undefined;
      var mAbbr = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance();
        jTime = $.Date.langs.ja.time;
        mAbbr = $.Date.langs.ja.months.abbr;
        $.Date.langs.ja.time = undefined;
        $.Date.langs.ja.months.abbr = undefined;

      });
      afterEach(function() {
        $.Date.langs.ja.time = jTime;
        $.Date.langs.ja.months.abbr = mAbbr;
      });

      it("[+] normal localeFormat.", function() {
        expect($date.getLocaleLabel('localeFormat')).toEqual('yyyy年MM月dd日(ee) HH:mm:ss UTCZ');
      });
      it("[+] subKey normal.", function() {
        expect($date.getLocaleLabel('weekdays', 'min', true)).toEqual('日_月_火_水_木_金_土'.split('_'));
      });
      it("[+] subKey none.", function() {
        expect($date.getLocaleLabel('time', 'GGG', true)).toEqual(undefined);
      });

      it("[+] key none change to default.", function() {
        expect($date.getLocaleLabel('time', 'am')).toEqual('AM');
      });
      it("[+] subkey none change to default.", function() {
        expect($date.getLocaleLabel('months', 'abbr')).toEqual("Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"));
      });
      it("[+] key none change to no default.", function() {
        expect($date.getLocaleLabel('time', 'am', true)).toEqual(undefined);
      });
      it("[+] subkey none change to no default.", function() {
        expect($date.getLocaleLabel('months', 'abbr', true)).toEqual(undefined);
      });
    });

    describe('#08 setMonth Test', function() {
      var $date = void (0);

      var jTime = undefined;
      var mAbbr = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance();
        jTime = $.Date.langs.ja.time;
        mAbbr = $.Date.langs.ja.months.abbr;
        $.Date.langs.ja.time = undefined;
        $.Date.langs.ja.months.abbr = undefined;

      });
      afterEach(function() {
        $.Date.langs.ja.time = jTime;
        $.Date.langs.ja.months.abbr = mAbbr;
      });

      // it("[+] setMonth param 12 throw Error.", function() {
      // try {
      // $date.setMonth!(12);
      // expect($date).toEqual(undefined);
      // } catch(e) {
      // expect(e).toEqual(TypeError('undefined is not a function'));
      // }
      // });
      it("[+] setMonth 0 is 0.", function() {
        expect($date.setMonth(0).getMonth()).toBe(0);
      });
      it("[+] setMonth 11 is 11.", function() {
        expect($date.setMonth(11).getMonth()).toBe(11);
      });
      it("[+] setMonth param 12 throw Error.", function() {
        try {
          $date.setMonth(3);
          $date.setMonth(12);
          expect($date.getMonth()).toEqual(0);
        } catch (e) {
          expect(e).toEqual(TypeError('undefined is not a function'));
        }
      });
      it("[T] setMnth not param throw Error.", function() {
        try {
          $date.setMonth();
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });

      it("[+] setMonth min '1' is 1.", function() {
        expect($date.setMonth(1, 'min').getMonth()).toBe(0);
      });
      it("[+] setMonth min '12' is 11.", function() {
        expect($date.setMonth(12, 'min').getMonth()).toBe(11);
      });
      it("[+] setMonth abbr 'Jan' is 1.", function() {
        expect($date.setMonth('Jan', 'abbr').getMonth('abbr')).toBe('Jan');
      });
      it("[+] setMonth abbr 'Dec' is 11.", function() {
        expect($date.setMonth('Dec', 'abbr').getMonth()).toBe(11);
      });
      it("[+] setMonth normal '１' is 0.", function() {
        expect($date.setMonth('１', 'normal').getMonthString('normal')).toBe('１');
      });
      it("[+] setMonth normal '１２' is 11.", function() {
        expect($date.setMonth('１２', 'normal').getMonth()).toBe(11);
      });
      it("[+] setMonth abbr 'Jack' is not 1.", function() {
        $date.setMonth(8, 'min');
        expect($date.setMonth('Jack', 'abbr').getMonth()).toBe(7);
      });
    });

    describe('#09 setDate Test', function() {

      var $date = void (0);

      var mAbbr = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance();
        jTime = $.Date.langs.ja.time;
        mAbbr = $.Date.langs.ja.months.abbr;
        $.Date.langs.ja.months.abbr = undefined;

      });
      afterEach(function() {
        $.Date.langs.ja.months.abbr = mAbbr;
      });

      it("[+] setDate setDate is function", function() {
        expect($.isFunction($date.setDate)).toBe(true);
      });
      it("[+] setDate not param throw Error.", function() {
        try {
          $date.setDate();
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });
      it("[+] setDate 2001/1/1", function() {
        expect($date.setDate('2001/1/1').getDate()).toBe('Mon Jan 01 2001');
      });
      it("[+] setDate Fri May 02 2014 02:00:00 GMT+0900.", function() {
        expect($date.setDate('Fri May 02 2014 02:00:00 GMT+0900').getDate()).toBe('Fri May 02 2014');
      });
      it("[+] setDate not 22222222/2/29", function() {
        expect($.Date.isDate($date.setDate('22222222/2/29').getDate())).toEqual(false);
      });
      it("[+] setDate not aaa", function() {
        expect($.Date.isDate($date.setDate('aaa').getDate())).toEqual(false);
      });
      it("[+] setDate [2013, 08, 6] is true", function() {
        expect($.Date.isDate($date.setDate(2013, 08, 6).getDate())).toEqual(true);
      });
    });

    describe('#10 setDay Test', function() {

      var $date = undefined;
      var mAbbr = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/07/05');
        jTime = $.Date.langs.ja.time;
        mAbbr = $.Date.langs.ja.months.abbr;
        $.Date.langs.ja.months.abbr = undefined;

      });
      afterEach(function() {
        $.Date.langs.ja.months.abbr = mAbbr;
      });

      it("[+] setDay setDay is function", function() {
        expect($.isFunction($date.setDay)).toBe(true);
      });
      it("[T] setDay not param throw Error.", function() {
        try {
          $date.setDay();
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });
      it("[+] setDay 1/31 is 31", function() {
        expect($date.setMonth(0).setDay('31').getDay()).toBe(31);
      });
      it("[+] setDay 2/30 is not 30.", function() {
        expect($date.setMonth(1).setDay('30').getDay()).not.toBe(30);
      });
      it("[+] setDate 1/30 -1 is not 29", function() {
        expect($date.setMonth(0).setDay('30').setDay(-1).getDay()).not.toBe(29);
      });
    });

    describe('#11 setDate/getWDay/getWDayString Test', function() {
      var $date = void (0);

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance();
      });

      afterEach(function() {});

      it("[+] setDate min '日' is 0.", function() {
        expect($date.setDate('2014/07/13 00:00:00').getWDay()).toBe(0);
      });
      it("[+] setDate min '土' is 6.", function() {
        expect($date.setDate('2014/07/12 00:00:00').getWDay()).toBe(6);
      });
      it("[+] setDate abbr '火曜' is 火曜.", function() {
        expect($date.setDate('2014/07/15 00:00:00').getWDay('abbr')).toBe('火曜');
      });
      it("[+] setDate abbr '木曜' is 4.", function() {
        expect($date.setDate('2014/07/17 00:00:00').getWDay()).toBe(4);
      });
      it("[+] setDate normal '月曜日' is 1.", function() {
        expect($date.setDate('2014/07/14 00:00:00').getWDayString('normal')).toBe('月曜日');
      });
      it("[+] setDate normal '水曜日' is 3.", function() {
        expect($date.setDate('2014/07/16 00:00:00').getWDay()).toBe(3);
      });
      it("[+] setDate abbr 'Jack' is not 1.", function() {
        $date.setDate('2014/07/14 00:00:00');
        expect($date.setDate('', 'abbr').getWDay()).toEqual(NaN);
      });
    });

    describe('#12 setMonthEnd Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $date = $.Date.removeInstance().getInstance('2014/01/01 00:00:00');

      });
      afterEach(function() {});

      it("[+] setMonthEnd setMonthEnd is function", function() {
        expect($.isFunction($date.setMonthEnd)).toBe(true);
      });
      it("[+] setMonthEnd Jan is 31", function() {
        expect($date.setMonth(0).setMonthEnd().getDay()).toBe(31);
      });
      it("[+] setMonthEnd Feb 2014 is not 28.", function() {
        expect($date.setMonth(1).setMonthEnd().getDay()).toBe(28);
      });
      it("[+] setMonthEnd Feb 2012 is not 30.", function() {
        expect($date.setYear(2012).setMonth(1).setMonthEnd().getDay()).toBe(29);
      });
      it("[+] setMonthEnd Dec is not 31.", function() {
        expect($date.setMonth(11).setMonthEnd().getDay()).toBe(31);
      });
    });
    describe('#13 setNow Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $date = $.Date.removeInstance().getInstance('2014/01/01 00:00:00');

      });
      afterEach(function() {});

      it("[+] setNow setNow is function", function() {
        expect($.isFunction($date.setNow)).toBe(true);
      });
      it("[+] setNow is Date", function() {
        var dateS = new Date();
        expect($date.setNow().getDate()).toBe(dateS.toDateString());
      });
      it("[+] setNow is Date.now", function() {
        expect($date.setNow().getTime()).toBe(Date.now());
      });
    });

    describe('#14 compareDate Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/02');

      });
      afterEach(function() {});

      it("[+] compareDate is function", function() {
        expect($.isFunction($date.compareDate)).toBe(true);
      });
      it("[+] compareDate(2014/1/2) is Date(2014/1/2) compare", function() {
        expect($date.compareDate('2014/01/02 00:00:00')).toBe(0);
      });
      it("[+] compareDate(2014/1/2) is Date(2014/1/1) compare", function() {
        expect($date.compareDate('2014/01/01 00:00:00')).toBeLessThan(0);
      });
      it("[+] compareDate(2014/1/2) is Date(2014/1/3) compare", function() {
        expect($date.compareDate('2014/01/03 00:00:00')).toBeGreaterThan(0);
      });
      it("[+] compareDate(2014/1/2 00:00:00) is Date compare(2014/1/2 00:00:01)", function() {
        expect($date.compareDate('2014/01/02 00:00:01')).toBe(0);
      });
      it("[+] compareDate(2014/1/2 00:00:00) diff [2013/12/31 23:00:01] is -2)", function() {
        expect($date.compareDate('2013/12/31 23:00:01')).toBe(-2);
      });
    });

    describe('#15 getTimezoneOffset Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/02 02:22:22');

      });
      afterEach(function() {});

      it("[+] getTimezoneOffset is function", function() {
        expect($.isFunction($date.getTimezoneOffset)).toBe(true);
      });
      it("[+] getTimezoneOffset is -540(-0900)", function() {
        expect($date.getTimezoneOffset()).toBe(540);
      });
      it("[+] getTimezoneOffsetTime is -540(-0900)", function() {
        expect($date.getTimezoneOffsetTime()).toBe(540 * 600000);
      });
      it("[+] toTimezoneOffsetString is -540(-0900)", function() {
        expect($date.toTimezoneOffsetString()).toBe('+0900');
      });
    });

    describe('#16 trancateXXXX Test', function() {

      var $date = undefined;
      var lDate = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/02 02:22:22');
        lDate = new Date('2014/01/02 02:22:22');
        tmpLoc = $.Date.langs.ja.localeDateFormat;
        $.Date.langs.ja.localeDateFormat = undefined;

      });
      afterEach(function() {
        $.Date.langs.ja.localeDateFormat = tmpLoc;
      });

      it("[+] trancateHours is function", function() {
        expect($.isFunction($date.trancateHours)).toBe(true);
      });
      it("[+] trancateHours is 2014/01/02 00:00:00", function() {
        expect(
          $date.trancateHours().toLocaleDateString() + ' ' + $date.getHours() + ':' + $date.getMinutes() + ':' + $date.getSeconds() + '.'
            + $date.getMilliseconds()).toEqual(lDate.toLocaleDateString() + ' 0:0:0.0');
      });
      it("[+] trancateMinutes is 2014/01/02 02:00:00", function() {
        expect(
          $date.trancateMinutes().toLocaleDateString() + ' ' + $date.getHours() + ':' + $date.getMinutes() + ':' + $date.getSeconds() + '.'
            + $date.getMilliseconds()).toEqual(lDate.toLocaleDateString() + ' 2:0:0.0');
      });
      it("[+] trancateSeconds is 2014/01/02 02:22:00", function() {
        expect(
          $date.trancateSeconds().toLocaleDateString() + ' ' + $date.getHours() + ':' + $date.getMinutes() + ':' + $date.getSeconds() + '.'
            + $date.getMilliseconds()).toEqual(lDate.toLocaleDateString() + ' 2:22:0.0');
      });
    });

    describe('#17 setMonthEnd Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] setMonthEnd is function", function() {
        expect($.isFunction($date.setMonthEnd)).toBe(true);
      });
      it("[+] setMonthEnd 2014/1/1 is 2014/1/31", function() {
        expect($date.setMonthEnd().toDateString()).toBe('Fri Jan 31 2014');
      });
      it("[+] setMonthEnd 2014/12/1 is 2014/12/31", function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/12/01 02:22:22');
        expect($date.setMonthEnd().toDateString()).toBe('Wed Dec 31 2014');
      });
    });

    describe('#18 setNumberWeekday Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/07/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] setNumberWeekday is function", function() {
        expect($.isFunction($date.setNumberWeekday)).toBe(true);
      });
      it("[+] setNumberWeekday 2014 July 4th Sat is 2014/7/26", function() {
        expect($date.setNumberWeekday(3, 6).toDateString()).toBe('Sat Jul 26 2014');
      });
      it("[+] setNumberWeekday 2014 July 5th Sat is 2014/8/2", function() {
        expect($date.setNumberWeekday(4, 6).toDateString()).toBe('Sat Aug 02 2014');
      });
      it("[+] setNumberWeekday 2014 Jan 0th Sat is 2013/12/28", function() {
        expect($date.setDate('2014/1/28').setNumberWeekday(0, 6).toDateString()).toBe('Sat Jan 04 2014');
      });
      it("[+] setNumberWeekday 2013 Dec 11th Sat is 2014/2/15", function() {
        expect($date.setDate('2013/12/28').setNumberWeekday(10, 6).toDateString()).toBe('Sat Feb 15 2014');
      });
      it("[+] setNumberWeekday 2013 Dec 57th Sat is 2015/1/2", function() {
        expect($date.setDate('2013/12/28').setNumberWeekday(56, 6).toDateString()).toBe('Sat Jan 03 2015');
      });
      it("[+] setNumberWeekday 2014 July 5th Sat is 2014/7/26", function() {
        expect($date.setNumberWeekday(4, 6, 1).toDateString()).toBe('Sat Jul 26 2014');
      });
      it("[T] setNumberWeekday 2014 Jan 0th Sat is Error('argument Error.')", function() {

        try {
          $date.setDate('2014/1/28').setNumberWeekday(0, 6, 1);
          expect($date.toDateString()).toBe('Sat Jan 04 2014');
        } catch (e) {
          expect(e).toEqual(Error('argument Error.'));
        }
      });
      it("[+] setNumberWeekday 2013 Dec 11th Sat is 2013/1/28", function() {
        expect($date.setDate('2013/12/28').setNumberWeekday(10, 6, 1).toDateString()).toBe('Sat Dec 28 2013');
      });
      it("[+] setNumberWeekday 2013 Dec 57th Sat is 2013/1/28", function() {
        expect($date.setDate('2013/12/28').setNumberWeekday(56, 6, 1).toDateString()).toBe('Sat Dec 28 2013');
      });
    });

    describe('#19 setLastWeekday Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/07/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] setLastWeekday is function", function() {
        expect($.isFunction($date.setLastWeekday)).toBe(true);
      });
      it("[+] setLastWeekday 2014 July Last Sat is 2014/7/26", function() {
        expect($date.setLastWeekday(6).toDateString()).toBe('Sat Jul 26 2014');
      });
      it("[+] setLastWeekday 2014 Aug Last Sat is 2014/8/30", function() {
        expect($date.setDate('2014/8/2').setLastWeekday(6).toDateString()).toBe('Sat Aug 30 2014');
      });
      it("[+] setLastWeekday 2014 Aug Last Sat is 2014/8/31", function() {
        expect($date.setDate('2014/8/2').setLastWeekday($.Date.toWDayNumber('日曜')).toDateString()).toBe('Sun Aug 31 2014');
      });
      it("[+] setLastWeekday 2014 Aug Last Sat is 2014/8/25", function() {
        expect($date.setDate('2014/8/2').setLastWeekday($.Date.toWDayNumber('月', 'min')).toDateString()).toBe('Mon Aug 25 2014');
      });
      it("[+] setLastWeekday 2014 Aug Last Sat is 2014/8/26", function() {
        expect($date.setDate('2014/8/2').setLastWeekday($.Date.toWDayNumber('火', 'min')).toDateString()).toBe('Tue Aug 26 2014');
      });
      it("[+] setLastWeekday 2014 Aug Last Sat is 2014/8/27", function() {
        expect($date.setDate('2014/8/2').setLastWeekday($.Date.toWDayNumber('水', 'min')).toDateString()).toBe('Wed Aug 27 2014');
      });
      it("[+] setLastWeekday 2014 Aug Last Sat is 2014/8/28", function() {
        expect($date.setDate('2014/8/2').setLastWeekday($.Date.toWDayNumber('木', 'min')).toDateString()).toBe('Thu Aug 28 2014');
      });
      it("[+] setLastWeekday 2014 Aug Last Sat is 2014/8/29", function() {
        expect($date.setDate('2014/8/2').setLastWeekday($.Date.toWDayNumber('金曜日', 'normal')).toDateString()).toBe('Fri Aug 29 2014');
      });
    });

    describe('#20 addXX Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/07/31 22:22:22');

      });
      afterEach(function() {});

      it("[+] addYear is function", function() {
        expect($.isFunction($date.addYear)).toBe(true);
      });
      it("[+] addYear 2014 Jul 31 + 1Year is 2015/7/31(Fri)", function() {
        expect($date.addYear(1).toDateString()).toBe('Fri Jul 31 2015');
      });
      it("[+] addYear 2014 Jul 31 - 1Year is 2013/7/31(Wed)", function() {
        expect($date.addYear(-1).toDateString()).toBe('Wed Jul 31 2013');
      });

      it("[+] addMonth is function", function() {
        expect($.isFunction($date.addMonth)).toBe(true);
      });
      it("[+] addMonth 2014 Jul 31 + 1Month is 2014/8/31(Sun)", function() {
        expect($date.addMonth(1).toDateString()).toBe('Sun Aug 31 2014');
      });
      it("[+] addMonth 2014 Jul 31 - 1Month is 2014/6/30(Mon)", function() {
        expect($date.addMonth(-1).toDateString()).toBe('Mon Jun 30 2014');
      });
      it("[+] addMonth 2014 Jul 31 + 13Month is 2015/8/31(Sun)", function() {
        expect($date.addMonth(13).toDateString()).toBe('Mon Aug 31 2015');
      });
      it("[+] addMonth 2014 Jul 31 - 13Month is 2013/6/30(Mon)", function() {
        expect($date.addMonth(-13).toDateString()).toBe('Sun Jun 30 2013');
      });
      it("[+] addMonth 2014 Jul 31 + 7Month is 2015/2/28(Sat)", function() {
        expect($date.addMonth(7).toDateString()).toBe('Sat Feb 28 2015');
      });
      it("[+] addMonth 2014 Jul 31 - 29Month is 2012/2/29(Wed)", function() {
        expect($date.addMonth(-29).toDateString()).toBe('Wed Feb 29 2012');
      });
      it("[+] addMonth 2014 Jul 31 + 7 and -7 Month is 2014/7/28(Mon)", function() {
        expect($date.addMonth(7).addMonth(-7).toDateString()).toBe('Mon Jul 28 2014');
      });
      it("[+] addMonth 2014 Jul 31 - 29 and +29Month is 2014/7/29(Tue)", function() {
        $date.addMonth(-29);
        expect($date.addMonth(29).toDateString()).toBe('Tue Jul 29 2014');
      });
      it("[+] addMonth 2014 Jul 31 +1 Month is 2014/8/1(Fri)", function() {
        // $date.setDate('2014/7/30');
        expect($date.addDay(1).toDateString()).toBe('Fri Aug 01 2014');
      });
      it("[+] addMonth 2014 Aug 1 -1 Month is 2014/7/31(Thu)", function() {
        $date.setDate('2014/08/01');
        expect($date.addDay(-1).toDateString()).toBe('Thu Jul 31 2014');
      });
    });

    describe('#21 getAmPm Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] getAmPm is function", function() {
        expect($.isFunction($date.getAmPm)).toBe(true);
      });
      it("[+] getAmPm 02:22:22 is 午前", function() {
        expect($date.getAmPm()).toBe('午前');
      });
      it("[+] getAmPm 14:22:22 is 午後", function() {
        expect($date.addHours(12).getAmPm()).toBe('午後');
      });
    });

    describe('#22 getEra Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] getEra is function", function() {
        expect($.isFunction($date.getEra)).toBe(true);
      });
      it("[+] getEra 2014 is 平成26", function() {
        expect($date.getEra()).toBe('平成26');
      });
      it("[+] getEra 1869 is 明治2", function() {
        expect($date.setYear(1869).getEra()).toBe('明治2');
      });
    });

    describe('#23 getDayOfYear(getDYear) Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] getDayOfYear is function", function() {
        expect($.isFunction($date.getDayOfYear)).toBe(true);
      });
      it("[+] getDayOfYear 2014/01/23 is 22", function() {
        expect($date.setDate('2014/01/23').getDayOfYear()).toBe(22);
      });
      it("[+] getDayOfYear 2014/12/25 is 365 - (31 - 25 + 1)", function() {
        expect($date.setDate('2014/12/25').getDayOfYear()).toBe(365 - 7);
      });
      it("[+] getDayOfYear(getDYear) 2014/01/25 is 24", function() {
        expect($date.setDate('2014/01/25').getDYear()).toBe(24);
      });
    });

    describe('#24 getWeekOfMonth(getWMonth) Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] getWeekOfMonth is function", function() {
        expect($.isFunction($date.getWeekOfMonth)).toBe(true);
      });
      it("[+] getWeekOfMonth 2014/01/01 is 0", function() {
        expect($date.setDate('2014/01/01').getWeekOfMonth()).toBe(0);
      });
      it("[+] getWeekOfMonth 2014/01/23 is 3", function() {
        expect($date.setDate('2014/01/23').getWeekOfMonth()).toBe(3);
      });
      it("[+] getWeekOfMonth 2014/12/01 is 0", function() {
        expect($date.setDate('2014/12/01').getWeekOfMonth()).toBe(0);
      });
      it("[+] getWeekOfMonth(getWMonth) 2014/12/25 is 3", function() {
        expect($date.setDate('2014/12/25').getWMonth()).toBe(3);
      });
    });

    describe('#25 getWeekOfYear(getWYear) Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] getWeekOfYear is function", function() {
        expect($.isFunction($date.getWeekOfYear)).toBe(true);
      });
      it("[+] getWeekOfYear 2014/01/01 is 0", function() {
        expect($date.setDate('2014/01/01').getWeekOfYear()).toBe(0);
      });
      it("[+] getWeekOfYear 2014/01/23 is 4", function() {
        expect($date.setDate('2014/01/23').getWeekOfYear()).toBe(3);
      });
      it("[+] getWeekOfYear 2014/12/01 is 48", function() {
        expect($date.setDate('2014/12/01').getWeekOfYear()).toBe(48);
      });
      it("[+] getWeekOfYear(getWYear) 2014/12/25 is 51", function() {
        expect($date.setDate('2014/12/25').getWYear()).toBe(51);
      });
    });

    describe('#26 format($.Date.format) Test', function() {

      var $date = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/01/01 02:22:22');

      });
      afterEach(function() {});

      it("[+] format is function", function() {
        expect($.isFunction($date.format)).toBe(true);
      });
      it("[+] format yyyy/MM/dd is 2014/01/01", function() {
        expect($date.setDate('2014/01/01').format('yyyy/MM/dd')).toBe('2014/01/01');
      });
      it("[+] format aG年 is 午前平成26年", function() {
        expect($date.setDate('2014/01/01').format('aG年')).toBe('午前平成26年');
      });
      it("[+] format y, yy, yyyyyyyy, yyyyyyy, yyyy is [114, 14, 0201414114, 0201414, 2014]", function() {
        expect($date.setDate('2014/01/01').format('y, yy, yyyyyyyy, yyyyyyy, yyyy')).toBe('114, 14, 0201414114, 0201414, 2014');
      });
      it("[+] format M, MM, MMMMMMM is [1, 01, １1, 1, １１]", function() {
        expect($date.setDate('2014/01/01').format('M, MM, MMMMMMM, MMM, MMMMMMMM')).toBe('1, 01, １1, 1, １１');
      });
      it("[+] format wW is [00, 0, 0]", function() {
        expect($date.setDate('2014/01/01').format('wW, W, w')).toBe('00, 0, 0');
      });
      it("[+] format wW is [425, 25, 4]", function() {
        expect($date.setDate('2014/06/23').format('wW, W, w')).toBe('425, 25, 4');
      });
      it("[+] format DDDD, D, DDD is [173173, 173, 173]", function() {
        expect($date.setDate('2014/06/23').format('DDDD, D, DDD')).toBe('173173, 173, 173');
      });
      it("[+] format d, dd is [172172, 172, 172]", function() {
        expect($date.setDate('2014/06/04').format('d, dd')).toBe('4, 04');
      });
      it("[+] format F, f, e, ee, eee is [5, 5, 金, 金曜, 金曜日, 金曜日金]", function() {
        expect($date.setDate('2014/08/01').format('f, F, e, ee, eee, eeee')).toBe('5, 5, 金, 金曜, 金曜日, 金曜日金');
      });
      it("[+] format EEEEE, EEEEEE, EEEE is [水曜日水曜, 水曜日水曜日, 水曜日水]", function() {
        expect($date.setDate('2014/07/30').format('EEEEE, EEEEEE, EEEE')).toBe('水曜日水曜, 水曜日水曜日, 水曜日水');
      });
      it("[+] format HH, KKK, HKK is [06, 077, 607]", function() {
        expect($date.setDate('2014/07/30 06:00:01').format('HH, KKK, HKK')).toBe('06, 077, 607');
      });
      it("[+] format hh, kkk, hkk is [06, 077, 607]", function() {
        expect($date.setDate('2014/07/30 18:00:01').format('hh, kkk, hkk')).toBe('06, 077, 607');
      });
      it("[+] format mmm, sss is [099, 077]", function() {
        expect($date.setDate('2014/07/30 23:09:07').format('mm, m, sss, mmm')).toBe('09, 9, 077, 099');
      });
      it("[+] format SSSS is [08989]", function() {
        expect($date.setTime('1234567089').format('SSS,S,SSSS')).toBe('089,89,08989');
      });
      it("[+] format Zz is [540+0900]", function() {
        expect($date.setTime('1234567089').format('z,Z,zZ')).toBe('540,+0900,540+0900');
      });
      it("[+] format X is [1234567089]", function() {
        expect($date.setTime('1234567089123').format('X')).toBe('1234567089');
      });
      it("[+] $.Date.format yyyy/MM/dd is date", function() {
        var lDate = new Date();
        expect($.Date.format('yyyy/M/d')).toBe(lDate.getFullYear() + '/' + (lDate.getMonth() + 1) + '/' + lDate.getDate());
      });
      it("[+] $.Date.format yyyy/MM/dd is 2014/01/01", function() {
        expect($.Date.format('yyyy/MM/dd', 2014, 0, 1)).toBe('2014/01/01');
      });
    });

    describe('#27 toLocaleString Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/08/01 02:22:35');
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeFormat = tmpLoc;
      });

      it("[+] toLocaleString is function", function() {
        expect($.isFunction($date.toLocaleString)).toBe(true);
      });
      it("[+] toLocaleString 2014/08/01 02:22:35 is 0", function() {
        expect($date.toLocaleString()).toBe('2014年08月01日(金曜) 02:22:35 UTC+0900');
      });
      it("[+] toLocaleString 2014/08/01 02:22:35 default is 2014/8/1 2:22:35", function() {
        $.Date.langs.ja.localeFormat = undefined;
        expect($date.toLocaleString()).toBe(lDate.toLocaleString());
      });
    });

    describe('#28 toLocaleDateString Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/08/01 02:22:35');
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeDateFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeDateFormat = tmpLoc;
      });

      it("[+] toLocaleDateString is function", function() {
        expect($.isFunction($date.toLocaleDateString)).toBe(true);
      });
      it("[+] toLocaleDateString 2014/08/01 02:22:35 is 0", function() {
        expect($date.toLocaleDateString()).toBe('2014年08月01日(金曜)');
      });
      it("[+] toLocaleDateString 2014/08/01 02:22:35 default is 2014/8/1 2:22:35", function() {
        $.Date.langs.ja.localeDateFormat = undefined;
        expect($date.toLocaleDateString()).toBe(lDate.toLocaleDateString());
      });
    });

    describe('#29 toLocaleTimeString Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/08/01 02:22:35');
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeTimeFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeTimeFormat = tmpLoc;
      });

      it("[+] toLocaleTimeString is function", function() {
        expect($.isFunction($date.toLocaleTimeString)).toBe(true);
      });
      it("[+] toLocaleTimeString 2014/08/01 02:22:35 is 0", function() {
        expect($date.toLocaleTimeString()).toBe('02:22:35');
      });
      it("[+] toLocaleTimeString 2014/08/01 02:22:35 default is 2014/8/1 2:22:35", function() {
        $.Date.langs.ja.localeTimeFormat = undefined;
        expect($date.toLocaleTimeString()).toBe(lDate.toLocaleTimeString());
      });
    });

    describe('#30 isHoliday Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/08/01 02:22:35');
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeTimeFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeTimeFormat = tmpLoc;
      });

      it("[+] isHoliday is function", function() {
        expect($.isFunction($date.isHoliday)).toBe(true);
      });
      it("[+] isHoliday 2013/01/01 is true", function() {
        expect($date.setDate('2013/01/01 00:00:01').isHoliday()).toBe(true);
      });
      it("[+] isHoliday 2014/01/02 is false", function() {
        expect($date.setDate('2014/01/02 00:00:01').isHoliday()).toBe(false);
      });
      it("[+] isHoliday 2014/02/11 is true", function() {
        expect($date.setDate('2014/02/11 00:00:01').isHoliday()).toBe(true);
      });
      it("[+] isHoliday 2014/03/20 is false", function() {
        expect($date.setDate('2014/03/20 00:00:01').isHoliday()).toBe(false);
      });
      it("[+] isHoliday 2013/03/20 is true", function() {
        expect($date.setDate('2013/03/20 00:00:01').isHoliday()).toBe(true);
      });
      it("[+] isHoliday 2014/03/22 -1 is true", function() {
        expect($date.setDate('2014/03/22 00:00:01').addDay(-1).isHoliday()).toBe(true);
      });
      it("[+] isHoliday 2014/05/05 is true", function() {
        expect($date.setDate('2014/05/05 06:00:01').isHoliday()).toBe(true);
      });
      it("[+] isHoliday 2014/11/23 is true", function() {
        expect($date.setDate('2014/11/23 23:00:01').isHoliday()).toBe(true);
      });
      it("[+] isHoliday 1980/05/05 is true", function() {
        expect($date.setDate('1980/05/05 23:00:01').isHoliday()).toBe(true);
      });
      it("[+] isHoliday 1912/05/07 is false", function() {
        expect($date.setDate('1912/05/07 23:00:01').isHoliday()).toBe(false);
      });
      it("[+] isHoliday 1914/05/05 is false", function() {
        expect($date.setDate('1914/05/05 23:00:01').isHoliday()).toBe(false);
      });
    });

    describe('#31 roundDays Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/08/01 02:22:35');
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeTimeFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeTimeFormat = tmpLoc;
      });

      it("[+] roundDays is function", function() {
        expect($.isFunction($date.roundDays)).toBe(true);
      });
      it("[+] roundDays 2014/08/01 to 08/01 is 0", function() {
        expect($date.roundDays('2014/08/01')).toBe(0);
      });
      it("[+] roundDays 2014/08/01 to 08/03 is 2", function() {
        expect($date.roundDays('2014/08/03')).toBe(2);
      });
      it("[+] roundDays 2014/08/01 to 07/31 is 1", function() {
        expect($date.roundDays('2014/07/31')).toBe(1);
      });
    });

    describe('#32 roundHolidays Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/08/01 02:22:35');
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeTimeFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeTimeFormat = tmpLoc;
      });

      it("[+] roundHolidays is function", function() {
        expect($.isFunction($date.roundHolidays)).toBe(true);
      });
      it("[+] roundHolidays 2014/08/01 to 08/01 is 0", function() {
        expect($date.roundHolidays('2014/08/01')).toBe(0);
      });
      it("[+] roundHolidays 2014/08/01 to 08/03 is 2", function() {
        expect($date.roundHolidays('2014/08/03')).toBe(2);
      });
      it("[+] roundHolidays 2014/02/10 to 02/15 is 2", function() {
        expect($date.setDate('2014/02/10').roundHolidays('2014/02/15')).toBe(2);
      });
      it("[+] roundHolidays 2014/02/15 to 02/10 is 2", function() {
        expect($date.setDate('2014/02/15').roundHolidays('2014/02/10')).toBe(2);
      });
      it("[+] roundHolidays 2014/08/01 to 2015/08/01 is 0", function() {
        expect($date.roundHolidays('2015/08/01')).toBe(117);
      });
    });

    describe('#34 syncNTP Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance().addDay(-2);
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeTimeFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeTimeFormat = tmpLoc;
      });

      it("[+] syncNTP is function", function() {
        expect($.isFunction($date.syncNTP)).toBe(true);
      });
//FIXME Timeout Error
//      it('[+] syncNTP Today - 2 day to NTP date is not today', function(done) {
//          var $cloneDate = $date.clone();
//          $date.syncNTP().always(function(that, data) {
//            try {
//              if (!!!$.Date.isDate(that)) {
//                throw Error();
//              }
//              expect(that.getDate() +' ' + that.toTimeString()).toNotEqual($cloneDate.getDate() + ' ' + $cloneDate.toTimeString());
//              done();
//            } catch (e) {
//              expect(e).toEqual(Error());
//            }
//          });
//      });
    });


    describe('#35 xxUTCxx Test', function() {

      var lDate = new Date();
      var $date = undefined;
      var tmpLoc = undefined;

      beforeEach(function() {
        $.Date.removeInstance();
        $date = $.Date.getInstance('2014/08/01 22:22:35');
        lDate.setTime($date.getTime());
        tmpLoc = $.Date.langs.ja.localeTimeFormat;
      });
      afterEach(function() {
        $.Date.langs.ja.localeTimeFormat = tmpLoc;
      });

      it("[+] setUTCDay is function", function() {
        expect($.isFunction($date.setUTCDay)).toBe(true);
      });
      it("[+] setUTCDay 2014/08/10 and addDay 1 and getUTCDay is 11", function() {
        expect($date.setUTCDay(10).addDay(1).getUTCDay()).toBe(11);
      });
      it("[+] setUTCDay 2014/08/02 and trancateHours and getUTCDay is 1", function() {
        //expect($date.setUTCDay(2).setTime(Math.floor($date.getTime() / 86400000) * 86400000).toUTCString()).toBe(1);
        expect($date.setUTCDay(2).trancateHours().getUTCDay()).toBe(1);
      });
//      it("[+] roundDays 2014/08/01 to 07/31 is 1", function() {
//        expect($date.roundDays('2014/07/31')).toBe(1);
//      });
    });
  });

  // window.setTimeout(function() {
  // var rndParam = Math.random();
  //    var nextURL = window.location.href.split('?next=', 2)[0] + '?next=' + rndParam;
  //    window.location.href = nextURL;
  //  }, 5000);
}());