"use strict";
var fs = require("fs");
var extend = require("extend");
var util_1 = require("util");
var Options = (function () {
    function Options(filename) {
        this.filename = filename;
    }
    return Options;
}());
exports.Options = Options;
var Settings = (function () {
    function Settings(options) {
        this.options = options;
        this.DEFAULT_HIERARCHY_DELIMITER = '__';
        this._entries = {};
        this.buildSettings();
        this.applyEnvironmentOverrides(this._entries);
    }
    Object.defineProperty(Settings.prototype, "entries", {
        get: function () {
            return this._entries;
        },
        enumerable: true,
        configurable: true
    });
    Settings.prototype.applyEnvironmentOverrides = function (settings, previousScope) {
        var _this = this;
        if (previousScope === void 0) { previousScope = null; }
        Object.keys(settings).forEach(function (key) {
            var value = settings[key];
            if (typeof (value) === 'object') {
                var scope = previousScope === null ? key : "" + previousScope + _this.DEFAULT_HIERARCHY_DELIMITER + key;
                _this.applyEnvironmentOverrides(value, scope);
            }
            else {
                _this.processKey(key, settings, previousScope);
            }
        });
    };
    Settings.prototype.buildSettings = function () {
        var fileContent = fs.readFileSync(this.options.filename, "UTF8");
        extend(true, this._entries, JSON.parse(fileContent));
    };
    Settings.prototype.processKey = function (key, settings, previousScope) {
        var envKey = previousScope === null ? key : "" + previousScope + this.DEFAULT_HIERARCHY_DELIMITER + key;
        var envVal = process.env[envKey];
        if (!util_1.isNullOrUndefined(envVal)) {
            settings[key] = envVal;
        }
        else {
            settings[key] = settings[key];
        }
    };
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=n-app-conf.js.map