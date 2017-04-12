var webPage = require('webpage');
var page = webPage.create();
var minimist = require('./node_modules/minimist');
// var system = require('system');
// var wireEvents = require('./wire-events');

var stringify = function(obj) {
  return JSON.stringify(obj, null, 2);
};
// var args = system.args.slice();
// args.shift();
// console.log(stringify(system.args));
// var params = minimist(args);
// console.log(Array.isArray(system.args));;
// console.log(stringify(params));

var url = 'http://www.google.com'

var _page = '';
// var props = Object.getOwnPropertyNames(page);
// console.log(stringify(props));
page.onLoadFinished = function(status) {
  // console.log('Loaded');
  if (status === 'success') {
    page.evaluate(function(){
      setTimeout(function(){
        console.log('end')
      }, 5000);
    });
  }
};

page.onConsoleMessage = function(msg) {
  console.log('PAGE:', msg);
  if (msg === 'end') {
    phantom.exit();
  }
}

page.onError = function() {
  console.log('Error:', JSON.stringify(arguments, null ,2));
}

page.onUrlChanged = function(url) {
  console.log('UrlChanged:', url);
}
page.open(url);

// page.openUrl(url, {}, {});
