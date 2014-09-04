
$.Delegate - JavaScript 委譲クラス作成プラグイン.
$.Date     - JavaScript 委譲Dateクラス（オリジナルDateクラス＋α）.

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
[Delegate Engine($.Delegate)をご利用する方]
 - 必要なファイル
  - jquery.delegate[-min].js
  - jquery.delegate.polyfill[-min].js
 - 概要
  jQuery Library を用いた委譲メソッド生成エンジンです。
  指定した委譲対象クラスの存在するコンストラクタ、クラスメソッド、インスタンスメソッドの
  委譲コンストラクタ、委譲クラスメソッド、委譲インスタンスメソッドを作成した状態で提供します。
  （setXXXインスタンスメソッドだけは、一律thisを返却したインスタンスメソッドに作成し直されます）
 - 委譲（コンストラクタ、クラスメソッド、インスタンスメソッド）の作成方法
  - コンストラクタ（$.Delegate.inheritInstance(委譲元クラス, 委譲先クラス)）
    まず、コンストラクタを委譲します。
    作成後は設定した委譲元クラスのコンストラクタを実行しますが、実行後、第二引数で設定した
    委譲先クラスの実行も直後に行います。

  - クラスメソッド
   委譲元クラスメソッドは、次のように呼び出せます。

   委譲クラス.classDelegateMethod('クラスメソッド名', arguments);

   例）Math.absメソッドを委譲する例
     delegateMath.abs = function() {
       var result = delegateMath.classDelegateMethod('abs', arguments);
       return 'DELEGATE:'+ result;
     };

  - インスタンスメソッド
   委譲元インスタンスメソッドは、次のように呼び出せます。

   this.delegateMethod('インスタンスメソッド名', arguments);

   例）Date.prototype.getMonthメソッドを委譲する例
     delegateDate.prototype.getMonth = function() {
       var result = this.delegateMethod('getMonth', arguments);
       return 'DELEGATE:'+ (result + 1);
     };

   基本的な記述方法は以上となります。
   これらの組み合わせで委譲クラスを作成していきます。

   * 注意点
    委譲したクラスにはObject.createを使うことができません。
    ご利用の際は
    - [委譲クラス].getInstance()
    - new [委譲クラス]()
    のよりインスタンス化ください。getInstanceはメモリ節約になります。

----------------------------------------------------------------------
[Delegate Date($.Date)をご利用する方]
 - 必要なファイル
  - jquery.delegate[-min].js
  - jquery.delegate.polyfill[-min].js
  - jquery.delegate.date-1.0[-min].js
  - (必要に応じて)jquery.delegate.date-(ja|en)[-min].js
  - (必要に応じて)jquery.delegate.date[-min].js
 -概要
  $.Delegateを利用したDate委譲クラスです。
  Dateクラスを$.Dateとするだけで、ほぼ同じメソッドを呼び出せますし
  一部のわかりにくいメソッドを交換しています。
  たとえば
  Date.prototype.getDate は $.Date.prototype.getDay に
  Date.prototype.getDay は $.Date.prototype.getWDay になっており
  $.Date.prototype.げｔDateの内部処理はDate.prptotype.toDateStringを
  返却することで、他言語と仕様を合わせた作りとしています。
  他にも'getTimezoneOffset'の符号を反転させたりしています。
  詳細は、jsdoc、またはtest内容を記載した'DelegateDateSpec-1.0.js'ファイルを
  ご確認ください。使用方法、知りたい情報はほぼそろうはずです。
 -お勧めのメソッド
  - addXXX / trancateXXX
   addXXXは今のDateから+-に加減算します（結果はthisが返り、プロパティが変化します）
   trancateXXXは指定したXXXから下位の桁を0埋めします。

  - format
   現在プロパティ内で持っている日付情報を任意の書式で出力します。
   yyyy-MMM-dd: 2014-Jan-01 etc

  - setNumberWeekday
   第nのX曜日の日に設定します。

  - isHoliday/ roundHoliday
   isHoliday: 休日判定
   roundHoliday: 現在のプロパティ日付から引数の日付までの日数のうち
                 休日の日付をカウントします。

  - syncNTP
   ロケール情報から、NTPサーバに同期した日付に設定します。（JSONP）

   * 注意点
    xxxUTCxxxメソッドはほぼ試験を行っていません
----------------------------------------------------------------------
