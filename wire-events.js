function stringify(obj) {
  return JSON.stringify(obj, null, 2);
}
function printArgs() {
    console.log(stringify(arguments));
    console.log("");
}

module.exports = function(page) {
  // page.onInitialized = function() {
  //     console.log("page.onInitialized");
  //     printArgs.apply(this, arguments);
  // };
  page.onLoadStarted = function() {
      console.log("page.onLoadStarted");
      printArgs.apply(this, arguments);
  };
  page.onLoadFinished = function() {
      console.log("page.onLoadFinished");
      printArgs.apply(this, arguments);
  };
  page.onUrlChanged = function() {
      console.log("page.onUrlChanged");
      printArgs.apply(this, arguments);
  };
  page.onNavigationRequested = function() {
      console.log("page.onNavigationRequested");
      printArgs.apply(this, arguments);
  };
  // page.onRepaintRequested = function() {
  //     console.log("page.onRepaintRequested");
  //     printArgs.apply(this, arguments);
  // };

  // page.onResourceRequested = function() {
  //     console.log("page.onResourceRequested");
  //     printArgs.apply(this, arguments);
  // };
  // page.onResourceReceived = function() {
  //     console.log("page.onResourceReceived");
  //     printArgs.apply(this, arguments);
  // };

  page.onClosing = function() {
      console.log("page.onClosing");
      printArgs.apply(this, arguments);
  };

  // window.console.log(msg);
  page.onConsoleMessage = function() {
      console.log("page.onConsoleMessage");
      printArgs.apply(this, arguments);
  };

  // window.alert(msg);
  page.onAlert = function() {
      console.log("page.onAlert");
      printArgs.apply(this, arguments);
  };
  // var confirmed = window.confirm(msg);
  page.onConfirm = function() {
      console.log("page.onConfirm");
      printArgs.apply(this, arguments);
  };
  // var user_value = window.prompt(msg, default_value);
  page.onPrompt = function() {
      console.log("page.onPrompt");
      printArgs.apply(this, arguments);
  };
}
