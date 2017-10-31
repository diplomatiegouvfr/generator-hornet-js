import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { URL_UTILISATEURS, URL_UTILISATEURS_AUTH } from "src/utils/urls";
import { HornetRequest } from "hornet-js-core/src/services/hornet-superagent-request";
import { AuthService } from "src/services/data/auth/auth-service";
import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
import { Response } from "superagent";
import * as fs from "fs";
import * as path from "path";

const jwt = require("jsonwebtoken");

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.services.data.auth.auth-service-data-impl");

/**
 * Implementation des services pour l'authentification
 * @class
 * @implements {AuthService}
 * @extends {ServiceApi}
 */
export class AuthServiceImpl extends AuthService {

    /**
     * recherche de l'identité
     * @param {object} data
     */
    auth(data): Promise<any> {
        logger.info("SERVICES - auth", data);

        let request: HornetRequest = {
            url: this.buildUrl(URL_UTILISATEURS + URL_UTILISATEURS_AUTH),
            method: "post",
            data: data
        };

        return this.fetch(request);
    }

    saveToken(response: Response) {

        if (response && response.get && response.get(ServiceSecure.HEADER_AUTH)
            && response.get(ServiceSecure.HEADER_AUTH).slice(0, "Bearer ".length) == "Bearer ") {

            let token: string = response.get(ServiceSecure.HEADER_AUTH).substring("Bearer ".length);

            Utils.getContinuationStorage().get("hornet.request").getSession().authorizationToken = token;
            var cert = fs.readFileSync(path.join(__dirname, "../../../../config/keys/public.pem"));  // get public key
            jwt.verify(token, cert, {algorithms: ["HS256", "RS512"]}, function(err, decoded) {
                logger.info("JWToken : ", decoded);
            });
        }
    }


    getToken() {
        return null;
    }
}
