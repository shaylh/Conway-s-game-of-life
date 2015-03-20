var grunt = require('grunt');
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
        unit: {
            configFile: 'karma.conf.js'
        }
    }
});

grunt.loadNpmTasks('grunt-karma');