module.exports = function (grunt) {
	
    // Load the tasks
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-less");
    
    // Configure grunt
    grunt.initConfig({
    	pkg: grunt.file.readJSON("package.json"),
        ts: {
        	// Compile the TS source files.
            dev: {
                src: ["<%= pkg.applicationRoot %>/common/**/*.ts"],
                reference: "<%= pkg.applicationRoot %>/common/ts/reference.ts",
                out: "<%= pkg.applicationRoot %>/common/js/out.js"
            },
            // Compile the TS test files.
            test: {
            	src: ["<%= pkg.applicationRoot %>/tests/ts/Trasys/**/*.ts", 
            	      "<%= pkg.applicationRoot %>/tests/lib/**/*.ts"],
                reference: "<%= pkg.applicationRoot %>/tests/ts/reference.ts",
            	outDir: "<%= pkg.applicationRoot %>/tests/build/specs",
            	options: {
            		sourceMap: false
            	}
            },
            // Compile the TS source files to use for running unit tests and measuring coverage.
            test_compile_src: {
                src: ["<%= pkg.applicationRoot %>/common/**/*.ts"],
                reference: "<%= pkg.applicationRoot %>/common/ts/reference.ts",
            	outDir: "<%= pkg.applicationRoot %>/tests/build/src",
            	options: {
            		sourceMap: false,
            		removeComments: false
            	}
            }
        },
        jasmine: {
        	// Run jasmine unit tests and measure test coverage.
        	coverage: {
	        	src: [
	        	      "<%= pkg.applicationRoot %>/tests/build/src/ts/**/*.js"
	        	],
	        	options: {
                    vendor: [
                        "<%= pkg.applicationRoot %>/tests/lib/jquery-2.1.0.js",
                        "<%= pkg.applicationRoot %>/common/lib/jqueryMobile/dist/jquery.mobile.js",
                        "<%= pkg.applicationRoot %>/common/lib/i18n/jquery.i18n.properties-1.0.9.js",
                        "<%= pkg.applicationRoot %>/common/lib/moment/moment-with-langs.js",
                        "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker.js",
                        "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker-en.js",
                        "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker-fr.js",
                        "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker-nl.js",
                        "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.mobile.datepicker.js",
                        "<%= pkg.applicationRoot %>/common/lib/hammer/hammer.js",
                        "<%= pkg.applicationRoot %>/tests/lib/jasmine-jquery.js",
                        "<%= pkg.applicationRoot %>/tests/lib/worklight-mock.js",
                        "<%= pkg.applicationRoot %>/tests/lib/jq-dev-utils/trasys.jq-dev-utils-test.0.1.0.js"
                    ],
    		        helpers: ["<%= pkg.applicationRoot %>/tests/build/specs/tests/ts/Trasys/Common/Test/**/*.js"],
    		        specs: ["<%= pkg.applicationRoot %>/tests/build/specs/tests/**/*.js"],
	        		template: require("grunt-template-jasmine-istanbul"),
	        		templateOptions: {
	        			files: ["<%= pkg.applicationRoot %>/tests/build/src/**/*.js"],
	                    coverage: "<%= pkg.applicationRoot %>/tests/build/coverage/coverage.json",
	                    report: {
	                    	type: "html",
	                    	options: {
		                    	dir: "<%= pkg.applicationRoot %>/tests/build/coverage"
	                    	}
	                    }
	                }
	        	}
        	},
        	coverage_ci: {
	        	src: [
	        	      "<%= pkg.applicationRoot %>/tests/build/src/ts/**/*.js"
	        	],
	        	options: {
	        		vendor: ["<%= pkg.applicationRoot %>/tests/lib/jquery-2.1.0.js", 
	        		         "<%= pkg.applicationRoot %>/common/lib/jqueryMobile/dist/jquery.mobile.js",
	        		         "<%= pkg.applicationRoot %>/common/lib/i18n/jquery.i18n.properties-1.0.9.js", 
	        		         "<%= pkg.applicationRoot %>/common/lib/moment/moment-with-langs.js",
	        		         "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker.js",
	        		         "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker-en.js",
	        		         "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker-fr.js",
	        		         "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.ui.datepicker-nl.js",
	        		         "<%= pkg.applicationRoot %>/common/lib/datepicker/jquery.mobile.datepicker.js",
	        		         "<%= pkg.applicationRoot %>/common/lib/hammer/hammer.js",
	        		         "<%= pkg.applicationRoot %>/tests/lib/jasmine-jquery.js",
	        		         "<%= pkg.applicationRoot %>/tests/lib/worklight-mock.js"],
    		        helpers: ["<%= pkg.applicationRoot %>/tests/build/specs/tests/ts/Trasys/Common/Test/**/*.js"],
    		        specs: ["<%= pkg.applicationRoot %>/tests/build/specs/tests/**/*.js"],
		        	junit: {
		        		path: "<%= pkg.applicationRoot %>/tests/build/junit",
		        		consolidate: true
		        	},
	        		template: require("grunt-template-jasmine-istanbul"),
	        		templateOptions: {
	        			files: ["<%= pkg.applicationRoot %>/tests/build/src/**/*.js"],
	                    coverage: "<%= pkg.applicationRoot %>/tests/build/coverage/coverage.json",
	                    report: {
	                    	type: "cobertura",
	                    	options: {
		                    	dir: "<%= pkg.applicationRoot %>/tests/build/coverage"
	                    	}
	                    }
	                }
	        	}
        	}
        },
        clean: {
        	// Clean test build folder.
        	test: {
        		src: ["<%= pkg.applicationRoot %>/tests/build/**/*", "<%= pkg.applicationRoot %>/tests/build"],
        		options: {force: true}
        	}
        },        
        watch: {
        	options : {
        		spawn: false
        	},
        	// Watch the source folder for changes. Changes recompile sources and tests.
        	src: {
        		files: ["<%= pkg.applicationRoot %>/common/ts/**/*.ts", "!<%= pkg.applicationRoot %>/common/ts/reference.ts"],
        		tasks: ["ts:dev", "ts:test"]
        	},
        	// Watch the styles less folder for changes. Changes recompile less
        	less:{
        		files: ["<%= pkg.applicationRoot %>/common/less/**/*.less"],
        		tasks: ["less"]
        	},
        	// Watch the test folder for changes. Changes recompile tests.
        	test: {
        		files: ["<%= pkg.applicationRoot %>/tests/ts/**/*.ts", "!<%= pkg.applicationRoot %>/tests/ts/reference.ts"],
        		tasks: ["ts:test"]
        	}
        },
        less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2,
					paths: ['<%= pkg.applicationRoot %>/common/less/.less']
				},
				files: {
					"<%= pkg.applicationRoot %>/common/css/stylesdesign.css": "<%= pkg.applicationRoot %>/common/less/styles.less"
				}
			}
		}
    });
    
    grunt.registerTask("default", ["ts:dev", "ts:test", "less", "watch"]);
    grunt.registerTask("build", ["ts:dev"]);
    grunt.registerTask("build-test", ["ts:dev", "ts:test"]);
    grunt.registerTask("build-ci", ["ts:dev", "ts:test", "less"]);
    grunt.registerTask("test", ["clean:test", "ts:test_compile_src", "ts:test", "jasmine:coverage"]);
    grunt.registerTask("test-ci", ["clean:test", "ts:test_compile_src", "ts:test", "jasmine:coverage_ci"]);
    
}
