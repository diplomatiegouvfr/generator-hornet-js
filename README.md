# generator-hornet-js

Le module Node « generator-hornet-js » contient les éléments de création d'une application Hornet JS. Il est basé sur la librairie `Yeoman`.

## Pré-requis

* NodeJS 6.x.x LTS 
* hornet-js-builder 1.x.x (le builder) installé globalement avec la commande `npm install -g hornet-js-build`

## Yeoman

[Yeoman](http://yeoman.io/) est un générateur d'application utilisé pour mettre en place l'architecture de base d'un projet suivant une recette pré-établie, un template.

## Installation de Yeoman

Installer Yeoman avec la ligne de commande `npm install -g yo`

Installer le template d'application Hornet avec la commande `npm install -g generator-hornet-js`

## Initialisation d'un projet Hornet avec Yeoman

Tout d'abord, il faut créer un dossier pour accueillir votre nouveau projet et s'y placer. 

```shell
mkdir nom_de_l_application && nom_de_l_application
```

Dans le répertoire destiné à accueillir le code de l'application, exécuter la ligne de commande suivante pour débuter la génération d'un nouveau projet basé sur `hornet.js` :

```shell
yo hornet-js
```

L'écran suivant doit apparaître, vous devrez a ce moment rentrer les détails de votre application.

```
Make sure you are in the directory you want to scaffold into.
This generator can also be run with: yo hornet-js


     _-----_     
    |       |    
    |--(o)--|    ╭──────────────────────────╮
   `---------´   │         starting         │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 
 
 ? Nom de votre projet (dossier_courant) 
```


Le générateur demande plusieurs informations nécessaires à l'initialisation de votre projet Hornet JS :

* `Nom de votre projet: (nom_de_l_application) ` : par défaut, le nom du répertoire courant est suggéré comme nom technique du projet
* `Version de votre projet:` `(1.0.0)` : version du projet (`1.0.0` par défaut). **Ajouter -rc.X  ou X numéro de la version  d'hornetJS. [Ex: 1.0.0-rc.2]**
* `Description de votre projet ` : un texte court présentant succintement le projet.
* `Version du framework (hornet-js):` `(5.x.x)` : version du framework hornet-js.
* `Thème de l'application` : hornet-themes par défaut 
* `Version du thème de l'application` `(5.x.x)`: par défaut la version de la dernière release
* `Host de la partie service` : URL où sont accessibles les services (partie Java Tomcat) de votre application ( par défaut : localhost:8080)
* `ContextPath de la partie service` : nom de l'application fournissant les services (partie Java Tomcat) de votre application.
* `Mode full spa`: si l'application est en mode full spa ou non: `true` pour oui, `false` pour non (`false` par defaut)

Pour un projet fonctionnel avec hornet-js:

* ` Version de votre projet:` `(1.0.0)` :  1.0.0
* ` Version du framework (hornet-js):` : 5.1.0
* ` Version du thème de l'application` : 5.1.0

Le processus d'initialisation vous indique ensuite les fichiers créés :

```
   create package.json
   create builder.js
   create index.ts
   create config/default.json
   create config/keys/public.txt
   create config/log4js.json
   create tsconfig.json
   create src/resources/messages-fr-FR.json
   create src/resources/messages.json
   create src/resources/navigation.json
   create static/css/auth.css
   create static/css/theme.css
   create static/img/error.gif
   create static/img/fond_connexion.jpg
   create static/img/icon_error.png
   create static/img/key-point_bl.gif
   create static/img/key-point_br.gif
   create static/img/key-point_tl.gif
   create static/img/key-point_tr.gif
   create static/img/logoHornet.png
   create src/actions/cnt/gen-cnt-actions.ts
   create src/i18n/app-i18n-loader.ts
   create src/middleware/authentication-api.ts
   create src/middleware/authentication.ts
   create src/middleware/theme-switcher.ts
   create src/mock/routes.ts
   create src/mock/services/data/auth/auth-service-impl-mock.ts
   create src/mock/services/page/auth/auth-service-impl-mock.ts
   create src/routes/cnt/gen-cnt-routes.ts
   create src/routes/routes.ts
   create src/services/data/auth/auth-service-data-impl.ts
   create src/services/data/auth/auth-service.ts
   create src/services/data/cnt/contact-service-data-impl.ts
   create src/services/page/auth/auth-service-page-impl.ts
   create src/services/page/auth/auth-service-page.ts
   create src/services/page/cnt/contact-service-page-impl.ts
   create src/services/page/cnt/contact-service-page.ts
   create src/utils/roles.ts
   create src/utils/urls.ts
   create src/views/cnt/gen-cnt-page-validation.json
   create src/views/cnt/gen-cnt-page.tsx
   create src/views/gen/gen-acb-page.tsx
   create src/views/gen/gen-acs-cmp.tsx
   create src/views/gen/gen-aid-page.tsx
   create src/views/gen/gen-cnx-page.tsx
   create src/views/gen/gen-ddc-page.tsx
   create src/views/gen/gen-err-page.tsx
   create src/views/gen/gen-hom-page.tsx
   create src/views/gen/gen-nfe-page.tsx
   create src/views/layouts/hornet-app.tsx
   create src/views/layouts/hornet-layout.tsx
   create src/views/nav/nav-pap-page.tsx
   create src/client.ts
   create src/server.ts
   create src/injector-context.ts
   create .npmignore
   create README.md
   create static/index.html
   create static/config-spa.json

```

## Options avancées

Il est possible de fournir directement le nom du projet à la ligne de commande :

```shell
yo hornet-js nom_de_l_application
```

Dans ce cas, la première question n'est pas posée et la valeur passée en paramètre est utilisée.

## Actions post-génération

### Mode isomorphic (Mode par défaut)

#### Récupération des dépendances

Une fois le projet initialisé, vous devez lancer l'installation des dépendances Node.js avec la commande suivante :

```shell
hb install
```
La commande `hb -l` listera les tâches du builder

#### Configuration

Si vous souhaitez modifier la configuration de l'application, vous pouvez éditer le fichier suivant :

* `config\default.json`

#### Démarrage de l'application

Pour exécuter votre nouvelle application, utilisez la commande suivante :

```shell
hb w -i
```

Puis, utiliser un navigateur web pour y accéder par l'url [http://localhost:8888/nom_de_l_application](http://localhost:8888/nom_de_l_application).



#### Mode fullSPA

##### Récupération des dépendances

Une fois le projet initialisé, vous devez lancer l'installation des dépendances Node.js avec la commande suivante :

```shell
$ hb install
```

##### Configuration

Si vous souhaitez modifier la configuration de l'application, vous pouvez éditer le fichier suivant :

* `static\config-spa.json`

##### Génération des packages

Afin d'utiliser le mode FullSPA, il faut compiler, puis générer toutes les sources au format javascript

```shell
$ hb prepare-package
```

Le mode FullSPA nécessite d'avoir dans le répertoire 'static' les fichiers:

- messages.json
- messages-fr-FR.json
- navigation.json

Pour ce faire, une commande est disponible :

```shell
$ hb prepare-package:spa
```

##### Configuration Apache

Exemple de configuration Apache :

- `CHEMIN_ABSOLU_APPLICATION` : C:/home/workspace/HornetTest/static
- `NOM_APPLICATION`: hornettest-spa
- `NOM_APPLICATION_SERVICE`: hornettest-service

Remarque : `CHEMIN_ABSOLU_APPLICATION` doit pointer vers le répertoire qui contient la partie `static` de l'application.

```
Alias /NOM_APPLICATION "{CHEMIN_ABSOLU_APPLICATION}"
<Directory "{CHEMIN_ABSOLU_APPLICATION}">
    #Options Indexes FollowSymLinks
    #Require all granted
    Options +FollowSymLinks
    AllowOverride All
    Order deny,allow
    Allow from all
</Directory>

RewriteEngine on
# Redirection du contexte racine vers la page d'accueil
RewriteRule ^/NOM_APPLICATION/$ /NOM_APPLICATION/accueil [R]
# Reécrire les routes applicatives (les URI du type /NOM_APPLICATION/route, sans . dans le chemin) pour les renvoyer vers le client js (index.html)
RewriteRule ^/NOM_APPLICATION/[^\.]*$ /NOM_APPLICATION/index.html [PT]

<Location "/{NOM_APPLICATION_SERVICE}/">
      Header set Access-Control-Allow-Origin "*"
      ProxyPass "http://localhost:8080/{NOM_APPLICATION_SERVICE}/"
</Location>
```

##### Démarrage de l'application

Utiliser un navigateur web pour y accéder par l'url [http://localhost/nom_de_l_application](http://localhost/nom_de_l_application).