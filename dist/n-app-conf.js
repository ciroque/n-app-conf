"use strict";
const fs = require("fs");
const extend = require("extend");
const util_1 = require("util");
class Options {
    constructor(filename) {
        this.filename = filename;
    }
}
exports.Options = Options;
class Settings {
    constructor(options) {
        this.options = options;
        this.DEFAULT_HIERARCHY_DELIMITER = '__';
        this._entries = {};
        this.buildSettings();
        this.applyEnvironmentOverrides(this._entries);
    }
    get entries() {
        return this._entries;
    }
    applyEnvironmentOverrides(settings, previousScope = null) {
        Object.keys(settings).forEach((key) => {
            let value = settings[key];
            if (typeof (value) === 'object') {
                let scope = previousScope === null ? key : `${previousScope}${this.DEFAULT_HIERARCHY_DELIMITER}${key}`;
                this.applyEnvironmentOverrides(value, scope);
            }
            else {
                this.processKey(key, settings, previousScope);
            }
        });
    }
    buildSettings() {
        let fileContent = fs.readFileSync(this.options.filename, "UTF8");
        extend(true, this._entries, JSON.parse(fileContent));
    }
    processKey(key, settings, previousScope) {
        let envKey = previousScope === null ? key : `${previousScope}${this.DEFAULT_HIERARCHY_DELIMITER}${key}`;
        let envVal = process.env[envKey];
        if (!util_1.isNullOrUndefined(envVal)) {
            settings[key] = envVal;
        }
        else {
            settings[key] = settings[key];
        }
    }
}
exports.Settings = Settings;
//# sourceMappingURL=n-app-conf.js.map