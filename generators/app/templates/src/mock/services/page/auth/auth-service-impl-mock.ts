import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";
import { AuthService } from "src/services/data/auth/auth-service";
import { Promise } from "hornet-js-utils/src/promise-api";

const logger: Logger = Logger.getLogger("mock.services.page.auth.auth-service-impl-mock");

/**
 * Liste des utilisateurs en mode bouchon
 * @type {any[]}
 */
const users = [
    {
        "name": "user",
        "roles": [{"id": 2, "name": "<%= slugify(appname) %>_USER"}]
    },
    {
        "name": "admin",
        "roles": [{"id": 1, "name": "<%= slugify(appname) %>_ADMIN"}, {"id": 2, "name": "<%= slugify(appname) %>_USER"}]
    }
];

function findByUsername(username) {
    for (let i = 0, len = users.length; i < len; i++) {
        let user = users[i];
        if (user.name === username) {
            return user;
        }
    }
    return null;
}

/**
 * Implementation des services pour l'authentification
 * @class
 * @implements {AuthService}
 * @extends {ServiceApi}
 */
export class AuthServiceMockImpl extends AuthService {

    /**
     * recherche de l'identité
     * @param {object} data
     */
    auth(data): Promise<any> {
        logger.trace("SERVICES MOCK - auth", data);
        let user = findByUsername(data.login);
        return Promise.resolve(user);
    }
}
