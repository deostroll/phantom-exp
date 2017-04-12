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
    var scrollFn = function() {
      console.log('scrolling...');
      page.evaluate(function(){
        (function($){
          var maxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var curPos = $(window).scrollTop();
          console.log(JSON.stringify({
            cur: curPos, maxY: maxY
          }));
          if (maxY !== curPos) {
            $(window).scrollTop(maxY);
          }
          else {
            console.log('done')
          }
        })(window.jQuery);
      });//end page evaluate
    }; //end scrollFn

    _run(scrollFn, 'server_call_POST')

  }
}

page.open(url);

function _run(fn, part) {

  page.onResourceRequested = function(req) {
    if (req.url.indexOf(part) > -1) {
      // console.log('Requested:', req.url);
      _log({type: 'req', id: req.id, url: req.url})
    }
  };

  page.onResourceReceived = function(res) {
    if (res.url.indexOf(part) > -1 && res.stage === 'end') {
      // console.log('Response:', res.url);
      _log({type: 'res', id: res.id, url: res.url})
      setTimeout(fn, 10000);
    }
  };

  // setTimeout(fn, 300);
}

function _log(obj) {
  console.log(JSON.stringify(obj));
}
