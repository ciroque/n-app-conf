import * as fs from "fs";
import extend = require("extend");
import {isNullOrUndefined} from "util";


export class Options {
    constructor(public filename: string) {}
}

export class Settings {

    private DEFAULT_HIERARCHY_DELIMITER: string = '__';
    private _entries: any = {};

    get entries(): any {
        return this._entries;
    }

    constructor(private options: Options) {
        this.buildSettings();
        this.applyEnvironmentOverrides(this._entries);
    }

    private applyEnvironmentOverrides(settings: any, previousScope: string = null): void {
        Object.keys(settings).forEach((key: string) => {
            let value = settings[key];
            if(typeof(value) === 'object') {
                let scope = previousScope === null ? key : `${previousScope}${this.DEFAULT_HIERARCHY_DELIMITER}${key}`;
                this.applyEnvironmentOverrides(value, scope);
            } else {
                this.processKey(key, settings, previousScope);
            }
        });
    }

    private buildSettings(): void {
        let fileContent = fs.readFileSync(this.options.filename, "UTF8");
        extend(true, this._entries, JSON.parse(fileContent));
    }

    private processKey(key: string, settings: any, previousScope: string): void {
        let envKey = previousScope === null ? key : `${previousScope}${this.DEFAULT_HIERARCHY_DELIMITER}${key}`;
        let envVal = process.env[envKey];
        if(!isNullOrUndefined(envVal)) {
            settings[key] = envVal;
        } else {
            settings[key] = settings[key];
        }
    }
}