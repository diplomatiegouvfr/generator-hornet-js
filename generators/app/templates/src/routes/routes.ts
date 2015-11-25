///<reference path="../../node_modules/app/hornet-js-ts-typings/definition.d.ts"/>
"use strict";
import routerInterfaces = require("hornet-js-core/src/routes/router-interfaces");
import utils = require("hornet-js-utils");
import Roles = require("src/utils/roles");

var WError = utils.werror;
var logger = utils.getLogger("<%= _.slugify(appname) %>.routes.routes");

class Routes implements routerInterfaces.IRoutesBuilder {

    buildViewRoutes(match:routerInterfaces.MatchFn) {

        logger.info("Initialisation des routes");

        match.lazy("/contact", "gen/gen-cnt-routes");

        match("/", () => {
            logger.info("match route / src/views/gen/gen-home-page");
            return {
                composant: require("src/views/gen/gen-hom-page")
            }
        });

        match("/accueil", () => {
            logger.info("match route /accueil src/views/gen/gen-home-page");
            return {
                composant: require("src/views/gen/gen-hom-page"),
                //roles: Roles.USER
            };
        });

        match("/aide", () => {
            logger.info("match route /aide src/views/gen/gen-aide-page");
            return {
                composant: require("src/views/gen/gen-aid-page"),
                //roles: Roles.EVERYONE
            }
        });

        match("/planAppli", () => {
            logger.info("match route /planAppli src/views/nav/nav-pap-page");
            return {
                composant: require("src/views/nav/nav-pap-page"),
                //roles: Roles.EVERYONE
            };
        });

        match("/politiqueAccessibilite", () => {
            logger.info("match route /politiqueAccessibilite src/views/gen/gen-acb-page");
            return {
                composant: require("src/views/gen/gen-acb-page"),
                //roles: Roles.EVERYONE
            };
        });

        match("/declarationConformite", () => {
            logger.info("match route /declarationConformite src/views/gen/gen-ddc-page");
            return {
                composant: require("src/views/gen/gen-ddc-page")
            };
        });
    }

    buildDataRoutes(match:routerInterfaces.MatchFn) {
        logger.info("Initialisation des data-routes");
        match.lazy("/contact", "gen/gen-cnt-routes");
    }
}
export = Routes;