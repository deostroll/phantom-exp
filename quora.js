var page = require('webpage').create();
var url = 'https://www.quora.com/profile/Arun-Jayapal';

function stringify(obj) {
  return JSON.stringify(obj, null, 2)
}

page.onConsoleMessage = function(msg) {
  console.log('PAGE:', msg);
};

// page.onUrlChanged = function(s) {
//   console.log('CHANGED:', s);
// };

function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};

page.onLoadFinished = function() {
  console.log('loaded');
  waitFor(functionjQuery(){
    return page.evaluate(function(){
      // console.log(Object.keys(window).filter(function(x){ return x.substr(0,6) === 'scroll'; }));
      var maxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var $ = jQuery;
      // console.log(typeof($) === 'function');
      var scrollToEnd = maxY === $(window).scrollTop();
      console.log(maxY, $(window).scrollTop(), scrollToEnd);
      if (!scrollToEnd) {
        $(window).scrollTop(maxY);
        return false;
      }
      else {
        return true;
      }
    })
  }, function() {
    var results = page.evaluate(function(){
      $('.rendered_qtext').filter(function(i, el){
        return $(el).parent().parent().is('a');
      })
      .map(function(i, el){
        var $el = $(el);
        return {
          question: $el.text(),
          url: $el.parent().parent().attr('href')
        }
      }).get();
      return results;
    });
    console.log(results.length);
    phantom.exit();
  });
}

page.open(url)
