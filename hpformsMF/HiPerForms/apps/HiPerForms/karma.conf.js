// Karma configuration
// Generated on Thu Aug 21 2014 16:17:30 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        {pattern: 'common/**/*.html', watched: false, included: false, served: true},
        {pattern: 'common/config/*.json', watched: false, included: false, served: true},
        "tests/lib/jquery-2.1.0.js",
        "common/lib/jqueryMobile/dist/jquery.mobile.js",
        "common/lib/i18n/jquery.i18n.properties-1.0.9.js",
        "common/lib/moment/moment-with-langs.js",
        "common/lib/datepicker/jquery.ui.datepicker.js",
        "common/lib/datepicker/jquery.ui.datepicker-en.js",
        "common/lib/datepicker/jquery.ui.datepicker-fr.js",
        "common/lib/datepicker/jquery.ui.datepicker-nl.js",
        "common/lib/datepicker/jquery.mobile.datepicker.js",
        "common/lib/hammer/hammer.js",
        "common/lib/jqm-mvc/trasys.jqm-mvc.1.0.0.js",
        "tests/lib/jasmine-2.0.0/jasmine.js",
        "tests/lib/jasmine-jquery.js",
        "tests/lib/worklight-mock.js",
        "tests/lib/jq-dev-utils/trasys.jq-dev-utils-test.0.1.0.js",
        "tests/build/src/ts/Trasys/Hipermobile/Model/Entity.js",
        "tests/build/src/**/*.js",
        "tests/build/specs/tests/**/*.js"
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
