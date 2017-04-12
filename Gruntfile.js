var exec = require('child_process').exec;
const path = require('path');
// var phantomBin = path.join(__dirname, 'node_modules/.bin/phantomjs');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['*.js', 'package.json'],
      tasks: ['exec'],
      options: {
        interrupt: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('exec', function(){
    var done = this.async();
    exec('npm start', function(err, stdout, stderr){
      grunt.log.writeln(stdout);
      done();
    });
  });

  grunt.registerTask('default', ['watch'])
};
