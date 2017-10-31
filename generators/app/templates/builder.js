var path = require("path");
module.exports = {
    type: "application",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, project, conf, helper) {
        //Add task if needed
        gulp.beforeTask("compile", function () {
            helper.info("Exemple before compile task");
        });

        gulp.afterTask("compile", function () {
            helper.info("Exemple after compile task");
        });


        // Cas PARTICULIER de l'application tuto pour pouvoir la générer en mode SPA et ISOMORPHIC sur la PIC
        // => on force la tâche prepare-package:spa tout le temps
        // si mode fullSpa : on redéfini les tâches 'watch' & 'watch-prod' pour y inclure la tâche "prepare-package-spa"
        //gulp.task("watch", ["compile", "prepare-package:spa", "watch:client", "watch:lint"]);
        //gulp.task("watch-prod", ["compile", "prepare-package:spa", "watch:client-prod", "watch:lint"]);
        gulp.addTaskDependency("package-zip-static", "prepare-package:spa");
        // conf.template.messages = require("applitutoriel-js-common/src/resources/messages.json")

    },
    externalModules: {
        enabled: false,
        directories: [
        ]
    },
    config : {
        routesDirs: [
            "." + path.sep + "routes"],
        clientExclude: {
            dirs: [
                path.join("src","services","data"),
                "nodemailer",
                "src/middleware"],
            filters: [
                path.join("src","services","data")+"/.*-data-\.*",
                ".*/src/actions/.*",
                "^config/*"
            ],
            modules: [
                "config",
                "continuation-local-storage",
                "nodemailer"
            ]
        },
        clientContext: [
            [/moment[\/\\]locale$/, /fr|en/],
            [/intl[\/\\]locale-data[\/\\]jsonp$/, /fr|en/],
            [/.appender/, /console/]
        ],
        typescript: { //bin: "~/Dev/node-v4.5.0-linux-x64/lib/node_modules/typescript"
        },
        dev: {
            dllEntry: {vendor: ["ajv", "react-dom", "react", "bluebird", "moment", "intl", "moment-timezone", "lodash"]}
        }
    }
}