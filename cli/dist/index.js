#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var yargs = require("yargs");
if (require.main === module) {
    // eslint-disable-next-line no-unused-expressions
    yargs
        .commandDir('commands')
        .demandCommand(1)
        .strict()
        .recommendCommands()
        .help()
        .alias('h', 'help')
        .version()
        .alias('v', 'version')
        .argv;
}
