var webPage = require('webpage');
var page = webPage.create();

var stringify = function(obj) {
  return JSON.stringify(obj, null, 2);
};

var url = 'http://www.google.com'

var _page = '';
// var props = Object.getOwnPropertyNames(page);
// console.log(stringify(props));
page.onLoadFinished = function(status) {
  // console.log('Loaded');
  if (status === 'success') {
    page.evaluate(function(arg1){
      setTimeout(function(){
        console.log('end', arg1)
      }, 5000);
    }, 'hello world');
  }
};

page.onConsoleMessage = function(msg) {
  console.log('PAGE:', msg);
  // if (msg === 'end') {
  //   phantom.exit();
  // }
  phantom.exit();
}

page.onError = function() {
  console.log('Error:', JSON.stringify(arguments, null ,2));
}

page.onUrlChanged = function(url) {
  console.log('UrlChanged:', url);
}
page.open(url);

// page.openUrl(url, {}, {});
