import { Utils } from "hornet-js-utils";

import { AuthService } from "src/services/data/auth/auth-service";
import { AuthServiceImpl } from "src/services/data/auth/auth-service-data-impl";

import { Injector } from "hornet-js-core/src/inject/injector";
import { Scope } from "hornet-js-core/src/inject/injectable";

if (Utils.config.getOrDefault("mock.enabled", false) && Utils.config.getOrDefault("mock.serviceData.enabled", false)) {
    Promise.all([
        import("src/mock/services/data/auth/auth-service-data-mock-impl")
    ]).then(([AuthServiceDataMockImpl]) => {
        Injector.register(AuthService, AuthServiceDataMockImpl.AuthServiceDataMockImpl, Scope.SINGLETON);
    });

} else {
    Promise.all([
        import("src/services/data/auth/auth-service-data-impl"),
    ]).then(([AuthServiceImpl]) => {
        Injector.register(AuthService, AuthServiceImpl.AuthServiceImpl, Scope.SINGLETON);
    });
}


