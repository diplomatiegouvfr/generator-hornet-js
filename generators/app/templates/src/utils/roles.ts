"use strict";

/**
 * Classe regroupant les rôles disponibles dans <%= _.slugify(appname) %>
 */
class Roles {
    static USER_STR = "<%= _.slugify(appname) %>_USER";
    static ADMIN_STR = "<%= _.slugify(appname) %>_ADMIN";

    static USER = [Roles.USER_STR];
    static ADMIN = [Roles.ADMIN_STR];

    static EVERYONE = [Roles.USER_STR, Roles.ADMIN_STR];

}

export = Roles;
