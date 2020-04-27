"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var ora_1 = require("ora");
var github = require("parse-github-url");
var request = require("request");
var tar = require("tar");
var tmp = require("tmp");
/**
 * available templates
 */
exports.allTemplates = [
    {
        name: 'reference-ts',
        description: 'Reference implementation using Graphback and Ionic React',
        repo: {
            uri: 'https://github.com/aerogear/openvolunteerplatform',
            branch: 'master',
            path: '/platform'
        }
    }
];
/**
 * Get github repository information of template
 * @param template template information provided
 */
function getTemplateRepositoryTarInformation(template) {
    var meta = github(template.repo.uri);
    var uri = [
        "https://api.github.com/repos",
        meta.repo,
        'tarball',
        template.repo.branch,
    ].join('/');
    return { uri: uri, files: template.repo.path };
}
/**
 * download tar file from repository
 * @param tarInfo repository info
 */
function downloadRepository(tarInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var spinner, tmpPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = ora_1["default"]("Downloading starter from " + chalk_1["default"].cyan(tarInfo.uri)).start();
                    tmpPath = tmp.fileSync({
                        postfix: '.tar.gz'
                    });
                    // tslint:disable-next-line: typedef
                    return [4 /*yield*/, new Promise(function (resolve) {
                            request(tarInfo.uri, {
                                headers: {
                                    'User-Agent': 'aerogear/openvp'
                                }
                            })
                                .pipe(fs_1.createWriteStream(tmpPath.name))
                                .on('close', resolve);
                        })];
                case 1:
                    // tslint:disable-next-line: typedef
                    _a.sent();
                    spinner.succeed();
                    return [2 /*return*/, tmpPath.name];
            }
        });
    });
}
/**
 * extract the downloaded file into the output path
 * @param file downloaded file from repo
 * @param repo repository information
 * @param output output path
 */
function extractStarterFromRepository(file, repo, output) {
    return __awaiter(this, void 0, void 0, function () {
        var spinner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = ora_1["default"]("Extracting content to " + chalk_1["default"].cyan(output));
                    return [4 /*yield*/, tar.extract({
                            file: file,
                            cwd: output,
                            filter: function (path) { return RegExp(repo.files).test(path); },
                            strip: repo.files.split('/').length
                        })];
                case 1:
                    _a.sent();
                    spinner.succeed();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * download and extract template from repository into project folder
 * @param template template information
 * @param name name of project folder
 */
function extractTemplate(template, name) {
    return __awaiter(this, void 0, void 0, function () {
        var tarInfo, file, output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tarInfo = getTemplateRepositoryTarInformation(template);
                    return [4 /*yield*/, downloadRepository(tarInfo)];
                case 1:
                    file = _a.sent();
                    output = process.cwd() + "/" + name;
                    return [4 /*yield*/, extractStarterFromRepository(file, tarInfo, output)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.extractTemplate = extractTemplate;
