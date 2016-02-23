"use strict";

import GenericDispatcher = require("hornet-js-core/src/dispatcher/generic-dispatcher");

import ContactStore = require("src/stores/cnt/gen-cnt-store");
import NavigationBaseStore = require("hornet-js-components/src/navigation/store/navigation-base-store");
import TableStore = require("hornet-js-components/src/table/store/table-store");

class AppDispatcher extends GenericDispatcher {

    constructor(componentActionErrorHandler?:Function) {
        var dispatcherConf = undefined;
        if (componentActionErrorHandler) {
            dispatcherConf = {
                componentActionHandler: componentActionErrorHandler
            };
        }
        super(dispatcherConf);

        this.dispatcher.registerStore(ContactStore);
        this.dispatcher.registerStore(NavigationBaseStore);
        this.dispatcher.registerStore(TableStore);
    }
}

export = AppDispatcher;