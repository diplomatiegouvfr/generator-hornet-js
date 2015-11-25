'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var crypto = require('crypto');
var _ = require('underscore.string');
var lodash = require('lodash');


module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);
        this.log("starting");

        var pkg = require('../../package.json');
        this.fmkversion = pkg.version;
        this.mode = "isomorphic";
        this.argument("appname", {type: String, required: false});
    },
    prompting: function () {
        var pkg = require('../../package.json'),
            prompts = [],
            defaultAppName = path.basename(process.cwd());

        var prompts = [];
        if (!this.appname) {
            prompts.push({
                when: function () { // si le nom n'est pas fourni en paramètre de la commande
                    return !this.appname;
                },
                type: "input",
                name: "appname",
                message: "Nom de votre projet",
                default: this.appname || defaultAppName // Par défaut le nom du dossier
            });
        }
        prompts.push({
            type: "input",
            name: "apptitle",
            message: "Titre de l'application"
        });
        prompts.push({
            type: "input",
            name: "description",
            message: "Description de votre projet"
        });
        prompts.push({
            type: "input",
            name: "version",
            message: "Version de votre projet",
            default: "1.0.0"
        });
        prompts.push({
            type: "input",
            name: "fmkversion",
            message: "Version du framework (hornet-js)",
            default: pkg.version
        });
        /*
         prompts.push({
         type: "list",
         name: "mode",
         message: "Mode applicatif",
         choices: ["isomorphic", "fullSPA"],
         default: "isomorphic"
         });
         */
        prompts.push({
            type: "input",
            name: "themeurl",
            message: "Url du thème",
            default: "http://localhost:7777/5.0.0/default"
        });
        // Services
        prompts.push({
            type: "input",
            name: "servicesurl",
            message: "URL de base des services de l'application",
            default: "http://localhost:8080"
        });
        prompts.push({
            type: "input",
            name: "servicesname",
            message: "Nom/contexte des services de l'application",
            default: "mock"
        });
        prompts.push({
            type: "input",
            name: "servicesversion",
            message: "Version des services de l'application",
            default: function (answers) {
                return answers.version;
            }
        });

        var done = this.async();
        this.prompt(prompts, function (answers) {
            if (!this.appname) {
                this._applyParam(answers, 'appname', 'appname');
            }
            this._applyParam(answers, 'version', 'appversion');
            this._applyParam(answers, 'fmkversion', 'fmkversion');
            this._applyParam(answers, 'description', 'appdescription');
            this._applyParam(answers, 'apptitle', 'apptitle');
            this._applyParam(answers, 'mode', 'mode');

            // Thème
            this._applyParam(answers, 'themeurl');

            // Détermination du themeHost
            var tmpHost = answers.themeurl.split('/');
            var themeHost = tmpHost[0] + '//' + tmpHost[2];
            this.config.set("themeHost", themeHost);
            this["themeHost"] = themeHost;

           this.log(this.themeHost);

            // Services
            this._applyParam(answers, 'servicesurl');
            this._applyParam(answers, 'servicesname');
            this._applyParam(answers, 'servicesversion');

            done();
        }.bind(this));
    },
    writing: function () {
        //builder.js
        this._copy('builder.js');

        //index.ts
        this._copy('index.ts');

        // package.json
        this._copy('_package.json', 'package.json', {
                _: _,
                appname: this.appname,
                appversion: this.appversion,
                appdescription: this.appdescription,
                fmkversion: this.fmkversion
            }
        );
        // config/*
        this._writingConfig();
        // public
        // Attention, ne pas copier l'image unitairement, sinon le proccessing va la corrompre
        this._copyDir('static/img/');

        if (this.mode === "fullSPA") {
            this._copy('static/index.html', 'static/index.html', {
                _: _,
                themeurl: this.themeurl,
                appname: this.appname,
                appversion: this.appversion
            });
            this._copy('static/config-spa.json', 'static/config-spa.json', {
                _: _,
                themeurl: this.themeurl,
                appname: this.appname,
                appversion: this.appversion
            });
        }

        // scr
        this._writingSrc();
    },
    _writingConfig: function () {
        // config/default.json
        this._copy('config/default.json', 'config/default.json', {
                _: _,
                appname: this.appname,
                appversion: this.appversion,
                themeurl: this.themeurl,
                servicesurl: this.servicesurl,
                servicesversion: this.servicesversion,
                servicesname: this.servicesname,
                sessionsecret1: this._random(),
                sessionsecret2: this._random(),
                mode: (this.mode === "fullSPA"),
                themeHost: this.themeHost
            }
        );
        // config/navigation.json
        this._copy('src/resources/navigation.json', 'src/resources/navigation.json', {
                _: _,
                appname: this.appname,
                appversion: this.appversion
            }
        );
    },
    _writingSrc: function () {
        var defaultConfig = {
            _: _,
            appname: this.appname,
            apptitle: this.apptitle
        };

        // actions
        this._copy('src/actions/gen/gen-cnt-actions.ts', defaultConfig);

        // dispatcher
        this._copy('src/dispatcher/app-dispatcher.ts', defaultConfig);

        // i18n
        this._copy('src/i18n/app-i18n-loader.ts', defaultConfig);
        this._copy('src/resources/messages.json', defaultConfig);
        this._copy('src/resources/messages-fr-FR.json', defaultConfig);

        // routes
        this._copy('src/routes/routes.ts', defaultConfig);
        this._copy('src/routes/gen/gen-cnt-routes.ts', defaultConfig);

        // services
        this._copy('src/services/gen/gen-cnt-api.ts', defaultConfig);

        // stores
        this._copy('src/stores/gen/gen-cnt-store.ts', defaultConfig);

        // utils
        this._copy('src/utils/roles.ts', defaultConfig);

        // views
        this._copy('src/views/gen/gen-cnt-form.ts', defaultConfig);
        this._copy('src/views/gen/gen-cnt-page.tsx', defaultConfig);

        this._copy('src/views/layouts/hornet-layout.jsx', defaultConfig);

        this._copy('src/views/nav/nav-pap-page.jsx', defaultConfig);

        this._copy('src/views/gen/gen-acb-page.jsx', defaultConfig);
        this._copy('src/views/gen/gen-aid-page.jsx', defaultConfig);
        this._copy('src/views/gen/gen-err-page.jsx', defaultConfig);
        this._copy('src/views/gen/gen-hea-cmp.jsx', defaultConfig);
        this._copy('src/views/gen/gen-acs-cmp.jsx', defaultConfig);
        this._copy('src/views/gen/gen-hom-page.tsx', defaultConfig);
        this._copy('src/views/gen/gen-ddc-page.jsx', defaultConfig);
        this._copy('src/views/gen/gen-foo-cmp.jsx', defaultConfig);
        this._copy('src/views/gen/gen-cnt-cmp.jsx', defaultConfig);
        this._copy('src/views/gen/theme/gen-ter-cmp.jsx', defaultConfig);

        this._copy('static/css/theme.css', defaultConfig);

        this._copy('src/views/hornet-app.jsx', defaultConfig);

        // client/server
        this._copy('src/client.ts', defaultConfig);
        this._copy('src/server.ts', defaultConfig);

        // bouchons
        this._copy('src/mock/routes.ts', defaultConfig);
        this._copy('src/mock/data/example.json', defaultConfig);

        // npmignore
        this._copy('.npmignore');

        //README.md
        this._copy('README.md', {
            _: _,
            themeurl: this.themeurl,
            themeHost: this.themeHost,
            appname: this.appname,
            appversion: this.appversion,
            apptitle: this.apptitle
        });
    },

    _applyParam: function (answers, key, destkey) {
        var useDestKey = destkey || key;
        var answer = answers[key];
        if (!answer) {
            this.log('Aucune valeur pour : ' + key);
        }
        this[useDestKey] = answer;
        this.config.set(useDestKey, answer);
    },
    _copyDir: function (path) {
        this.directory(path);
    },
    _copy: function (fromPath, toPath, config) {
        var copyForm = fromPath, copyTo = toPath, conf = config;
        if (arguments.length === 1) {
            copyTo = copyForm;
            conf = {};
        } else if (arguments.length === 2 && !lodash.isString(config)) {
            copyTo = copyForm;
            conf = toPath;
        }

        this.fs.copyTpl(
            this.templatePath(copyForm),
            this.destinationPath(copyTo),
            conf
        );
    },
    _random: function (length) {
        return crypto.randomBytes(length || 48).toString('hex');
    }
});
