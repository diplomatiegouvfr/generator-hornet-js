"use strict";

var utils = require("hornet-js-utils");
var React = require("react");
var logger = utils.getLogger("<%= _.slugify(appname) %>.views.gen.gen-hea-cmp");
var HornetComponentMixin = require("hornet-js-core/src/mixins/react-mixins");
var PageInformationsStore = require("hornet-js-core/src/stores/page-informations-store");

var AccessibleComponent = require("src/views/gen/gen-acs-cmp");

var Header = React.createClass({
    mixins: [HornetComponentMixin],

    propTypes: {
        linkAccessibilityVisible: React.PropTypes.bool,
        linkHelpVisible: React.PropTypes.bool,
        linkContactVisible: React.PropTypes.bool,
        logoAppliPath: React.PropTypes.string,
        applicationTitle: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        var themeName = this.getStore(PageInformationsStore).getThemeName();
        return {
            themeName: themeName
        }
    },

    _getAccessibleComposant: function () {

        return (<AccessibleComponent
                    themeName={this.state.themeName}
                    linkContactVisible={this.props.linkContactVisible}
                    linkHelpVisible={this.props.linkHelpVisible}
                    applicationTitle={this.props.applicationTitle}
            />);
    },

    render: function () {
        logger.info("VIEW Header render");

        var applicationTitle = this.props.applicationTitle;
        var messIntl = this.i18n("header");
        var title = messIntl.logoTitle;
        return (
            <div>
                {this._getAccessibleComposant()}
                <header role="banner">
                    <div id="bandeau_appli">
                        <a href={this.genUrl(utils.config.getOrDefault("welcomePage", "/"))} title={title} id="imgLogo">
                            <img alt={title} src={this.props.logoAppliPath}/>
                            <h1>{applicationTitle}</h1>
                        </a>
                    </div>
                </header>
            </div>
        );
    }    
});

module.exports = Header;
