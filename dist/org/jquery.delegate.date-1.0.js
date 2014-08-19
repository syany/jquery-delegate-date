/*!
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
(function($, window, undefined) {
  $.extend({
    /**
     * ブラウザからロケール情報を取得します。<br>
     *
     * @type
     */
    getLocale : function() {
      var browserLocaleStr = navigator.browserLanguage || navigator.language || navigator.userLanguage || undefined;
      if (!!!browserLocaleStr) {
        throw Error('It was not possible to get the locale information.');
      }
      return browserLocaleStr.substr(0, 2);
    },
    /**
     *
     */
    isUndefined : function(obj) {
      return jQuery.type(obj) === 'undefined';
    },
    /**
     * スリープします。<br>
     * 同期スリープです
     */
    sleep : function(timeout) {
      timeout = timeout || 0;
      var sourceTime = new Date().getTime();
      var targetTime = sourceTime + timeout;
      while(sourceTime < targetTime) {
        sourceTime = new Date().getTime();
      }
    }
  });
  // 委譲元クラス
  var delegateClass = Date,
  // 以下定数
  _MONTH_BY_YEAR_ = 12,
  _DAYS_BY_WEEK_ = 7,
  _MINUTES_BY_HALF_HOURS_ = 12,
  _ONE_DAY_ = 86400000,
  _ONE_HOURS_ = 3600000,
  _ONE_MINUTES_ = 600000,
  _ONE_SECONDS_ = 1000,
  _$DATE_ = [],
  _HOLIDAYS_ = {},
  _HOLIDAYS_YEAR_ = -1;

  var
  /*
   *
   */
  formatTokenFunctions_ = {
    a : function() {
      return this.getAmPm();
    },
    G : function() {
      return this.getEra();
    },
    y : function() {
      return this.getYear();
    },
    yy : function() {
      return leftZeroFill_(this.getFullYear() % 100, 2);
    },
    yyyy : function() {
      return leftZeroFill_(this.getFullYear() % 10000, 4);
    },
    yyyyy : function() {
      return leftZeroFill_(this.getFullYear() % 100000, 5);
    },
    M : function() {
      return this.getMonth('min');
    },
    MM : function() {
      return leftZeroFill_(this.getMonth('min') % 100, 2);
    },
    MMM : function() {
      return this.getMonth('abbr');
    },
    MMMM : function() {
      return this.getMonth('normal');
    },
    w : function() {
      return this.getWeekOfMonth();
    },
    W : function() {
      return this.getWeekOfYear();
    },
    D : function() {
      return this.getDayOfYear();
    },
    DDD : function() {
      return leftZeroFill_(this.getDayOfYear() % 1000, 3);
    },
    d : function() {
      return this.getDay();
    },
    dd : function() {
      return leftZeroFill_(this.getDay() % 100, 2);
    },
    F : function() {
      return this.getWDay();
    },
    f : function() {
      return this.getWDay();
    },
    e : function() {
      return this.getWDay('min');

    },
    ee : function() {
      return this.getWDay('abbr');

    },
    eee : function() {
      return this.getWDay('normal');
    },
    E : function() {
      return this.getWDay('min');

    },
    EE : function() {
      return this.getWDay('abbr');

    },
    EEE : function() {
      return this.getWDay('normal');
    },
    H : function() {
      return this.getHours();
    },
    HH : function() {
      return leftZeroFill_(this.getHours() % 100, 2);
    },
    h : function() {
      return this.getHours() % _MINUTES_BY_HALF_HOURS_ || _MINUTES_BY_HALF_HOURS_;
    },
    hh : function() {
      return leftZeroFill_((this.getHours() % _MINUTES_BY_HALF_HOURS_ || _MINUTES_BY_HALF_HOURS_) % 100, 2);
    },
    K : function() {
      return this.getHours() + 1;
    },
    KK : function() {
      return leftZeroFill_((this.getHours() + 1) % 100, 2);
    },
    k : function() {
      return (this.getHours() % _MINUTES_BY_HALF_HOURS_ || _MINUTES_BY_HALF_HOURS_) + 1;
    },
    kk : function() {
      return leftZeroFill_(((this.getHours() % _MINUTES_BY_HALF_HOURS_ || _MINUTES_BY_HALF_HOURS_) + 1) % 100, 2);
    },
    m : function() {
      return this.getMinutes();
    },
    mm : function() {
      return leftZeroFill_(this.getMinutes() % 100, 2);
    },
    s : function() {
      return this.getSeconds();
    },
    ss : function() {
      return leftZeroFill_(this.getSeconds() % 100, 2);
    },
    S : function() {
      return this.getMilliseconds();
    },
    SSS : function() {
      return leftZeroFill_(this.getMilliseconds() % 1000, 3);
    },
    X : function() {
      return Math.floor(this.getTime() / _ONE_SECONDS_);
    },
    Z : function() {
      return this.toTimezoneOffsetString();
    },
    z : function() {
      return this.getTimezoneOffset();
    }
  },
  /*
   *
   */
  getTmp$Date_ = function(n) {
    if ($.isUndefined(n)){
      n = 0;
    }
    if ($.isUndefined(_$DATE_[n])){
      for (var i = _$DATE_.length; i <= n; i++) {
        _$DATE_[i] = $.Date.newInstance($.Date);
      }
    } else if (!!!_$DATE_[n]._DELEGATE_OBJ_ || isNaN(_$DATE_[n]._DELEGATE_OBJ_)) {
      _$DATE_[n] = $.Date.newInstance($.Date);
    }
    return _$DATE_[n];
  },
  /*
   * 自身の年情報から、各月末情報をリスト化して保持する。<br>
   * 閏年の場合、this.lastDayLis[1] = 29となる。
   */
  setLastDayList_ = function() {
    if ($.Date.isLeapYear(this.getFullYear())) {
      this.lastDayList = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    } else {
      this.lastDayList = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    }
  },
  /*
   *
   */
  getLocaleInfo_ = function() {
    return (!!$.Date.langs[this.getLocale()]) ? $.Date.langs[this.getLocale()] : $.Date.langs[this.defaultLocale];
  },
  /*
   *
   */
  leftZeroFill_ = function(source, index) {
    var zeros = '00000';
    var target = zeros + source;
    // 対象の長さ分
    while (target.length <= index) {
      target = zeros + target;
    }
    //
    return (target).slice(-1 * index);
  },
  /*
   *
   */
  toLocaleString_ = function(formatLabel, dMethod) {
    var localeLabels = getLocaleInfo_.apply(this);
    if (!!localeLabels[formatLabel]) {
      // ユーザーロケールにあったフォーマットで出力させる
      return this.format(localeLabels[formatLabel]);
    } else {
      // デフォルトがない場合、dMethodに合わえる
      return this.delegateMethod(dMethod);
    }
  },
  /*
   * 休日キャッシュオブジェクト作成。<br>
   * １年分の休日情報をキャッシュする。
   */
  makeHolidays_ = function() {
    var thisYear = this.getFullYear();
    // 同年であれば既に作成済み
    if (thisYear === _HOLIDAYS_YEAR_) {
      return;
    }
    var tmpHolidays = {};
    var localeLabels = this.getLocaleLabel('holidays', undefined, true);

    // ロケールオブジェクト分休日情報を作成します。
    var targetDate;
    for (var key in localeLabels) {
      if ($.isFunction(localeLabels[key])) {
        //
        targetDate = localeLabels[key].apply(this, arguments);
        tmpHolidays[targetDate.format('yyyy/MM/dd 00:00:00')] = key;
      } else {

        targetDate = $.Date.newInstance($.Date, [localeLabels[key]]);
        if (isNaN(targetDate._DELEGATE_OBJ_)) {
          continue;
        }

        tmpHolidays[targetDate.setYear(thisYear).format('yyyy/MM/dd 00:00:00')] = key;
      }
    }
    // 最後にキャシュへ登録
    _HOLIDAYS_ = tmpHolidays;
    _HOLIDAYS_YEAR_ = thisYear;
  };
  /**
   * @class 日付型委譲クラス
   *
   * <h2 id="Summary" name="Summary">概要</h2>
   * <p>
   * 日付や時刻を扱うことが可能な、JavaScript の <code>Date</code> インスタンスを生成します。
   * </p>
   * <h2 id="Syntax" name="Syntax">構文</h2>
   *
   * @constructor
   * @extends $.Delegate
   * @extends $
   *
   * <pre class="syntaxbox language-html" data-prism-prevent-line-number="1">
   *     new Date()
   *     new Date(value)
   *     new Date(dateString)
   *     new Date(year, month, day [, hour, minute, second, millisecond])
   * </pre>
   *
   * @param {Number}
   *        value 1 January 1970 00:00:00 UTC (Unix Epoch).からの<span class="short_text" id="result_box" lang="ja"><span>ミリ秒数を</span><span>表す整数値です。</span></span>
   * @param {String}
   *        dateString 日付を表す文字列値です。文字列は <a href="https://developer.mozilla.org/ja/JavaScript/Reference/Global_Objects/Date/parse"
   *        title="en/JavaScript/Reference/Global_Objects/Date/parse">parse</a> メソッドによる認識可能な形式でなければなりません (<a class="external"
   *        href="http://tools.ietf.org/html/rfc2822#page-14" title="http://tools.ietf.org/html/rfc2822#page-14">IETF-compliant RFC 2822 timestamps</a>).</dd>
   * @param {Number}
   *        year
   * @property {String} defaultLocale
   * @desc 本クラスはDete型の委譲クラスです。本クラス内のメソッドのほか、Dateクラス内の以下のクラス関数、メンバ関数およびプロパティを利用することができます。
   *       <dl>
   *       <dt>getFullYear</dt>
   *       <dd></dd>
   *       <dt>getHours</dt>
   *       <dd></dd>
   *       <dt>getMilliseconds</dt>
   *       <dd></dd>
   *       <dt>getMinutes</dt>
   *       <dd></dd>
   *       <dt>getSeconds</dt>
   *       <dd></dd>
   *       <dt>getTime</dt>
   *       <dd></dd>
   *       <dt>getUTCFullYear</dt>
   *       <dd></dd>
   *       <dt>getUTCHours</dt>
   *       <dd></dd>
   *       <dt>getUTCMilliseconds</dt>
   *       <dd></dd>
   *       <dt>getUTCMinutes</dt>
   *       <dd></dd>
   *       <dt>getUTCSeconds</dt>
   *       <dd></dd>
   *       <dt>getYear</dt>
   *       <dd></dd>
   *       <dt>lastDayList: Array[12]
   *       <dt>locale: "ja"
   *       <dt>name: "$.Date"
   *       <dt>setHours</dt>
   *       <dd></dd>
   *       <dt>setMilliseconds</dt>
   *       <dd></dd>
   *       <dt>setMinutes</dt>
   *       <dd></dd>
   *       <dt>setSeconds</dt>
   *       <dd></dd>
   *       <dt>setTime</dt>
   *       <dd></dd>
   *       <dt>setUTCHours</dt>
   *       <dd></dd>
   *       <dt>setUTCMilliseconds</dt>
   *       <dd></dd>
   *       <dt>setUTCMinutes</dt>
   *       <dd></dd>
   *       <dt>setUTCSeconds</dt>
   *       <dd></dd>
   *       <dt>toDateString</dt>
   *       <dd></dd>
   *       <dt>toGMTString</dt>
   *       <dd></dd>
   *       <dt>toISOString</dt>
   *       <dd></dd>
   *       <dt>toJSON</dt>
   *       <dd></dd>
   *       <dt>toTimeString</dt>
   *       <dd></dd>
   *       <dt>toUTCString</dt>
   *       <dd></dd>
   *       </dl>
   */
  $.Date = $.Delegate.inheritInstance(delegateClass, function() {
    // Date型をnewできなかった場合と同様の情報を返す。
    if (isNaN(this._DELEGATE_OBJ_)) {
      return this._DELEGATE_OBJ_;
    }
    // 月末情報の取得
    setLastDayList_.apply(this, arguments);
    // ロケール情報をブラウザ情報から取得する
    this.locale = $.getLocale();
    this.name = '$.Date';
  });

  /*
   * 上書きしたいメソッド、その他追加メソッド
   */
  $.extend($.Date, {
    /** @lends $.Date */
    /** @type */
    langs : {
      // デフォルト言語設定は英語
      en : {
        // 月で使用する
        months : {
          normal : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
          abbr : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
          min : '1_2_3_4_5_6_7_8_9_10_11_12'.split('_')
        },
        // 曜日で使用する
        weekdays : {
          normal : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
          abbr : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
          min : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_')
        },
        // 時間で使用する
        time : {
          am : 'AM',
          pm : 'PM'
        },
        localeFormat : 'ee MMM dd yyyy HH:mm:ss UTCZ',
        localeDateFormat : 'eee, MMMM dd, yyyy',
        localeTimeFormat : 'HH:mm:ss',
        // 元号（日本は和暦）
        era : {
          // era Name: [start Full Year(yyyy)]
          'A.D.' : [ 0 ]
        },
        /*
         * 休日情報を文字列、または関数で設定しておく 詳しくは-ja.js参照
         */
        holidays : {
          'new Year days' : '01/01'
        },
        // from NTP app
        ntpJSONP : 'http://json-time.appspot.com/time.json?tz=UTC&callback=?'
      }
    },
    /**
     * 現在値もしくは第2引数以降で指定した日付のフォーマットを第一引数の文字列形式で出力
     *
     * @memberOf $.Date
     * @param fmt 出力形式
     * @returns 出力形式に沿った文字列
     */
    format : function(fmt) {
      // 引数がない場合はErrorをスロー
      if (arguments.length === 0) {
        throw Error('this method needs arguments.');
      }
      var tmpArgs = [].slice.call(arguments, 1);
      // 複数の引数パターンに対応するために、new, bindを使用する
      //var tmpDate = getTmp$Date_(0).newDelegateInstance.apply(getTmp$Date_(0), tmpArgs);
      var tmpDate = $.Date.newInstance($.Date, tmpArgs);
      return tmpDate.format(fmt);
    },
    /**
     * 閏年判定。<br>
     * 対象年が閏年かどうかを判定します。
     *
     * @memberOf $.Date
     * @param {Object}
     *        year
     * @return 閏年です(true)/閏年でない(false)
     */
    isLeapYear : function(year) {
      // 引数がない場合はErrorをスロー
      if (arguments.length === 0) {
        throw Error("this method needs arguments.");
      }
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
    /**
     * 日付判定<br>
     * 対象引数が日付かどうかを判定する。<br>
     * new Dateで使用可能な引数パターンをすべて使用できます。<br>
     *
     * @memberOf $.Date
     * @param {Object}
     *        arg01 (year)
     * @param {Object}
     *        month (option)
     * @param {Object}
     *        day (option)
     * @param {Object}
     *        ...
     * @return 日付型です(true)/日付型でない(false)
     * @throws {Error}
     *         引数がない場合。
     */
    isDate : function() {
      // 引数がない場合はErrorをスロー
      if (arguments.length === 0) {
        throw Error('this method needs arguments.');
      }
      // 複数の引数パターンに対応するために、new, bindを使用する
      var tmpDate = getTmp$Date_(0).newDelegateInstance.apply(getTmp$Date_(0), arguments);
      // 取得確認をisNaNで行うことで日付型かどうかを判定する
      return !!!isNaN(tmpDate);
    },
    /**
     * 対象文字列から、対象の曜日に紐づく数字を返却します。
     * @param {String} 曜日文字列
     * @param {String} 対象ラベル（normal | abbr | min）
     * @return 紐づく数値（日曜=0～土曜=6）
     * @throws Error 第一引数がない場合
     */
    toWDayNumber : function(wdayString, kind) {
      // 第一引数がなければエラーをスロー
      if (!!$.isUndefined(wdayString)) {
        throw Error('argument Error.');
      }
      kind = kind || 'abbr';
      var $date = getTmp$Date_();
      var labels = $date.getLocaleLabel.apply($date, [ 'weekdays', kind, true ]);

      for (var i = 0,label; (label = labels[i]); i++) {
        if (wdayString === label) {
          return i;
        }
      }
      return undefined;
    }
  });

  /*
   * 以降クラスプロパティ ======================================================================
   */
  $.extend($.Date.prototype, {
    /** @lends $.Date# */
    defaultLocale : "en",
    /**
     * 現在の年を加減します。
     * @param {Numeric} 加減値
     * @return this
     * @throws {Error} 第一引数が数値出ない場合
     */
    addYear : function(offset) {
      // 第一引数がなければエラーをスロー
      if (!!!$.isNumeric(arguments[0])) {
        throw Error('argument Error.');
      }
      return this.setFullYear(this.getFullYear() + offset);
    },
    /**
     * 現在の月を加減します。
     * @param {Numeric} 加減値
     * @return this
     * @throws {Error} 第一引数が数値出ない場合
     */
    addMonth : function(offset) {
      // 第一引数がなければエラーをスロー
      if (!!!$.isNumeric(arguments[0])) {
        throw Error('argument Error.');
      }
      var offsetYear;
      var offsetMonth;
      var calcMonth;
      // 加算の場合（+）
      if (offset >= 0) {
        offsetYear = Math.floor(offset / _MONTH_BY_YEAR_);
        offsetMonth = Math.floor(offset % _MONTH_BY_YEAR_);
        calcMonth = this.getMonth() + offsetMonth;
        if (calcMonth > 11) {
          offsetYear += 1;
          calcMonth = calcMonth - _MONTH_BY_YEAR_;
        }
      } else {
        // 減算の場合（-）
        offsetYear = Math.ceil(offset / _MONTH_BY_YEAR_);
        offsetMonth = Math.ceil(offset % _MONTH_BY_YEAR_);
        calcMonth = this.getMonth() + offsetMonth;
        if (calcMonth < 0) {
          offsetYear -= 1;
          calcMonth = _MONTH_BY_YEAR_ + calcMonth;
        }
      }
      // 月末判定（同月に31日があるかなどを確認する）
      var targetDate = getTmp$Date_(0).setTime(this.getTime());
      targetDate.setTime(this.getTime());
      targetDate.setMonth(calcMonth).setFullYear(targetDate.getFullYear() + offsetYear);
      if (targetDate.getDay() !== this.getDay()) {
        // 月末対応（指定月に月末がない場合の対応）
        this.setDay(1);
        return this.setMonth(calcMonth).setFullYear(this.getFullYear() + offsetYear).setMonthEnd();
      } else {
        // 月末が存在する場合、そのまま設定
        return this.setMonth(calcMonth).setFullYear(this.getFullYear() + offsetYear);
      }
    },
    /**
     * 現在の日を加減します。
     * @param {Numeric} 加減値
     * @return this
     * @throws {Error} 第一引数が数値出ない場合
     */
    addDay : function(offset) {
      offset = offset || 0;
      var msTime = this.getTime();
      msTime += (_ONE_DAY_ * offset);
      return this.setTime(msTime);
    },
    /**
     * 現在の時を加減します。
     * @param {Numeric} 加減値
     * @return this
     * @throws {Error} 第一引数が数値出ない場合
     */
    addHours : function(offset) {
      offset = offset || 0;
      var msTime = this.getTime();
      msTime += (_ONE_HOURS_ * offset);
      return this.setTime(msTime);
    },
    /**
     * 現在の分を加減します。
     * @param {Numeric} 加減値
     * @return this
     * @throws {Error} 第一引数が数値出ない場合
     */
    addMinutes : function(offset) {
      offset = offset || 0;
      var msTime = this.getTime();
      msTime += (_ONE_MINUTES_ * offset);
      return this.setTime(msTime);
    },
    /**
     * 現在の秒を加減します。
     * @param {Numeric} 加減値
     * @return this
     * @throws {Error} 第一引数が数値出ない場合
     */
    addSeconds : function(offset) {
      offset = offset || 0;
      var msTime = this.getTime();
      msTime += (_ONE_SECONDS_ * offset);
      return this.setTime(msTime);
    },
    /**
     * 現在のミリ秒を加減します。
     * @param {Numeric} 加減値
     * @return this
     * @throws {Error} 第一引数が数値出ない場合
     */
    addMilliseconds : function(offset) {
      offset = offset || 0;
      var msTime = this.getTime();
      msTime += offset;
      return this.setTime(msTime);
    },
    /**
     * 現在の日付情報を指定したフォーマットで出力する。<br>
     * パターンは、Java言語。SimpleDateFormatパターンに近い。
     *
     * @description <table> <tbody>
     *              <tr>
     *              <td>文字 </td>
     *              <td>説明 </td>
     *              <td>例 </td>
     *              </tr>
     *              <tr>
     *              <td>G</td>
     *              <td>紀元</td>
     *              <td>AD</td>
     *              </tr>
     *              <tr>
     *              <td>y</td>
     *              <td>年</td>
     *              <td> 1996, 96</td>
     *              </tr>
     *              <tr>
     *              <td>M</td>
     *              <td>月</td>
     *              <td>July, Jul, 07</td>
     *              </tr>
     *              <tr>
     *              <td>w</td>
     *              <td>年における週</td>
     *              <td> 27</td>
     *              </tr>
     *              <tr>
     *              <td>W</td>
     *              <td>月における週</td>
     *              <td>2</td>
     *              </tr>
     *              <tr>
     *              <td>D</td>
     *              <td>年における日</td>
     *              <td>189</td>
     *              </tr>
     *              <tr>
     *              <td>d</td>
     *              <td>月における日</td>
     *              <td> 10</td>
     *              </tr>
     *              <tr>
     *              <td>F</td>
     *              <td>月における曜日</td>
     *              <td>2</td>
     *              </tr>
     *              <tr>
     *              <td>E</td>
     *              <td>曜日</td>
     *              <td> Tuesday, Tue</td>
     *              </tr>
     *              <tr>
     *              <td>a</td>
     *              <td>午前/午後</td>
     *              <td>PM</td>
     *              </tr>
     *              <tr>
     *              <td>H</td>
     *              <td>一日における時(0～23)</td>
     *              <td>0</td>
     *              </tr>
     *              <tr>
     *              <td>k</td>
     *              <td>一日における時(1～24)</td>
     *              <td> 24</td>
     *              </tr>
     *              <tr>
     *              <td>K</td>
     *              <td>午前/午後の時(0～11)</td>
     *              <td>0</td>
     *              </tr>
     *              <tr>
     *              <td>h</td>
     *              <td>午前/午後の時(1～12)</td>
     *              <td> 12</td>
     *              </tr>
     *              <tr>
     *              <td>m</td>
     *              <td>分</td>
     *              <td> 30</td>
     *              </tr>
     *              <tr>
     *              <td>s</td>
     *              <td>秒</td>
     *              <td>55</td>
     *              </tr>
     *              <tr>
     *              <td>S</td>
     *              <td>ミリ秒</td>
     *              <td>978</td>
     *              </tr>
     *              <tr>
     *              <td>X</td>
     *              <td>タイムスタンプ</td>
     *              <td>1200023456</td>
     *              </tr>
     *              <tr>
     *              <td>z</td>
     *              <td>タイムゾーン</td>
     *              <td>Pacific Standard Time, PST, GMT-08:00</td>
     *              </tr>
     *              <tr>
     *              <td>Z</td>
     *              <td>タイムゾーン</td>
     *              <td>-0800</td>
     *              </tr>
     *              </tbody> </table>
     */
    format : function(fmt) {
      var result = fmt.replace(/(a|G|yyyyy?|yy?|MM?M?M?|w|W|DDD|D|dd?|F|f|ee?e?|EE?E?|HH?|hh?|KK?|kk?|mm?|ss?|SSS|S|X|Z|z)/g, (function(str, p1) {
        return formatTokenFunctions_[p1].apply(this, arguments);
      }).bind(this));
      return result;
    },
    /**
     * 閏年を判定します。
     *
     * @return 閏年です(true)/閏年でない(false)
     */
    isLeapYear : function() {
      return $.Date.isLeapYear(this.getFullYear());
    },
     /**
       * 休日判定します。
       *
       */
    isHoliday : function() {
      // 曜日が土日ならば
      var thisWDay = this.getWDay();
      if (thisWDay === 0 || thisWDay === 6) {
        return true;
      }
      // 休日オブジェクトの作成
      makeHolidays_.apply(this);

      return (!!_HOLIDAYS_[this.format('yyyy/MM/dd 00:00:00')]);
    },
    /**
     * 対象$.Dateオブジェクトクローンを作成する。
     */
    clone : function() {
      return $.Date.newInstance($.Date, this.getTime());
    },
    /**
     * 日付（年月日まで）を比較します。
     *
     * @param {Object}
     *        targetData 比較対象
     * @return 一致(0)/引数が未来(>0)/引数が過去(-1)
     */
    compareDate : function() {
      var $tmpDate = $.Date.newInstance($.Date, [].slice.call(arguments));
      $tmpDate.trancateHours();
      var $thisDate = this.clone();
      $thisDate.trancateHours();
      // 日付まで
      return ($tmpDate.getTime() - $thisDate.getTime()) / _ONE_DAY_;
    },
    /**
     * 日付（年月日時分秒.ミリ秒）を比較します
     *
     * @param {Object}
     *        targetData 比較対象
     * @return 一致(0)/引数が未来(>0)/引数が過去(-1)
     */
    compareTime : function() {
      var tmpDate = this.newDelegateInstance.apply(this, [].slice.call(arguments));
      return tmpDate.getTime() - this._DELEGATE_OBJ_.getTime();
    },
    /**
     * 現在のロケール情報を取得する。
     * @return ロケール文字列
     */
    getLocale : function() {
      return this.locale;
    },
    /**
     * 対象のロケールラベル情報を取得
     * @return ロケールラベル配列
     */
    getLocaleLabel : function(key, subKey, defaultFlag) {
      var localeLabels = getLocaleInfo_.apply(this);
      var result = localeLabels[key] || undefined;
      if (!!result) {
        // サブキー有無判定
        if (!!subKey) {
          result = result[subKey] || undefined;
        }
      }
      // デフォルト返却フラグがある場合で値が取れない場合
      if (!!!defaultFlag && !!!result) {
        localeLabels = $.Date.langs[this.defaultLocale];
        // サブキー有無判定
        if (!!subKey) {
          result = localeLabels[key][subKey] || undefined;
        } else {
          result = localeLabels[key] || undefined;
        }
      }
      return result;
    },
    /**
     * 午前午後を取得します
     */
    getAmPm : function() {
      var timesArr = this.getLocaleLabel('time', undefined, true);
      return (this.delegateMethod('getHours') < _MINUTES_BY_HALF_HOURS_) ? timesArr.am : timesArr.pm;
    },
    /**
     * 暦を出力する。<br>
     * ロケールにおいて、対象となる暦を設定する。
     */
    getEra : function() {
      var localeEras = this.getLocaleLabel('era', undefined, true);
      var thisYear = this.delegateMethod('getFullYear');
      var resultStr = "";
      for ( var eraKey in localeEras) {
        if (localeEras[eraKey].length === 1) {
          if (thisYear < localeEras[eraKey][0]) {
            resultStr = eraKey + (thisYear - localeEras[eraKey][0]);
            break;
          }
        } else {
          if (thisYear >= localeEras[eraKey][0] && thisYear < localeEras[eraKey][1]) {
            resultStr = eraKey + (thisYear - localeEras[eraKey][0] + 1);
            break;
          }
        }
      }
      return resultStr;
    },
    /**
     * 対象年の何日目かを出力します。
     */
    getDayOfYear : function() {
      var targetDateObj = getTmp$Date_(0).setTime(this.getTime()).setDay(1).setMonth(0);
      return Math.ceil((this.getTime() - targetDateObj.getTime()) / _ONE_DAY_);
    },
    /**
     * 対象月の週数を出力します。
     */
    getWeekOfMonth : function() {
      var targetDateObj = getTmp$Date_(0).setTime(this.getTime()).setDay(1).trancateHours();
      var offset = targetDateObj.getWDay() - 1;
      var weeks = Math.floor((this.getDay() + offset) / _DAYS_BY_WEEK_);
      return (targetDateObj.getWDay() === 0) ? weeks + 1 : weeks;
    },
    /**
     * 対象年の週数を出力します。
     */
    getWeekOfYear : function() {
      var targetDateObj = getTmp$Date_(0).setDay(1).setMonth(0).trancateHours();
      var offset = targetDateObj.getWDay() - 1;
      var weeks = Math.floor((this.getDayOfYear() + offset) / _DAYS_BY_WEEK_);
      return (targetDateObj.getWDay() === 0) ? weeks + 1 : weeks;
    },
    /**
     * 日付を表示する。<br>
     * Date型のtoDateStringメソッド
     * @return 日付文字列（EEE MMM dd yyyy）
     */
    getDate : function() {
      return this.delegateMethod('toDateString', arguments);
    },
    /**
     * 対象ロケールの文字列で月を表示する。
     * @param {String} min|abbr|normal
     * @return 月文字列（MM|MMM|MMMM）
     */
    getMonthString : function() {
      var viewPertten = arguments[0] || 'abbr';
      var monthViewArr = this.getLocaleLabel('months', viewPertten);
      return monthViewArr[this.getMonth()];
    },
    /**
     * 対象ロケールの文字列もしくは数字で月を表示する。
     * @param {String} min|abbr|normal
     * @return 月文字列（M|MM|MMM|MMMM）or月数字（M|MM）
     */
    getMonth : function() {
      if (!!arguments[0]) {
        return this.getMonthString(arguments[0]);
      } else {
        return this.delegateMethod('getMonth', arguments);
      }
    },
    /**
     * 日を表示する。<br>
     * Date型のgetDate委譲メソッド
     * @return 日文字列
     */
    getDay : function() {
      return this.delegateMethod('getDate', arguments);
    },
    /**
     * 対象ロケールで曜日を出力する
     * @param {String} min|abbr|normal
     * @return 曜日文字列（EE|EEE|EEEE）
     */
    getWDayString : function() {
      var viewPertten = arguments[0] || 'abbr';
      var weekdaysViewArr = this.getLocaleLabel('weekdays', viewPertten);
      return weekdaysViewArr[this.getWDay()];
    },
    /**
     * 曜日を文字列もしくは数字で出力する。<br>
     * Date型のgetDay委譲メソッド
     * @param {String} min|abbr|normal
     * @return 曜日文字列（E|EE|EEE|EEEE）or曜日数字（e|ee）
     */
    getWDay : function() {
      if (!!arguments[0]) {
        return this.getWDayString(arguments[0]);
      } else {
        return this.delegateMethod('getDay', arguments);
      }
    },
    /**
     * タイムゾーンを出力する。(分単位)<br>
     * Date型のgetTimezoneOffsetだが、符号を逆にして表示する。
     */
    getTimezoneOffset : function() {
      return this.delegateMethod("getTimezoneOffset", arguments) * -1;
    },
    /**
     * タイムゾーンを出力する。(ミリ秒単位)<br>
     * Date型のgetTimezoneOffsetだが、符号を逆にして表示する。
     */
    getTimezoneOffsetTime : function() {
      return this.getTimezoneOffset() * _ONE_MINUTES_;
    },
    /**
     * ロケール情報を再設定します。<br>
     * @param {String} loc 2文字のロケール情報
     * @return this
     */
    setLocale : function(loc) {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }

      this.locale = loc;
      return this;
    },
    /**
     * 日付を設定します<br>
     * パースできる文字列を指定します<br>
     * {@link setTime}の委譲メソッド
     *
     * @param {String}
     *        パースできる日付文字列
     * @return this
     */
    setDate : function() {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      // setTimeを実行
      this.delegateMethod('setTime', [ Date.parse(arguments[0]) ]);
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 年設定。<br>
     * 引数の年を設定します。<br>
     *
     * @param {Number}
     *        year
     * @return this
     */
    setYear : function(year) {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      // 2桁用。引数 < 1000の場合+2000年
      if ((0 + year) < 1000) {
        year = year + 2000;
      }
      // DateのsetYearを実行
      this.delegateMethod('setYear', [ year ]);
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 完全な年を設定します。<br>
     *
     * @param {Number}
     *        fullYear 4桁の年
     * @return this
     */
    setFullYear : function(year) {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      this.setYear.apply(this, [ year ]);
      return this;
    },
    /**
     * 月を設定します.<br>
     * ラベルの指定があれば、設定されている月の文字列で設定できます。<br>
     * ラベルは{@link $.Date.langs[this.defaultLocale][month][ラベル]}より取得
     *
     * @param {Object}
     *        month 月
     * @param {String}
     *        label[option] (min/abbr/normal)のいずれか
     * @return this
     */
    setMonth : function() {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      // ラベルの指定があれば、対象ラベルに紐づくインデックス値を月として設定する
      if (!!arguments[1]) {
        var viewPertten = arguments[1];
        var monthViewArr = this.getLocaleLabel('months', viewPertten);
        for (var index = 0, labels = monthViewArr[index]; (labels = monthViewArr[index]); index++) {
          // 対象ラベルと一致した場合
          if (labels === arguments[0] + '') {
            this.delegateMethod('setMonth', [ index ]);
            break;
          }
        }
        // 通常の動き
      } else {
        this.delegateMethod('setMonth', arguments);
      }
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 日を設定します。<br>
     * {@link setDate}の委譲メソッド
     *
     * @param {Number}
     *        日
     * @return this
     */
    setDay : function() {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      this.delegateMethod('setDate', arguments);
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 現在の年月から月末を設定する。<br>
     * @return this
     */
    setMonthEnd : function() {
      if (this.getMonth() === 11) {
        return this.setYear(this.getFullYear() + 1).setMonth(0).setDay(0);
      } else {
        return this.setMonth(this.getMonth() + 1).setDay(0);
      }
    },
    /**
     * 第X週N曜日を設定する
     *
     * @param {Number}
     *        number 週数(対象月の)を設定する
     * @param {Number}
     *        wday 曜日(0～6で0=日曜日)を設定する
     * @param {Boolean}
     *        notNextMonth 先月・翌月不可フラグ。trueであれば、先月・翌月に達した場合、初週・最終週に戻る。
     */
    setNumberWeekday : function(number, wday, notNextMonth) {
      if (arguments.length < 2) {
        throw Error('argument Error.');
      }
      if (!!notNextMonth) {
        if (number > 5) {
          number = 5;
        } else if (number < 0) {
          number = 0;
        }
      }
      var privateDateObj1 = getTmp$Date_(0).setTime(this.getTime());
      var privateDateObj2 = getTmp$Date_(1).setTime(this.getTime());

      var thisFirstWDay = privateDateObj1.setDay(1).getWDay();
      // 月初の曜日との差分を求める
      // 例えば金曜日と木曜日であれば差は１、火曜日と木曜日であれば差は-2となる。
      // 求めたい曜日よりも後に月初がある場合は、先月の曜日となるため、7日を加算する
      var targetWDay = wday - thisFirstWDay + 1;
      if (targetWDay <= 0) {
        targetWDay += _DAYS_BY_WEEK_;
      }
      privateDateObj2.setDay(targetWDay);
      var msTime = privateDateObj2.getTime();
      msTime += (_ONE_DAY_ * _DAYS_BY_WEEK_ * number);
      privateDateObj1.setTime(msTime);
      if (!!notNextMonth && (privateDateObj2.getMonth() !== privateDateObj1.getMonth() || privateDateObj2.getFullYear() !== privateDateObj1.getFullYear())) {
        return this.setNumberWeekday(number - 1, wday, notNextMonth);
      } else {
        this.setTime(msTime);
        return this;
      }
    },
    /**
     * 対象月の最終N曜日を設定する
     */
    setLastWeekday : function(wday) {
      return this.setNumberWeekday(5, wday, true);
    },
    /**
     * 現在時刻を再設定する。
     * @return this
     */
    setNow : function() {
      this.delegateMethod('setTime', [ $.Date.now() ]);
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 現在設定されている日付から、引数の日付までの日数を出力する。
     */
    roundDays : function() {
      if (!!!$.Date.isDate.apply(this, arguments)) {
        // 引数が日付でなければエラー
        return -1;
      }
      // 日付比較より、差分を返却
      var roundDays = this.compareDate.apply(this, arguments);
      if (roundDays < 0) {
        // 負の場合 0を含ませる
        return Math.abs(roundDays);
      }
      return roundDays;
    },
    /**
     * 対象範囲の休日数を求める。
     */
    roundHolidays : function() {
      if (!!!$.Date.isDate.apply(this, arguments)) {
        return -1;
      }
      var roundDays = this.compareDate.apply(this, arguments);
      var $sourceDate = $.Date.newInstance($.Date, [].slice.call(arguments));
      var $thisDate = this.clone();
      var holidayCount = 0;
      var $targetDate = void 0;
      if (roundDays <= 0) {
        roundDays = Math.abs(roundDays);
        $targetDate = $sourceDate;
      } else if (roundDays > 0) {
        $targetDate = $thisDate;
      }
      // 繰り返し、休日判定する。
      for (var index = 0; index <= roundDays; index++, $targetDate.addDay(1)) {
        if (!!$targetDate.isHoliday()) {
          holidayCount++;
        }
      }
      return holidayCount;
    },
    /**
     * 対象範囲の平日数を返却します。(rounddays - roundHolidays)
     */
    roundWorkdays : function() {
      if (!!!$.Date.isDate.apply(this, arguments)) {
        return -1;
      }
      var roundDays = this.compareDate.apply(this, arguments);
      var $sourceDate = $.Date.newInstance($.Date, [].slice.call(arguments));
      var $thisDate = this.clone();
      var workdayCount = 0;
      var $targetDate = void 0;
      if (roundDays <= 0) {
        // 負と０の場合０番目を含める
        roundDays = Math.abs(roundDays) + 1;
        $targetDate = $sourceDate;
      } else if (roundDays > 0) {
        $targetDate = $thisDate;
      }
      // 繰り返し、休日判定する。
      for (var index = 0; index < roundDays; index++, $targetDate.addDay(1)) {
        if (!!!$targetDate.isHoliday()) {
          workdayCount++;
        }
      }
      return workdayCount;
    },
    /**
     * ローカル時刻をNTPと同期して設定する。<br>
     * json-time App使用。内部Ajaxは同期通信する。<br>
     * jQuery.Deferred使用(done/fail/always)
     */
    syncNTP : function() {
      var $deferred = $.Deferred();
      $.ajaxSetup({
        // 3s
        timeout : 3 * _ONE_SECONDS_
      });
      var url = this.getLocaleLabel('ntpJSONP', undefined, true);
      //var url = 'http://json-time.appspot.com/time.json?tz=' + localeZone + '&callback=?';
      var that = this;

      $.getJSON(url)
      .done(function(data){
        that.setDate(data.datetime);
        $deferred.resolve(that, data);
      }).
      fail(function() {
        console.log("failed sync NTP[syncNTP].");
        that.setDate(new Date().getTime());
        $deferred.reject(that);
      });
      // Deferredを利用する
      return $deferred.promise();
    },
    toLocaleString : function() {
      return toLocaleString_.apply(this, ['localeFormat', 'toLocaleString']);
    },
    toLocaleDateString : function() {
      return toLocaleString_.apply(this, ['localeDateFormat', 'toLocaleDateString']);
    },
    toLocaleTimeString : function() {
      return toLocaleString_.apply(this, ['localeTimeFormat', 'toLocaleTimeString']);
    },
    /**
     * タイムゾーンを（[+-]hhMM）形式の文字列で表示します
     * @return タイムゾーン文字列
     */
    toTimezoneOffsetString : function() {
      var timezoneOffset = this.getTimezoneOffset();
      var mark = (timezoneOffset < 0) ? '-' : '+';
      var timezoneOffsetAbs = Math.abs(timezoneOffset);
      var tempDate = getTmp$Date_(0);
      tempDate.setTime(timezoneOffsetAbs);
      return mark + leftZeroFill_(tempDate.getHours() % 100, 2) + leftZeroFill_(tempDate.getMinutes() % 100, 2);
    },
    /**
     * 月以下の情報を削除する。<br>
     * 例）2014/07/07 07:09:09.999 -> 2014/01/01 00:00:00.000
     */
    trancateMonth : function() {
      return this.setMonth(0).trancateDay();
    },
    /**
     * 日付以下の情報を削除する。<br>
     * 例）2014/07/07 07:09:09.999 -> 2014/07/01 00:00:00.000
     */
    trancateDay : function() {
      return this.setDay(1).trancateHours();
    },
    /**
     * 時以下の情報を削除する。<br>
     * 例）2014/07/07 07:09:09.999 -> 2014/07/07 00:00:00.000
     */
    trancateHours : function() {
      return this.setHours(0).trancateMinutes();
    },
    /**
     * 分以下の情報を削除する。<br>
     * 例）2014/07/07 07:09:09.999 -> 2014/07/07 07:00:00.000
     */
    trancateMinutes : function() {
      return this.setMinutes(0).trancateSeconds();
    },
    /**
     * 秒以下の情報を削除する。<br>
     * 例）2014/07/07 07:09:09.999 -> 2014/07/07 07:09:00.000
     */
    trancateSeconds : function() {
      return this.setSeconds(0).trancateMilliseconds();
    },
    /**
     * ミリ秒以下の情報を削除する。<br>
     * 例）2014/07/07 07:09:09.999 -> 2014/07/07 07:09:09.000
     */
    trancateMilliseconds : function() {
      return this.setMilliseconds(0);
    }
  });
})(jQuery, window);
/*
 * 省略or別名
 */
(function($, window, undefined) {
  $.Date.prototype.getYear = $.Date.prototype.getFullYear;
  $.Date.prototype.getDYear = $.Date.prototype.getDayOfYear;
  $.Date.prototype.getWMonth = $.Date.prototype.getWeekOfMonth;
  $.Date.prototype.getWYear = $.Date.prototype.getWeekOfYear;
  $.Date.prototype.getDayOfWeek = $.Date.prototype.getWDay;
  $.Date.prototype.parse = $.Date.prototype.setDate;
  window.DDate = $.Date;
})(jQuery, window);
/*
 * UTC情報
 */
(function($, window, undefined) {
  /*
   * 自身の年情報から、各月末情報をリスト化して保持する。<br>
   * 閏年の場合、this.lastDayLis[1] = 29となる。
   */
  var setLastDayList_ = function() {
    if ($.Date.isLeapYear(this.getUTCFullYear())) {
      this.lastDayList = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    } else {
      this.lastDayList = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    }
  };
  $.extend($.Date.prototype, {
    /** @lends $.Date# */
    /**
     * 対象ロケールの文字列で月を表示する。
     * @param {String} min|abbr|normal
     * @return 月文字列（MM|MMM|MMMM）
     */
    getUTCMonthString : function() {
      var viewPertten = arguments[0] || 'abbr';
      var monthViewArr = this.getLocaleLabel('months', viewPertten);
      return monthViewArr[this.getUTCMonth()];
    },
    /**
     * 対象ロケールの文字列もしくは数字で月を表示する。
     * @param {String} min|abbr|normal
     * @return 月文字列（M|MM|MMM|MMMM）or月数字（M|MM）
     */
    getUTCMonth : function() {
      if (!!arguments[0]) {
        return this.getUTCMonthString(arguments[0]);
      } else {
        return this.delegateMethod('getUTCMonth', arguments);
      }
    },
    /**
     * 日を表示する。<br>
     * Date型のgetUTCDate委譲メソッド
     * @return 日文字列
     */
    getUTCDay : function() {
      return this.delegateMethod('getUTCDate', arguments);
    },
    /**
     * 対象ロケールで曜日を出力する
     * @param {String} min|abbr|normal
     * @return 曜日文字列（EE|EEE|EEEE）
     */
    getUTCWDayString : function() {
      var viewPertten = arguments[0] || 'abbr';
      var weekdaysViewArr = this.getLocaleLabel('weekdays', viewPertten);
      return weekdaysViewArr[this.getUTCWDay()];
    },
    /**
     * 曜日を文字列もしくは数字で出力する。<br>
     * Date型のgetUTCDay委譲メソッド
     * @param {String} min|abbr|normal
     * @return 曜日文字列（E|EE|EEE|EEEE）or曜日数字（e|ee）
     */
    getUTCWDay : function() {
      if (!!arguments[0]) {
        return this.getUTCWDayString(arguments[0]);
      } else {
        return this.delegateMethod('getUTCDay', arguments);
      }
    },
    /**
     * 日付を設定します<br>
     * パースできる文字列を指定します<br>
     * {@link setUTCTime}の委譲メソッド
     *
     * @param {String}
     *        パースできる日付文字列
     * @return this
     */
    setUTCDate : function() {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      // setUTCTimeを実行
      this.delegateMethod('setUTCTime', [ Date.parse(arguments[0]) ]);
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 年設定。<br>
     * 引数の年を設定します。<br>
     *
     * @param {Number}
     *        year
     * @return this
     */
    setUTCYear : function(year) {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      // 2桁用。引数 < 1000の場合+2000年
      if ((0 + year) < 1000) {
        year = year + 2000;
      }
      // DateのsetUTCYearを実行
      this.delegateMethod('setUTCYear', [ year ]);
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 完全な年を設定します。<br>
     *
     * @param {Number}
     *        fullYear 4桁の年
     * @return this
     */
    setUTCFullYear : function(year) {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      this.setUTCYear.apply(this, [ year ]);
      return this;
    },
    /**
     * 月を設定します.<br>
     * ラベルの指定があれば、設定されている月の文字列で設定できます。<br>
     * ラベルは{@link $.Date.langs[this.defaultLocale][month][ラベル]}より取得
     *
     * @param {Object}
     *        month 月
     * @param {String}
     *        label[option] (min/abbr/normal)のいずれか
     * @return this
     */
    setUTCMonth : function() {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      // ラベルの指定があれば、対象ラベルに紐づくインデックス値を月として設定する
      if (!!arguments[1]) {
        var viewPertten = arguments[1];
        var monthViewArr = this.getLocaleLabel('months', viewPertten);
        for (var index = 0, labels = monthViewArr[index]; (labels = monthViewArr[index]); index++) {
          // 対象ラベルと一致した場合
          if (labels === arguments[0] + '') {
            this.delegateMethod('setUTCMonth', [ index ]);
            break;
          }
        }
        // 通常の動き
      } else {
        this.delegateMethod('setUTCMonth', arguments);
      }
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    },
    /**
     * 日を設定します。<br>
     * {@link setUTCDate}の委譲メソッド
     *
     * @param {Number}
     *        日
     * @return this
     */
    setUTCDay : function() {
      // 第一引数がなければエラーをスロー
      if ($.isUndefined(arguments[0])) {
        throw Error('argument Error.');
      }
      this.delegateMethod('setUTCDate', arguments);
      // 月末リストを更新する。
      setLastDayList_.apply(this, arguments);
      return this;
    }
  });
  $.Date.prototype.getUTCYear = $.Date.prototype.getUTCFullYear;
  $.Date.prototype.getUTCDayOfWeek = $.Date.prototype.getUTCWDay;
  $.Date.prototype.setUTCDayOfWeek = $.Date.prototype.setUTCWDay;
  $.Date.prototype.parseUTC = $.Date.prototype.setUTCDate;
})(jQuery, window);