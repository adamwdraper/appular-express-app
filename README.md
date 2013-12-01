# Appular

A modular Javascript organizational scheme composed of AMD compatible modules based on Backbone and RequireJs.

Appular isn't really a framework.  It does a couple of nice things, like loading modules based on data attributes, but mostly it aims to help you:
- Organize JS into reusable modules
- Keep your JS DRY
- Create an event driven structure
- Break down your apps into smaller pieces to make it more maintainable and testable
- Eliminate spagetti code that can occur even when a JS framework is being used
- Create documentation for your modules from inline comments

## Example Project
To check out a quick example of appular in action:
- Clone the repo
- Run `npm install`
- Run `grunt`
- Go to `http://localhost:5000/demo` in your browser
- Tip: Open your console to see what modules loaded

## Concepts
In Appular there are 3 different types of modules.

### App
This is where you do any prep work like authentication checks before any of your modules load.  They also have a special collection called params that modules use to share data.  An app is added to a page by adding `data-appular-app="app-name"` to the body tag.

### Modules
Modules are bound to dom elements by adding a `data-appular-module="module-name"` attribute to the element.

### Plugins
Plugins are used by modules and are meant for very specific functionality that you are using in several modules.  Use them for tasks like long-polling or watching for infinite scrolling.  Ideally these are kept small and dumb. (i.e. they do their work, trigger events when necessary, and modules react to those events)

### Utilities
These are top level "helpers" that can act as mini libraries.

## Use
Included these scripts based on environment.  This way debuging is easy since nothing is uglified.

```
// Development Environment
<script src="/js/dev/libraries/require/require-2.1.9.js"></script>
<script src="/js/dev/libraries/require/config.js"></script>
```

```
// Production Environment
<script src="/js/build/appular.js"></script>
```

Then add data attributes to elements that you want to attach modules too, and Appular will load them for you.
```
<div data-appular-module="user-bar"></div>
```

## Documentation

Appular can generate documentation code for your project with its [grunt plugin](https://github.com/adamwdraper/grunt-appular-docs).

## Grunt Commands
`grunt`:
- Builds starts server in development environment.
- Watches NODE.js and SASS files for changes


## Readiness

Appular has been used on several large and small web apps and has made life a whole lot easier for both me and my team that's why I'm sharing.
