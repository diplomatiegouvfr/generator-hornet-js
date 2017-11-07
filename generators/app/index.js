"use strict";
var fs = require("fs");
var path = require("path");
var Generator = require('yeoman-generator');
var crypto = require("crypto");
var slugify = require("slugify");
var isstring = require("lodash.isstring");
var yosay = require("yosay");

module.exports = Generator.extend({
    constructor: function () {
        Generator.apply(this, arguments);
        this.log(yosay("starting"));

        var pkg = require("../../package.json");
        this.fmkversion = pkg.version;

        this.argument("appname", {type: String, required: false});
        this.argument("appversion", {type: String, required: false});
        this.argument("appdescription", {type: String, required: false});
        this.argument("fmkversion", {type: String, required: false});
        this.argument("theme", {type: String, required: false});
        this.argument("themeversion", {type: String, required: false});
        this.argument("urlservice", {type: String, required: false});
        this.argument("hostservice", {type: String, required: false});
        this.argument("fullspa", {type: Boolean, required: false});
    },
    prompting: function () {

        var pkg = require("../../package.json"),
            prompts = [],
            defaultAppName = path.basename(process.cwd());

        var prompts = [];
        var _this = this;

        prompts.push({
            when: function () { // si le nom n'est pas fourni en paramètre de la commande
                return !_this.options.appname;
            },
            type: "input",
            name: "appname",
            message: "Nom de votre projet",
            default: this.appname || defaultAppName // Par défaut le nom du dossier
        });
        prompts.push({
            when: function () {
                return !_this.options.appversion;
            },
            type: "input",
            name: "appversion",
            message: "Version de votre projet",
            default: "1.0.0"
        });
        prompts.push({
            when: function () {
                return !_this.options.appdescription;
            },
            type: "input",
            name: "appdescription",
            message: "Description de votre projet",
            default: this.appdescription || defaultAppName
        });
        prompts.push({
            when: function () {
                return !_this.options.fmkversion;
            },
            type: "input",
            name: "fmkversion",
            message: "Version du framework (hornet-js)",
            default: pkg.version
        });
        prompts.push({
            when: function () {
                return !_this.options.theme;
            },
            type: "input",
            name: "theme",
            message: "Theme de l'application",
            default: "hornet-themes"
        });
        prompts.push({
            when: function () {
                return !_this.options.themeversion;
            },
            type: "input",
            name: "themeversion",
            message: "Version du theme de l'application",
            default: pkg.version
        });
        prompts.push({
            when: function () {
                return !_this.options.hostservice;
            },
            type: "input",
            name: "hostservice",
            message: "Host de la partie service",
            default: "http://localhost:8080"
        });
        prompts.push({
            when: function () {
                return !_this.options.urlservice;
            },
            type: "input",
            name: "urlservice",
            message: "ContextPath de la partie service",
            default: this.appname + "-services"
        });
        prompts.push({
            when: function () {
                return !_this.options.fullspa;
            },
            type: "input",
            name: "fullspa",
            message: "Mode full spa",
            default: false
        });

        return this.prompt(prompts).then( function(answers) {

            if (!this.options.appname) {
                this._applyParam(answers, "appname", "appname");
            }else{
                this._applyOptions("appname", this.options.appname);
            }
            if (!this.options.appversion) {
                this._applyParam(answers, "appversion", "appversion");
            }else{
                this._applyOptions("appversion", this.options.appversion);
            }
            if (!this.options.appdescription) {
                this._applyParam(answers, "appdescription", "appdescription");
            }else{
                this._applyOptions("appdescription", this.options.appdescription);
            }
            if (!this.options.fmkversion) {
                this._applyParam(answers, "fmkversion", "fmkversion");
            }else{
                this._applyOptions("fmkversion", this.options.fmkversion);
            }
            if (!this.options.theme) {
                this._applyParam(answers, "theme", "theme");
            }else{
                this._applyOptions("theme", this.options.theme);
            }
            if (!this.options.themeversion) {
                this._applyParam(answers, "themeversion", "themeversion");
            }else{
                this._applyOptions("themeversion", this.options.themeversion);
            }
            if (!this.options.hostservice) {
                this._applyParam(answers, "hostservice", "hostservice");
            }else{
                this._applyOptions("hostservice", this.options.hostservice);
            }
            if (!this.options.urlservice) {
                this._applyParam(answers, "urlservice", "urlservice");
            }else{
                this._applyOptions("urlservice", this.options.urlservice);
            }
            if (!this.options.fullspa) {
                this._applyParam(answers, "fullspa", "fullspa");
            }else{
                this._applyOptions("fullspa", this.options.fullspa);
            }
        }.bind(this));
    },
    writing: function () {
        var defaultConfig = {
            slugify: slugify,
            appname: this.appname,
            appversion: this.appversion,
            appdescription: this.appdescription,
            fmkversion: this.fmkversion,
            theme: this.theme,
            themeversion: this.themeversion,
            hostservice: this.hostservice,
            urlservice: this.urlservice,
            fullspa: this.fullspa
        };

        //builder.js
        this._copy("builder.js", defaultConfig);

        //index.ts
        this._copy("index.ts");

        // package.json
        this._copy("_package.json", "package.json", defaultConfig);

        // config/*
        this._writingConfig(defaultConfig);

        // public
        // Attention, ne pas copier l"image unitairement, sinon le proccessing va la corrompre
        //this._copyDir("static/img/");
        this._writingStatic(defaultConfig);

        // src
        this._writingSrc(defaultConfig);
    },
    _writingConfig: function (defaultConfig) {
        // config
        this._copy("config/**", "config/", defaultConfig);

        this._copy("tsconfig.json", "tsconfig.json", defaultConfig);

        // config/navigation.json
        this._copy("src/resources/**", "src/resources/", defaultConfig);

    },
    _writingStatic: function (defaultConfig) {
        this._copySingle("static/css/**", "static/css/");
        this._copySingle("static/img/**", "static/img/");
    },
    _writingSrc: function (defaultConfig) {

        // actions
        //this._copy("src/actions/cnt/gen-cnt-actions.ts", defaultConfig);
        this._copy("src/actions/**", "src/actions/", defaultConfig);

        // middleware
        this._copy("src/middleware/**", "src/middleware/", defaultConfig);

        // mock
        this._copy("src/mock/**", "src/mock/", defaultConfig);

        // routes
        this._copy("src/routes/**", "src/routes/", defaultConfig);

        // services
        this._copy("src/services/**", "src/services/", defaultConfig);

        // utils
        this._copy("src/utils/**", "src/utils/", defaultConfig);

        // views
        this._copy("src/views/**", "src/views/", defaultConfig);

        // client/server/injector
        this._copy("src/client.ts", defaultConfig);
        this._copy("src/server.ts", defaultConfig);
        this._copy("src/injector-context.ts", defaultConfig);

        // npmignore
        this._copy(".npmignore");

        //README.md
        this._copy("README.md", defaultConfig);

        //index
        this._copy("static/index.html", defaultConfig);

        //config spa
        this._copy("static/config-spa.json", defaultConfig);
    },

    _applyParam: function (answers, key, destkey) {
        var useDestKey = destkey || key;
        var answer = answers[key];
        if (!answer) {
            this.log(yosay("Aucune valeur pour : " + key));
        }
        this[useDestKey] = answer;
        this.config.set(useDestKey, answer);
    },
    _applyOptions: function (key, value) {
        this[key] = value;
        this.config.set(key, value);
    },
    /*
     _copyDir: function (path) {
     this.directory(path);
     },*/
    _copy: function (fromPath, toPath, config) {
        var copyFrom = fromPath, copyTo = toPath, conf = config;
        if (arguments.length === 1) {
            copyTo = copyFrom;
            conf = {};
        } else if (arguments.length === 2 && !isstring(config)) {
            copyTo = copyFrom;
            conf = toPath;
        }

        this.fs.copyTpl(
            this.templatePath(copyFrom),
            this.destinationPath(copyTo),
            conf
        );
    },
    _copySingle: function (fromPath, toPath) {
        var copyFrom = fromPath, copyTo = toPath;
        if (arguments.length === 1) {
            copyTo = copyFrom;
        }
        this.fs.copy(
            this.templatePath(copyFrom),
            this.destinationPath(copyTo)
        );
    },

    _random: function (length) {
        return crypto.randomBytes(length || 48).toString("hex");
    },

    install: function () {
        this.installDependencies();
    }
});
