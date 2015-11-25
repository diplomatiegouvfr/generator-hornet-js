///<reference path="../../../node_modules/app/hornet-js-ts-typings/definition.d.ts"/>

import React = require("react");
import HornetComponent = require("hornet-js-components/src/hornet-component");
import utils = require("hornet-js-utils");
var logger = utils.getLogger("<%= _.slugify(appname) %>.views.gen.gen-hom-page");

@HornetComponent.ApplyMixins()
class HomePage extends HornetComponent<any,any> {

    static displayName:string = "HomePage";

    static propTypes = {
        themes: React.PropTypes.array
    };

    static defaultProps = {
        themes: [
            {
                key: "intranet",
                label: "Thème Diplonet (intranet)"
            }

        ]
    };


    render() {
        logger.info("VIEW HomePage render");
        return (
            <div>
                <div id="pageAccueil">
                    <h2>Accueil</h2>

                    <div>
                        <h3>Qu'est-ce que l'application <%= appname %> ?</h3>

                        <div>
                            <p className="texte">L'application <%= appname %> a pour objectif de présenter une application
                                basée sur le framework Hornet.
                            </p>

                            <p className="texte">
                                <em>A noter :</em>
                            </p>
                            <ul>
                                <li>Hornet facilite la mise en oeuvre du RGAA dans une application.</li>
                                <li>Mais l'utilisation de Hornet ne garantit pas qu'une application soit valide RGAA.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3>Mise en oeuvre</h3>

                        <div>
                            <h4>Cas fonctionnels</h4>

                            <p className="texte">Les cas fonctionnels présentés dans l'application sont :
                            </p>
                            <ul>
                                <li>Formulaire de recherche</li>
                                <li>Présentation du résultat sous forme de tableau éditable</li>
                                <li>Formulaire étendu</li>
                                <li>Tableau d'ajout/suppression/modification d'items</li>
                            </ul>
                            <h4>RGAA</h4>

                            <p className="texte">Pour plus d'infos sur le RGAA, aller sur le lien&nbsp;
                                <a href={this.genUrl("/politiqueAccessibilite")}>Accessibilité</a>.
                            </p>

                            <p className="texte">
                                Le framework fourni est un élément facilitant la mise en conformité RGAA.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export = HomePage;