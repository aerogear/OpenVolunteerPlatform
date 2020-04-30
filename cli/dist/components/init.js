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
var figlet = require("figlet");
var inquirer_1 = require("inquirer");
var starterTemplates_1 = require("../init/starterTemplates");
var utils_1 = require("../utils");
/**
 * Check if directory exists
 * @param path path of the directory
 * @param name name of the project folder
 */
function checkDirectory(path, name) {
    try {
        fs_1.accessSync(path);
        utils_1.logError("A folder with name " + name + " exists. Remove it or try another name.");
        process.exit(0);
    }
    catch (error) {
        return;
    }
}
/**
 * choose a template from available templates
 */
function chooseTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var templateName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utils_1.logInfo("init can create your app from following templates:\n  " + starterTemplates_1.allTemplates.map(function (template) {
                        return "\n" + chalk_1["default"].green(template.name) + ": \n" + template.description;
                    }).join("\n") + "\n  ");
                    return [4 /*yield*/, inquirer_1.prompt([
                            {
                                type: 'list',
                                name: 'templateName',
                                message: 'Choose a template to bootstrap',
                                choices: starterTemplates_1.allTemplates.map(function (t) { return t.name; })
                            }
                        ])];
                case 1:
                    templateName = (_a.sent()).templateName;
                    return [2 /*return*/, starterTemplates_1.allTemplates.find(function (t) { return t.name === templateName; })];
            }
        });
    });
}
/**
 * check if template name is valid or not
 * @param templateName name of the template provided
 */
function checkTemplateName(templateName) {
    var availableTemplates = starterTemplates_1.allTemplates.map(function (t) { return t.name; });
    if (availableTemplates.includes(templateName)) {
        return;
    }
    utils_1.logError("Template with given name doesn't exist. Give one of available ones or simply choose by not providing a template name");
    process.exit(0);
}
/**
 * assign template details from the given input or choice
 * @param templateName name of the template provided(if any)
 */
function assignTemplate(templateName) {
    return __awaiter(this, void 0, void 0, function () {
        var template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!templateName) return [3 /*break*/, 1];
                    checkTemplateName(templateName);
                    template = starterTemplates_1.allTemplates.find(function (t) { return t.name === templateName; });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, chooseTemplate()];
                case 2:
                    template = _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, template];
            }
        });
    });
}
function postSetupMessage(name) {
    return "\nYour application successfully bootstrapped :rocket:\n\nNext Steps:\n1. Change directory into project folder - " + chalk_1["default"].cyan("cd " + name) + "\n2. Review project README\n";
}
/**
 * Build template from user provided url
 */
function buildTemplateFromGithub(templateUrl) {
    var url = templateUrl.split("#");
    return {
        name: "Users Github template",
        description: "User provided template",
        repo: {
            uri: url[0],
            branch: url[1] || "master",
            path: "/"
        }
    };
}
/**
 * init command handler
 * @param name name of project folder
 * @param templateName name of the template provided(if any)
 * @param templateUrl github url to the template
 */
function init(name, templateName, templateUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var path, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utils_1.logInfo(chalk_1["default"].yellow(figlet.textSync('Open Volunteer', { horizontalLayout: 'full' })));
                    path = process.cwd() + "/" + name;
                    checkDirectory(path, name);
                    if (!templateUrl) return [3 /*break*/, 1];
                    template = buildTemplateFromGithub(templateUrl);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, assignTemplate(templateName)];
                case 2:
                    template = _a.sent();
                    _a.label = 3;
                case 3:
                    fs_1.mkdirSync(path);
                    utils_1.logInfo("\nBootstraping graphql server :dizzy: :sparkles:");
                    return [4 /*yield*/, starterTemplates_1.extractTemplate(template, name)];
                case 4:
                    _a.sent();
                    process.chdir(name);
                    utils_1.logInfo(postSetupMessage(name));
                    return [2 /*return*/];
            }
        });
    });
}
exports.init = init;
