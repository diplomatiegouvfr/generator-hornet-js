"use strict";

import N = require("hornet-js-core/src/routes/notifications");

// Polyfill internationalisation
if (!(<any>window).Intl) {
    (<any>require).ensure(["intl"], (require) => {
        (<any>window).Intl = require("intl");
        // locale data should be also included here...
        startClient();
    });
} else {
    startClient();
}
function startClient() {
    // L'import du logger doit être fait le plus tôt possible

    var utils = require("hornet-js-utils");
    var Client = require("hornet-js-core/src/client");

    var logger = utils.getLogger("<%= _.slugify(appname) %>.client");

    var Routes = require("src/routes/routes");
    var AppDispatcher = require("src/dispatcher/app-dispatcher");
    var React = require("react");

    var SimpleAction = require("hornet-js-core/src/actions/simple-action");

    function routeLoader(name:string, callback:any) {
        logger.info("routeLoader(" + name + ")");
        // WEBPACK_AUTO_GENERATE_CLIENT_ROUTE_LOADING

        return null;
    }

    /**
     * Exemple d'implémentation d'une fonction gérant les erreurs pouvant se produire lors de l'exécution d"une action dans une vue
     * @param context
     * @param payload
     * @param done
     */
    function actionErrorHandler(context, payload, done) {
        if (payload.err) {
            logger.error("actionErrorHandler error");
            var textNotif:string = context.formatMsg(context.i18n("error.message.ER-CL-CLI-01"), {
                "error": payload.err.lastError
            });
            var notifs:N.Notifications = N.Notifications.makeSingleNotification("ACTION_ERREUR_" + payload.err.lastError, textNotif);

            new SimpleAction(SimpleAction.EMIT_ERR_NOTIFICATION)
                .withContext(context)
                .withPayload(notifs)
                .promise(<any>{}).then(done, done);
        } else {
            done();
        }
    }

    try {
        (<any>Error).stackTraceLimit = Infinity;

        var HornetApp = require("src/views/hornet-app");
        var HornetAppReact = React.createFactory(HornetApp);
        var ErreurPage = require("src/views/gen/gen-err-page");

        var appDispatcher = new AppDispatcher(actionErrorHandler).getDispatcher();

        var configClient = {
            appComponent: HornetAppReact,
            errorComponent: ErreurPage,
            routesLoaderfn: routeLoader,
            defaultRoutesClass: new Routes(),
            dispatcher: appDispatcher,
            directorClientConfiguration: {
                html5history: true,
                strict: false,
                convert_hash_in_init: false,
                recurse: false,
                notfound: function () {
                    logger.error("Erreur. Cette route n'existe pas :'" + this.path + "'");
                }
            }
        };

        // On supprime le spinner de chargement de l'application
        // Cela ne gêne pas React car il est en dehors de sa div "app"
        var readyCallback = function () {
            var appLoading = document.getElementById("firstLoadingSpinner");
            if (appLoading) {
                appLoading.parentNode.removeChild(appLoading);
            }
        };

        Client.initAndStart(configClient, readyCallback).fail((err) => {
            logger.error("Erreur lors du chargement de l'appli côté client (initAndStart)", err);
        });
    } catch (exc) {
        logger.error("Erreur lors du chargement de l'appli côté client (Exception)", exc);
    }
}