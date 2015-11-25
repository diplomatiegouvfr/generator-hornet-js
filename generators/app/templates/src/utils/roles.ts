///<reference path='../../node_modules/app/hornet-js-ts-typings/definition.d.ts'/>
"use strict";

/**
 * Classe regroupant les rôles disponibles dans l'appli-tuto
 */
class <%= _.slugify(appname) %>Roles {
    static USER_STR = "<%= _.slugify(appname) %>_USER";
    static ADMIN_STR = "<%= _.slugify(appname) %>_ADMIN";

    static USER = [<%= _.slugify(appname) %>Roles.USER_STR];
    static ADMIN = [<%= _.slugify(appname) %>Roles.ADMIN_STR];

    static EVERYONE = [<%= _.slugify(appname) %>Roles.USER_STR, <%= _.slugify(appname) %>Roles.ADMIN_STR];

}

export = <%= _.slugify(appname) %>Roles