var webPage = require('webpage');
var page = webPage.create();
var minimist = require('./node_modules/minimist');
// var system = require('system');
var wireEvents = require('./wire-events');

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
    if (_page === '') {
      page.evaluate(function(){
        console.log('Forms:', document.forms[0]);
        var form = document.forms[0];
        var inpArr = document.getElementsByTagName('input');
        var inputs = [].slice.call(inpArr);
        inputs.filter(function(inp){
          return inp.type === 'text'
        }).forEach(function(inp){
          inp.value = 'India Gate'
        });
        form.submit();
      });
      _page = 'results'
      // phantom.exit();
    }
    else if (_page === 'results') {

      var results = page.evaluate(function(){
        var h3Arr = document.querySelectorAll('.r');
        var r = [];
        for(var i = 0, j = h3Arr.length; i < j; i++) {
          var h3 = h3Arr[i];
          var a = h3.childNodes[0];
          r.push({
            url: a.href,
            title: a.innerText
          });
        }
        return r;
      });
      console.log(stringify(results));
      phantom.exit();
    }
  }
};

page.onConsoleMessage = function(msg) {
  console.log('PAGE:', msg);
}

page.onError = function() {
  console.log('Error:', JSON.stringify(arguments, null ,2));
}

page.onUrlChanged = function(url) {
  console.log('UrlChanged:', url);
}
page.open(url);

// page.openUrl(url, {}, {});
