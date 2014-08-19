/*
 * Japanese
 */
(function($, window, undefined) {
  var getPrivateObject = function() {
    var $privateDateObj = $.data(this, '_PRIVATE_$DATE_OBJECT_');
    if (!!$privateDateObj) {
      return $privateDateObj;
    }
    $privateDateObj = $.Date.newInstance($.Date);
    $.data(this, '_PRIVATE_$DATE_OBJECT_', $privateDateObj);
    return $privateDateObj;
  };
  $.extend($.Date.langs, {
    // langs : {
    ja : {
      months : {
        normal : '１_２_３_４_５_６_７_８_９_１０_１１_１２'.split('_'),
        abbr : '1_2_3_4_5_6_7_8_9_10_11_12'.split('_'),
        min : '1_2_3_4_5_6_7_8_9_10_11_12'.split('_')
      },
      weekdays : {
        normal : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
        abbr : '日曜_月曜_火曜_水曜_木曜_金曜_土曜'.split('_'),
        min : '日_月_火_水_木_金_土'.split('_')
      },
      time : {
        am : '午前',
        pm : '午後'
      },
      localeFormat : 'yyyy年MM月dd日(ee) HH:mm:ss UTCZ',
      localeDateFormat : 'yyyy年MM月dd日(ee)',
      localeTimeFormat : 'HH:mm:ss',
      era : {
        // era Name: [start Full Year(yyyy)]
        '明治以前' : [ 0, 1868 ],
        '明治' : [ 1868, 1912 ],
        '大正' : [ 1912, 1926 ],
        '昭和' : [ 1926, 1989 ],
        '平成' : [ 1989, 9999 ]
      },
      holidays : {
        '成人の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1949) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else if (thisYear < 2000) {
            targetDate.setMonth(0).setDay(15);
          } else {
            targetDate.setMonth(0).setNumberWeekday(2, 1, true);
          }
          return targetDate;
        },
        '建国記念の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1967) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else {
            targetDate.setMonth(1).setDay(11);
          }
          return targetDate;
        },
        'みどりの日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1989) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
            //targetDate.setMonth(3).setDay(29);
          } else if (thisYear < 2007) {
            targetDate.setMonth(3).setDay(29);
          } else {
            targetDate.setMonth(4).setDay(4);
          }
          return targetDate;
        },
        '昭和の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 2007) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else {
            targetDate.setMonth(3).setDay(29);
          }
          return targetDate;
        },
        '憲法記念日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1948) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else {
            targetDate.setMonth(4).setDay(3);
          }
          return targetDate;
        },
        'こどもの日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1948) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else {
            targetDate.setMonth(4).setDay(5);
          }
          return targetDate;
        },
        '海の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1996) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else if (thisYear < 2003) {
            targetDate.setMonth(6).setDay(20);
          } else {
            targetDate.setMonth(6).setNumberWeekday(3, 1, true);
          }
          return targetDate;
        },
        '敬老の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1966) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else if (thisYear < 2003) {
            targetDate.setMonth(8).setDay(15);
          } else {
            targetDate.setMonth(8).setNumberWeekday(3, 1, true);
          }
          return targetDate;
        },
        '体育の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1966) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else if (thisYear < 2000) {
            targetDate.setMonth(9).setDay(10);
          } else {
            targetDate.setMonth(9).setNumberWeekday(2, 1, true);
          }
          return targetDate;
        },
        '文化の日' : '2000/11/03 00:00:00',
        '勤労感謝の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1948) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else {
            targetDate.setMonth(9).setNumberWeekday(2, 1, true);
          }
          return targetDate;
        },
        '天皇誕生日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          if (thisYear < 1868) {
            // 策定前は妥当な休日をデフォルト設定（ここでは正月を設定）
            targetDate.setMonth(0).setDay(1);
          } else if (thisYear < 1913) {
            targetDate.setMonth(10).setDay(3);
          } else if (thisYear < 1914) {
            targetDate.setMonth(7).setDay(31);
          } else if (thisYear < 1927) {
            targetDate.setMonth(9).setDay(31);
          } else if (thisYear < 1989) {
            targetDate.setMonth(3).setDay(29);
          } else {
            targetDate.setMonth(11).setDay(23);
          }
          return targetDate;
        },
        // 1900から2099までの計算式にのみ対応
        '春分の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          var i = thisYear % 4;
          if (i === 0) {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 1960) {
              targetDate.setMonth(2).setDay(21);
            } else if (thisYear < 2092) {
              targetDate.setMonth(2).setDay(20);
            } else if (thisYear < 3000) {
              targetDate.setMonth(2).setDay(19);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          } else if (i === 1) {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 1993) {
              targetDate.setMonth(2).setDay(21);
            } else if (thisYear < 3001) {
              targetDate.setMonth(2).setDay(20);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          } else if (i === 2) {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 2026) {
              targetDate.setMonth(2).setDay(21);
            } else if (thisYear < 3002) {
              targetDate.setMonth(2).setDay(20);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          } else {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 1927) {
              targetDate.setMonth(2).setDay(22);
            } else if (thisYear < 2059) {
              targetDate.setMonth(2).setDay(21);
            } else if (thisYear < 3003) {
              targetDate.setMonth(2).setDay(20);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          }
          return targetDate;
        },
        // 1900から2099までの計算式にのみ対応
        '秋分の日' : function() {
          var thisYear = this.getFullYear();
          var targetDate = getPrivateObject().setTime(this.getTime());
          var i = thisYear % 4;
          if (i === 0) {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 2012) {
              targetDate.setMonth(8).setDay(24);
            } else if (thisYear < 3000) {
              targetDate.setMonth(8).setDay(23);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          } else if (i === 1) {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 1921) {
              targetDate.setMonth(8).setDay(24);
            } else if (thisYear < 2045) {
              targetDate.setMonth(8).setDay(23);
            } else if (thisYear < 3001) {
              targetDate.setMonth(8).setDay(22);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          } else if (i === 2) {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 1950) {
              targetDate.setMonth(8).setDay(24);
            } else if (thisYear < 2078) {
              targetDate.setMonth(8).setDay(23);
            } else if (thisYear < 3002) {
              targetDate.setMonth(8).setDay(22);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          } else {
            if (thisYear < 1900) {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            } else if (thisYear < 1983) {
              targetDate.setMonth(8).setDay(24);
            } else if (thisYear < 3003) {
              targetDate.setMonth(8).setDay(23);
            } else {
              // 計算式外は妥当な休日をデフォルト設定（ここでは正月を設定）
              targetDate.setMonth(0).setDay(1);
            }
          }
          return targetDate;
        },
        '元旦' : '2000/01/01 00:00:00'
      },
      // from NTP app
      ntpJSONP : 'http://json-time.appspot.com/time.json?tz=Japan&callback=?'
    }
  // }
  });
}(jQuery, window));