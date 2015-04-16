module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: ["Gruntfile.js", "src/**/*.js", "example/**/*.js"]
    },
    jasmine_node: {
      example: {
        options: {
          forceExit: true,
          match: ".",
          matchall: false,
          extensions: "js",
          specNameMatcher: "spec"
        },
        all: ["example/test/"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jasmine-node");

  grunt.registerTask("default", ["jshint", "jasmine_node"]);

};
