///<reference path='../../node_modules/app/hornet-js-ts-typings/definition.d.ts'/>
"use strict";
import utils = require('hornet-js-utils');

var logger = utils.getLogger('<%= _.slugify(appname) %>/routes-mock');

var example = require('./data/example');

class BouchonRoutes {

    static build(router) {
        //DEFINR LES ROUTES A BOUCHONNER

        // Exemple
        router.get('/example', function () {
            this.res.send(example);
        });
    }
}
export = BouchonRoutes;
