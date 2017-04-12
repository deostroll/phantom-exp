var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log('Page:', msg);
};

page.onUrlChanged = function(u) {
  console.log('UrlChanged:', u);
};

var url = 'https://www.google.com';

var noop = function(s) { console.log('status:', s)};



page.onError = function() {
  console.log('Error', JSON.stringify(arguments));
};

page.open(url, noop);
console.log('end injection');
