var page = require('webpage').create();
var stringify = function(o) {return JSON.stringify(o, null ,2); };
// var url = 'https://www.quora.com/profile/Arun-Jayapal/activity';

var url = 'https://google.com';

page.onConsoleMessage = function(msg) {
  console.log('PAGE:', msg);
};

page.onLoadFinished = function(status) {
  console.log('Loaded');
  setTimeout(function(){
    console.log('exec');
    page.evaluate(function(){
      console.log('from web page...')
    });

    phantom.exit();
  },5000);

};

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};


page.openUrl(url, {}, {});
