/**
 * User: steve
 * Date: 7/13/12
 * Time: 1:24 PM
 */

var nodeunit_module = require('nodeunit');
var test_case = nodeunit_module.testCase;

var settings_module = require('../../dist/n-app-conf');

var SETTINGS_TEST_FILE = 'test/unit/assets/settings.json';

exports.primaryTestGroup = test_case(
    {
        stringFilenameOptionWorks : function(test) {
            test.expect(2);

            var options = new settings_module.Options(SETTINGS_TEST_FILE);
            var settings = new settings_module.Settings(options);

            test.equal(settings.entries.settings_testing, 'value');
            test.equal(settings.entries.scoped.setting, 'v');

            test.done();
        },

        environmentOverrideRootScope : function(test) {
            test.expect(1);

            var settings_testing_override = 'overridden_for_testing';

            process.env['settings_testing'] = settings_testing_override;

            var options = new settings_module.Options(SETTINGS_TEST_FILE);
            var settings = new settings_module.Settings(options);

            test.equal(settings.entries.settings_testing, settings_testing_override);

            process.env['settings_testing'] = null;

            test.done();
        },

        environmentOverrideNestedScope : function(test) {
            test.expect(1);

            var settings_testing_override = 'overridden_for_testing';

            process.env['scoped__setting'] = settings_testing_override;

            var options = new settings_module.Options(SETTINGS_TEST_FILE);
            var settings = new settings_module.Settings(options);

            test.equal(settings.entries.scoped.setting, settings_testing_override);

            process.env['scoped__setting'] = null;

            test.done();
        },

        thirdLevelNestedEnvironmentOverride : function(test) {
            test.expect(1);

            var settings_testing_override = 'overridden_for_testing';

            process.env['scoped__deeper__deepest__third_level'] = settings_testing_override;

            var options = new settings_module.Options(SETTINGS_TEST_FILE);
            var settings = new settings_module.Settings(options);

            test.equal(settings.entries.scoped.deeper.deepest.third_level, settings_testing_override);

            process.env['scoped__deeper__deepest__third_level'] = null;

            test.done();
        }
    }
);