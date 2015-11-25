"use strict";
var React = require("react");
var utils = require("hornet-js-utils");
var logger = utils.getLogger("<%= _.slugify(appname) %>.views.gen.gen-acs-cmp");
var HornetComponentMixin = require("hornet-js-core/src/mixins/react-mixins");

var AccessibleComposant = React.createClass({
    mixins: [HornetComponentMixin],

    propTypes: {
        lienAideVisible: React.PropTypes.bool,
        lienContactVisible: React.PropTypes.bool,
        titreAppli: React.PropTypes.string.isRequired,
        themeCss: React.PropTypes.object
    },

    render: function () {
        logger.info("VIEW AccessibleBar render");
        var titreAppli = this.props.titreAppli;
        var messIntl = this.i18n('header');

        var lienContact = (this.props.linkContactVisible === true) ?
            <li><a href={this.genUrl("/contact")}>{messIntl.contact}</a></li>
            : null;
        var lienAide = (this.props.linkHelpVisible === true) ?
            <li><a href={this.genUrl("/aide")}>{messIntl.help}</a></li>
            : null;

        var applicationTitle = "<%= appname %>";

        return (
            <nav id="infos">
                <ul id="access_liens">
                    <li>
                        <a href="#nav" title={messIntl.menuTitle + applicationTitle}>{messIntl.menu}</a>
                    </li>
                    <li>
                        <a href="#bd" title={messIntl.contentTitle + applicationTitle}>{messIntl.content}</a>
                    </li>
                    <li>
                        <a href={this.genUrl("/planAppli")}
                           title={messIntl.planTitle + applicationTitle}>{messIntl.plan}</a>
                    </li>
                    <li>
                        <a href={this.genUrl("/politiqueAccessibilite")}
                           title={messIntl.accessTitle + applicationTitle}>{messIntl.access}</a>
                    </li>
                    {lienContact}
                    {lienAide}
                </ul>
            </nav>

        );
    }
});

module.exports = AccessibleComposant;
