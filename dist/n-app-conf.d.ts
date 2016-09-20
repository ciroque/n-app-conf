export declare class Options {
    filename: string;
    constructor(filename: string);
}
export declare class Settings {
    private options;
    private DEFAULT_HIERARCHY_DELIMITER;
    private _entries;
    readonly entries: any;
    constructor(options: Options);
    private applyEnvironmentOverrides(settings, previousScope?);
    private buildSettings();
    private processKey(key, settings, previousScope);
}
