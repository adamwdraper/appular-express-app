/**
 * @appular plugin
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    Backbone.Plugin = Backbone.View.extend({
        plugins: {},
        views: {},
        // Set a hash of plugin options on the object, firing `"change"`.
        set: function(key, value, options) {
            var attribute,
                attributes,
                changes,
                silent,
                changing,
                previous,
                current;

            if (key === null) {
                return this;
            }

            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (typeof key === 'object') {
                attributes = key;
                options = value;
            } else {
                (attributes = {})[key] = value;
            }

            options = options || {};

            // Extract attributes and options.
            silent = options.silent;
            changes = [];
            changing = this._changing;
            this._changing  = true;

            if (!changing) {
                this.changed = {};
            }

            current = this.options;
            previous = _.clone(this.options);

            // For each `set` option, update or delete the current value.
            for (attribute in attributes) {
                value = attributes[attribute];
                if (!_.isEqual(current[attribute], value)) {
                    changes.push(attribute);
                }
                if (!_.isEqual(previous[attribute], value)) {
                    this.changed[attribute] = value;
                } else {
                    delete this.changed[attribute];
                }

                current[attribute] = value;
            }

            // Trigger all relevant attribute changes.
            if (!silent) {
                if (changes.length) {
                    this._pending = true;
                }

                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger('change:' + changes[i], this, current[changes[i]], options);
                }
            }

            // You might be wondering why there's a `while` loop here. Changes can
            // be recursively nested within `"change"` events.
            if (changing) {
                return this;
            }
            if (!silent) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;

            return this;
        },
        // Get the value of an option.
        get: function(option) {
            return this.options[option];
        }
    });
});