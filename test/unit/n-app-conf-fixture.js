/**
 * User: steve
 * Date: 7/13/12
 * Time: 1:24 PM
 */

var nodeunit_module = require('nodeunit');
var test_case = nodeunit_module.testCase;

var settings_module = require('../../lib/n-app-conf');

var SETTINGS_TEST_FILE = './assets/settings.json';

exports.primaryTestGroup = test_case(
    {
        noOptionParametersFails : function(test) {

            test.expect(1);

            try {
                new settings_module.Settings();
            } catch(err) {

                test.ok(err.indexOf('A filename parameter or options object needs to be provided.') > -1);
            }

            test.done();
        },

        stringFilenameOptionWorks : function(test) {
            test.expect(2);

            var settings = settings_module.Settings(SETTINGS_TEST_FILE);

            test.equal(settings.settings_testing, 'value');
            test.equal(settings.scoped.setting, 'v');

            test.done();
        },

        environmentOverrideRootScope : function(test) {
            test.expect(1);

            var settings_testing_override = 'overridden_for_testing';

            process.env['settings_testing'] = settings_testing_override;

            var settings = settings_module.Settings(SETTINGS_TEST_FILE);

            test.equal(settings.settings_testing, settings_testing_override);

            process.env['settings_testing'] = null;

            test.done();
        },

        environmentOverrideNestedScope : function(test) {
            test.expect(1);

            var settings_testing_override = 'overridden_for_testing';

            process.env['scoped__setting'] = settings_testing_override;

            var settings = settings_module.Settings(SETTINGS_TEST_FILE);

            test.equal(settings.scoped.setting, settings_testing_override);

            process.env['scoped__setting'] = null;

            test.done();
        },

        thirdLevelNestedEnvironmentOverride : function(test) {
            test.expect(1);

            var settings_testing_override = 'overridden_for_testing';

            process.env['scoped__deeper__deepest__third_level'] = settings_testing_override;

            var settings = settings_module.Settings(SETTINGS_TEST_FILE);

            test.equal(settings.scoped.deeper.deepest.third_level, settings_testing_override);

            process.env['scoped__deeper__deepest__third_level'] = null;

            test.done();
        }
    }
);