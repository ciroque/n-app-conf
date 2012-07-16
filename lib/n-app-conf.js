/**
 * User: steve
 * Date: 7/13/12
 * Time: 1:24 PM
 */

var filesystem_module = require('fs');
var node_extend = require('node.extend');

var ERROR_INVALID_CTOR_PARAMETER = 'A filename parameter or options object needs to be provided.';

var DEFAULT_HIERARCHY_DELIMITER = '__';

function applyEnvironmentOverrides(settings, previous_scope) {
    Object.keys(settings).forEach(
        function(key) {

            if(typeof(settings[key]) == 'object') {
                var scope = previous_scope == null ? key : previous_scope + DEFAULT_HIERARCHY_DELIMITER + key;
                applyEnvironmentOverrides(settings[key], scope);

            } else {
                processKey(key, settings, previous_scope);

            }
        }
    );
}

function processKey(key, settings, previous_scope) {

    var env_key = previous_scope == null ? key : previous_scope + DEFAULT_HIERARCHY_DELIMITER + key;

    var env_val = process.env[env_key];
    if(env_val != null) {
        settings[key] = env_val;
    }
}

function buildSettings(options, settings) {
    if(options == null) {
        throw ERROR_INVALID_CTOR_PARAMETER;
    }

    if(typeof(options) == 'string') {
        this.filename = arguments[0];

    } else if(typeof(options) == 'object') {
        this.filename = options.filename;

    } else {
        throw ERROR_INVALID_CTOR_PARAMETER;
    }

    var file_content = filesystem_module.readFileSync(this.filename, 'UTF8');

    node_extend(true, settings, JSON.parse(file_content));
}

function Settings(options) {
    buildSettings(options, this);
    applyEnvironmentOverrides(this);
    return this;
}

module.exports = {
    Settings : Settings
};