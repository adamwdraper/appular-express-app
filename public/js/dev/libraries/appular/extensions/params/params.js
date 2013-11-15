define([
    'jquery',
    'underscore',
    'backbone',
    './param'
], function ($, _, Backbone, Param) {
    var Collection = Backbone.Collection.extend({
            model: Param,
            initialize: function () {
                _.bindAll(this, 'load');

                this.on('add', function (model) {
                    model.on('change', function () {
                        this.trigger('change:' + model.get('id'), model, model.get('id'));
                    }, this);
                }, this);
            },
            // Sets params based on url data on initial load (ignores any parameters that are not defined in app)
            load: function (params) {
                _.each(params, function (param) {
                    var model = this.get(param.id);

                    // check for alias match
                    if (!model) {
                        model = _.find(this.models, function (model) {
                            return model.get('alias') === param.id;
                        });
                    }

                    if (model) {
                        model.set({
                            value: param.value
                        }, {
                            silent: true
                        });
                    }
                }, this);

                this.trigger('initialized');
            },
            /**
            @function getValue - shortcut to get model's value
            */
            getValue: function(name) {
                return this.get(name).get('value');
            },

            /**
            @function setValueOf - shortcut to set model's value
            */
            setValue: function(name, value) {
                return this.get(name).set('value', value);
            }
        });

    return Collection;
});