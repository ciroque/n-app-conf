# n-app-conf
Simple application configuration utility that loads configuration values from a .json-formatted file and allows overrides to be provided via environment variables.

## Overview
In looking around at some of the existing configuration modules they all seem useful and nice, but far too powerful and feature-laden for my needs.
What I was looking for was an implementation that allowed me to store the configuration settings necessary to drive an application in as terse, yet readable and hierarchical format.
Also, the ability to override settings using environment variables so that test runs can be carried out concurrently if so desired, or in the same environment as other running instances.

## Implementation
The selection of JSON for the file format was a no-brainer. JSON meets 100% of the requirements for configuration settings storage. It also lends itself readily to generating in-memory object representations.

From that point, the code to load the settings and apply overrides from the environment is a straight-forward recursive implementation.

## Usage
Simply install the package from npm:

    npm install n-app-conf

, require it in your file:

    var n_app_conf_module = require('n-app-conf');

, new-up an instance providing the path to a settings.json file:

    var settings = new n_app_conf_module.Settings('./path/to/config.file');

, and access your configuration settings as needed.

