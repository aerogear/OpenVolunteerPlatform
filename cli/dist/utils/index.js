"use strict";
exports.__esModule = true;
var chalk = require("chalk");
var emoji = require("node-emoji");
//tslint:disable-next-line: no-console
exports.log = console.log;
exports.logError = function (s) { return exports.log(emoji.emojify(chalk["default"].bold.red(s))); };
exports.logInfo = function (s) { return exports.log(emoji.emojify(chalk["default"].bold(s))); };
exports.logDetail = function (s) { return exports.log(emoji.emojify(chalk["default"].dim(s))); };
