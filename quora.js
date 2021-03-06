var page = require('webpage').create();
var url = 'https://www.quora.com/profile/Arun-Jayapal';
var fs = require('fs');

function stringify(obj) {
  return JSON.stringify(obj, null, 2)
}

page.onConsoleMessage = function(msg) {
  console.log('PAGE:', msg);
  if (msg === 'done') {
    var answers = page.evaluate(function(){
      return (function($){
        return $('.rendered_qtext')
          .filter(function(i, span){
            return $(span).parent().parent().is('a')
          })
          .map(function(i, span){
            var $a = $(span).parent().parent();
            return {
              q: $a.text(),
              u: $a.attr('href')
            };
          }).get();

      })(window.jQuery)
    });
    var json = stringify(answers);
    fs.write('answers.json', json, 'w');
    console.log('Count:', answers.length);
    phantom.exit();
  }
};

page.onError = function() {
  console.log(stringify(arguments));
}
page.onLoadFinished = function(status) {
  if (status === 'success') {
    page.evaluate(function(){
      var getMaxY = function() {
        return document.documentElement.scrollHeight - document.documentElement.clientHeight;
      };
      var stringify = function(obj) {
        return JSON.stringify(obj, null, 2);
      };

      (function($){
        var testFn = function() {
          var maxY = getMaxY();
          var curPos = $(window).scrollTop();
          var reachedEnd = curPos === maxY;
          console.log(stringify({
            maxY: maxY,
            curPos: curPos,
            isEnd: reachedEnd
          }));

          if (!reachedEnd) {
            $(window).scrollTop(maxY);
            //repeat
            console.log('repeating...');
            setTimeout(testFn, 10000);
          }
          else {
            console.log('done');
          }
        };

        setTimeout(testFn, 500);

      })(window.jQuery);


    });
  }
}

page.open(url)
