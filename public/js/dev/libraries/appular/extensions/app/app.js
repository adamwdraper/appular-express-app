/**
 * @appular app
 */
define([
    'underscore',
    'backbone',
    './collection',
    './router',
    '../backbone/backbone'
], function (_, Backbone, Collection, Router) {
    Backbone.App = (function(View) {
        return View.extend({
            config: {},
            params: {},
            collection: new Collection(),
            router: {},
            constructor: function() {
                // call original constructor
                View.apply(this, arguments);

                this._loadCollection();
            },
            _loadCollection: function () {
                var models = [];
                
                // add any params to collection
                _.each(this.params, function (value, key) {
                    var model = {
                            id: key
                        };

                    if (_.isString(value)) {
                        model.value = value;
                    }

                    if (_.isObject(value)) {
                        model = _.extend(model, value);
                    }

                    // set the value of any param by data attribute on body
                    if (this.$el.data(key)) {
                        model.value = this.$el.data(key);
                    }

                    models.push(model);
                }, this);

                this.collection.add(models);

                // trigger collection events on the app
                this.collection.on('all', function () {
                    var args = Array.prototype.slice.call(arguments),
                        event = args.shift();

                    if (event !== 'change:value') {
                        this.trigger(event, args);
                    }
                }, this);

                // create router and add collection
                this.router = new Router({
                    collection: this.collection
                });
            },
            /**
            @function get - shortcut to get params's value
            */
            get: function(name) {
                return this.collection.getValue(name);
            },
            /**
            @function set - shortcut to set param's value
            */
            set: function(id, value, options) {
                return this.collection.setValue(id, value, options);
            }
        });
    })(Backbone.View);
});