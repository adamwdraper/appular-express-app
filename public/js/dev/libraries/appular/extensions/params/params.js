define([
    'jquery',
    'underscore',
    'backbone',
    './param'
    // 'Cookies'
], function ($, _, Backbone, Param) {
    var Collection = Backbone.Collection.extend({
            model: Param,
            initialize: function () {
                _.bindAll(this, 'load');

                this.on('add', function(model) {
                    model.on('change', function() {
                        this.trigger('change:' + model.get('id'), model, model.get('id'));
                    }, this);
                }, this);
            },

            // Sets data based on url data on initial load (ignores any parameters that are not defined in initialize above)
            load: function () {
                // var dataInitialized = _.after(data.length, this.finalizeLoad);
                // _.each(data, function(dataArray) {
                //     var model = this.get(dataArray[0]);

                //     if(!model) {
                //         model = _.find(this.models, function(model) { return model.get('alias').toLowerCase() === dataArray[0].toLowerCase(); });
                //     }

                //     if(model) {
                //         model.set({value: decodeURIComponent(dataArray[1])}, {silent: true});
                //     }

                //     dataInitialized();
                // }, this);
                this.trigger('initialized');
            },

            // finalizeLoad: function() {
            //     var triggerInitialized = _.after(this.length, this.triggerInitialized);

            //     _.each(this.models, function(model) {
            //         if(model.get('getFromCookie')) {
            //             var cookieName = null;

            //             if(model.get('alias') !== '') {
            //                 cookieName = model.get('alias');
            //             } else {
            //                 cookieName = model.get('id');
            //             }

            //             model.set({value: Cookies.get(cookieName)});
            //         }

            //         if(model.get('isArray') && _.isString(model.get('value'))) {
            //             var value = model.get('value');
            //             model.set('value', value.split(','));
            //         }

            //         triggerInitialized();
            //     }, this);
            // },

            // /**
            // @doc {event} initialized - fires when all data has been loaded
            // */
            // triggerInitialized: function() {
            //     this.trigger('initialized');
            // },

            /**
            @doc {function} getValueOf - shortcut to get model's value
            */
            getValue: function(name) {
                return this.get(name).get('value');
            },

            /**
            @doc {function} setValueOf - shortcut to set model's value
            */
            setValue: function(name, value) {
                return this.get(name).set('value', value);
            }

        });

    return Collection;
});