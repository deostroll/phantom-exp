var page = require('webpage').create();
var url = 'https://www.quora.com/profile/Arun-Jayapal';
var fs = require('fs');
var s = fs.open('log.txt', 'w');
var log = function(obj) {
  var str = JSON.stringify(obj, null, 2);
  console.log(str);
  s.writeLine(str);
  s.flush();
};

var msg = function(m) {
  s.writeLine(m);
  s.flush();
};

// page.onResourceRequested = function(request) {
//
// };
var counter = 0;
page.onResourceReceived = function(response) {
  if (response.url.indexOf('call_POST') > -1 && response.stage === 'end') {
    console.log(response.id, response.url);
    var name = 'file.' + counter++ + '.html';
    fs.write(name, page.content, 'w');
  }
};
page.open(url, function(status){
  if (status === 'success') {
    var name = 'file.' + counter++ + '.html';
    fs.write(name, page.content, 'w');
  }
});
