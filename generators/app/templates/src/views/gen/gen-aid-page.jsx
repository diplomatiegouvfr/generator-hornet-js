"use strict";

var React = require("react");
var utils = require("hornet-js-utils");
var logger = utils.getLogger("<%= _.slugify(appname) %>.views.gen.gen-aid-page");

var HornetComponentMixin = require("hornet-js-core/src/mixins/react-mixins");
var Notification = require("hornet-js-components/src/notification/notification");

var AidePage = React.createClass({
    mixins: [HornetComponentMixin],

    render: function () {
        logger.info("VIEW AidePage render");
        return (
            <div>
                <h2>Aide</h2>
                <Notification />
                <div className="pure-g-r">
                    <div className="pure-u-3-4">
                        <h3>Objet de l'application</h3>
                        <p className="texte">Cette application permet de donner un aperçu
                            des éléments intégrés Hornet à travers l'exemple fonctionnel d'un
                            magasin.</p>
                        <h3>Objet de cette page</h3>
                        <p className="texte">Cette page en particulier permet de
                            visualiser le rendu des balises &lt;h2&gt;, &lt;h3&gt;, &lt;h4&gt;,
                        &lt;h5&gt; et &lt;h6&gt; au travers d'un contenu statique.</p>
                        <h4>Données de l’application</h4>
                        <i>A compléter...</i>
                        <p className="texte">Bonne navigation.</p>
                    </div>
                </div>
            </div>
        );
    }
})

module.exports = AidePage;
