/**
 * $.Delegateクラス, $.Dateクラス, $.Dateクラスの 言語ファイルのインポート
 */
(function() {
  var parts = document.location.search.slice(1).split('&'), length = parts.length, scripts = document.getElementsByTagName('script'), src =
    scripts[scripts.length - 1].src, i = 0, current, version = '1.0', lang = 'en';

  // lang default using browserLanguage
  var browserLocaleStr = navigator.browserLanguage || navigator.language || navigator.userLanguage || undefined;
  if (!!browserLocaleStr) {
    lang = browserLocaleStr.substr(0, 2);
  }

  for (; i < length; i++) {
    current = parts[i].split('=');
    if (current[0] === 'dateVer') {
      // dateバージョン指定
      version = current[1];
    } else if (current[0] === 'lang') {
      // 言語指定
      lang = current[1];
    }
  }

  if (src.match(/jquery\.delegate\.date\.js$/)) {

    // $.Delegate プラグインをインポート
    var file = src.replace(/jquery\.delegate\.date\.js$/, 'jquery.delegate.js');
    $('<script/>', {
      src : file
    }).appendTo($(scripts));
    document.write('<script src="' + file + '"></script>');

    // $.Date クラスのインポート
    var fileDate = src.replace(/jquery\.delegate\.date\.js$/, 'jquery.delegate.date-' + version + '.js');
    document.write('<script src="' + fileDate + '"></script>');

    // $.Dateクラスの 言語ファイル
    var fileLang = src.replace(/jquery\.delegate\.date\.js$/, 'jquery.delegate.date-' + lang + '.js');
    document.write('<script src="' + fileLang + '"></script>');

  } else if (src.match(/jquery\.delegate\.date-min\.js$/)) {

    // $.Delegate プラグインをインポート
    var file = src.replace(/jquery\.delegate\.date-min\.js$/, 'jquery.delegate-min.js');
    $('<script/>', {
      src : file
    }).appendTo($(scripts));
    document.write('<script src="' + file + '"></script>');

    // $.Date クラスのインポート
    var fileDate = src.replace(/jquery\.delegate\.date-min\.js$/, 'jquery.delegate.date-' + version + '-min.js');
    document.write('<script src="' + fileDate + '"></script>');

    // $.Dateクラスの 言語ファイル
    var fileLang = src.replace(/jquery\.delegate\.date-min\.js$/, 'jquery.delegate.date-' + lang + '-min.js');
    document.write('<script src="' + fileLang + '"></script>');

  }
})();