var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    fs = require('fs'),
    environment = process.env.NODE_ENV || 'production';

// app.use(express.logger());
app.use(express.compress());
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Routes ---------------------------------------
app.get('/', function (req, res) {
    res.render('index', {
        environment: environment
    });
});

app.get('/test/appular', function (req, res) {
    var tests = [];

    tests.push('libraries/appular/tests');

    res.render('test', {
        environment: environment,
        tests: tests
    });
});

app.get('/test/:type?/:name?', function (req, res) {
    var tests = [],
        appular = {
            paths: {
                apps: './public/js/apps',
                components: './public/js/components',
                plugins: './public/js/plugins'
            }
        };

    if (req.params.type && req.params.name) {
        tests.push(req.params.type + 's/' + req.params.name + '/tests');
    } else {
        // run all tests
        // add appular app definition for build
        fs.readdirSync(appular.paths.apps).forEach(function (name) {
            // add spec file if it exists
            if (fs.existsSync(appular.paths.apps + '/' + name + '/tests.js')) {
                tests.push('apps/' + name + '/tests');
            }
        });

        // add appular component definition for build and test files
        fs.readdirSync(appular.paths.components).forEach(function (name) {
            // add spec file if it exists
            if (fs.existsSync(appular.paths.components + '/' + name + '/tests.js')) {
                tests.push('components/' + name + '/tests');
            }
        });

        // add appular component definition for build and test files
        fs.readdirSync(appular.paths.plugins).forEach(function (name) {
            // add spec file if it exists
            if (fs.existsSync(appular.paths.plugins + '/' + name + '/tests.js')) {
                tests.push('plugins/' + name + '/tests');
            }
        });
    }

    res.render('test', {
        environment: environment,
        tests: tests
    });
});

app.get('/:view/:data?', function (req, res) {
    res.render(req.params.view, {
        environment: environment
    });
});

app.use(function (req, res) {
    res.status(404);
    res.render('404', {});
});

// Listen ---------------------------------------
app.listen(port, function () {
    console.log('Listening on port ' + port);
});
