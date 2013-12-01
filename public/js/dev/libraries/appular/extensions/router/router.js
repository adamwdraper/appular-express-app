// Filename: utilites/router/utility
define([
    'jquery',
    'underscore',
    'backbone',
    './config'
], function($, _, Backbone, config){
    var Router = Backbone.Router.extend({
            initialize: function () {
                // Update the url hash whenever a param changes
                this._params.on('change', function (param) {
                    this.navigateHash(!param.get('addToHistory'));
                }, this);
            },
            routes: {
                '*data': 'action'
            },
            action: function (data) {
                var params = [];

                if (data) {
                    if (config.hash.useBang && data.charAt(0) === '!') {
                        data = data.substr(1);
                    }

                    _.each(data.split(config.hash.paramSeparator), function (param) {
                        var id = param.split(config.hash.keyValSeparator)[0],
                            value = param.split(config.hash.keyValSeparator)[1];

                        if (value.indexOf(config.hash.arraySeparator) !== -1) {
                            value = value.split(config.hash.arraySeparator);
                        }

                        params.push({
                            id: id,
                            value: value
                        });
                    });
                }
                
                this._params.load(params);
            },
            navigateHash: function (replace) {
                // Generate and navigate to new hash
                var params = [],
                    hash = '',
                    value;

                this._params.each(function (model) {
                    if (model.get('addToUrl')) {
                        // get value
                        value = model.get('value');

                        // join arrays for url
                        if (_.isArray(value)) {
                            value = value.join(config.hash.arraySeparator);
                        }

                        if (value) {
                            // use alias if it is defined
                            params.push((model.get('alias') ? model.get('alias') : model.get('id')) + config.hash.keyValSeparator + value);
                        }
                    }
                }, this);

                // Add bang to hash if enabled
                if (config.hash.useBang) {
                    hash += '!';
                }
                if (!_.isEmpty(params)){
                    hash += params.join(config.hash.paramSeparator);
                }

                this.navigate(hash, {
                    trigger: false,
                    replace: replace
                });
            }
        });

    return Router;
});