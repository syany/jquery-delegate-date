
$.Delegate - JavaScript delegate engine.
$.Date     - JavaScript Date delegate class.

You may use any this project under the terms of the MIT or GPL Version 3 license.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

----------------------------------------------------------------------
[Detail Tree]
/
|  README.txt
+--dist
|  +--min
|  |      jquery.delegate-min.js
|  |      jquery.delegate.date-1.0-min.js
|  |      jquery.delegate.date-en-min.js
|  |      jquery.delegate.date-ja-min.js
|  |      jquery.delegate.date-min.js
|  |      jquery.delegate.polyfill-min.js
|  +--org
|          jquery.delegate.date-1.0.js *** $.Date
|          jquery.delegate.date-en.js  *** $.Date Language for English
|          jquery.delegate.date-ja.js  *** $.Date Language for Japanese
|          jquery.delegate.date.js     *** $.Date include tool(includes $.Delegate/$.Date/$.Date Language)
|          jquery.delegate.js          *** $.Delegate
|          jquery.delegate.polyfill.js *** Polyfill for $.Delegate
+--jsdoc
|  +--jquery-date
|  |      index.html
|  +--jquery-delegate
|          index.html
+--License
|  |  COPYING
|  |  MIT.LICENSE
|  +--DeveloperOnly
|  |  +--jasmine-2.0.0
|  |  |      MIT.LICENSE
|  |  +--yui-compressor-ant-task-1.0
|  |          LICENSE.TXT
|  +--jQuery-1.10
|          License   jQuery Foundation.htm
+--WebContent
    +--app
    |  +--jasmine-2.0.0 *** for Unit Test.
    +--dist *** original src
    |      jquery.delegate.date-1.0.js
    |      jquery.delegate.date-en.js
    |      jquery.delegate.date-ja.js
    |      jquery.delegate.date.js
    |      jquery.delegate.js
    |      jquery.delegate.polyfill.js
    +--lib
    |      jquery-1.10.2.js
    +--test
        |  jquery.delegate.date.test.html *** Unit Test RunnerHTML for $.Date
        |  jquery.delegate.test.html *** Unit Test RunnerHTML for $.Delegate
        +--spec
                DelegateDateSpec-1.0.js *** Unit Test case
                DelegateSpec-1.0.js *** Unit Test case

----------------------------------------------------------------------
[Delegate Engine($.Delegate) if you would like to use]
 - Files needs to use.
  - jquery.delegate[-min].js
  - jquery.delegate.polyfill[-min].js
 - Overview
  This's Delegate Engine using jQuery Library and apply methods.
  If this use then it will provide delegate class with constructor, class methods and instance methods.
 - How to use
  - The Delegate constructor ($.Delegate.inheritInstance(sourceClass, targetClass))
   At first delegate Class made to use the inheritInstance method.
   add original function after source classes constructor.

   if you were going to make delegate class using the method,
   You could get class method and instance method. And with 'return this' function in setter method.

  - How use class delegate methods

   `Delegate class'.classDelegateMethod('The class name', arguments);

   ex）there is delegate Math.abs
     delegateMath.abs = function() {
       var result = delegateMath.classDelegateMethod('abs', arguments);
       return 'DELEGATE:'+ result;
     };

  - instance methods
   this.delegateMethod('method name', arguments);

   ex）Date.prototype.getMonth method delegate
     delegateDate.prototype.getMonth = function() {
       var result = this.delegateMethod('getMonth', arguments);
       return 'DELEGATE:'+ (result + 1);
     };

   * NOTICE
    This delegate engine no use Object.create
     You can only...
     [delegateClass].getInstance()
     or
     new [delegateClass]()

    I recommend to use getInstance (and removeInstance)

----------------------------------------------------------------------
[Delegate Date($.Date)if you would like to use]
 - Files needs to use..
  - jquery.delegate[-min].js
  - jquery.delegate.polyfill[-min].js
  - jquery.delegate.date-1.0[-min].js
  - (必要に応じて)jquery.delegate.date-(ja|en)[-min].js
  - (必要に応じて)jquery.delegate.date[-min].js
 -Overview
  The delegate Date class using $.Delegate.
  You can easy to use Date class in the same way.
  some method exchange... for example...
  Date.prototype.getDate to $.Date.prototype.getDay and
  Date.prototype.getDay to $.Date.prototype.getWDay and
  $.Date.prototype.getDate using Date.prptotype.toDateString return.

  Please check jsdoc and 'DelegateDateSpec-1.0.js' file
  they help you to use it.

 -recommend method
  - addXXX / trancateXXX
   addXXX is additional date (return this and change this date property).
   trancateXXX is delete from XXX to after them.

  - format
   output String, free format you like.
   yyyy-MMM-dd: 2014-Jan-01 etc

  - setNumberWeekday
   Setting date the N number X weekday.

  - isHoliday/ roundHoliday
   isHoliday: true if this date is Holiday.
   roundHoliday: Counting holiday, round thiday and arguments date.

  - syncNTP
   setting date using NTP server. (using JSONP).

   * NOTICE
    xxxUTCxxx was not test.
----------------------------------------------------------------------
