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
                this.params.on('change', function (param, id) {
                    console.log('change');
                    this.navigateHash(!param.get('addToHistory'));
                }, this);
            },
            routes: {
                '*data': 'action'
            },
            action: function (data) {
                console.log(config);
            },
            //     var dataSplit,
            //         dataArray = [];

            //     if (config.loadFrom === 'query') {
            //         var query = window.location.search.substr(1);

            //         dataSplit = query.split('&'),
            //         dataArray = [];

            //         if (dataSplit[0] !== '') {
            //             _.each(dataSplit, function (data) {
            //                 if (data.indexOf('=') > -1) {
            //                     dataArray.push(data.split('='));
            //                 }
            //             });
            //         }

            //         Data.load(dataArray);
            //     } else {
            //         // Process any data that are present on initial page load
            //         if (data) {
            //             var self = this;

            //             if (config.hash.useBang) {
            //                 if (data.charAt(0) === '!') {
            //                     data = data.substr(1);
            //                 }
            //             }

            //             dataSplit = data.split(config.hash.dataSeparator);
            //             dataArray = [];

            //             _.each(dataSplit, function (data) {
            //                 dataArray.push(data.split(self.settings.hash.keyValSeparator));
            //             });

            //             Data.load(dataArray);
            //         } else {
            //             Data.trigger('initialized');
            //         }
            //     }
            // },

            navigateHash: function (replace) {
                // Generate and navigate to new hash
                var params = [],
                    hash = '',
                    value;

                this.params.each(function (model) {
                    if (model.get('addToUrl')) {
                        // get value
                        value = model.get('value');

                        // join arrays for url
                        if (_.isArray(value) && !_.isEmpty(value)) {
                            value = value.join(config.hash.arraySeparator);
                        }

                        if (value && !_.isEmpty(value)) {
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
                    hash += params.join(config.hash.dataSeparator);
                }

                this.navigate(hash, {
                    trigger: false,
                    replace: replace
                });
            }
        });

    return Router;
});