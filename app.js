var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

app.use(express.logger());
app.use(express.compress());
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Routes ---------------------------------------
app.get('/', function (req, res) {
    res.render('index', {
        environment: process.env.NODE_ENV
    });
});

// example of pushstate urls that all should serve the app
app.get('/:var(app|dashboard|profile)', function (req, res) {
    res.render('app', {
        environment: process.env.NODE_ENV
    });
});

app.use(function (req, res) {
    res.status(404);
    res.render('404', {
        environment: process.env.NODE_ENV
    });
});

// Listen ---------------------------------------
app.listen(port, function () {
    console.log('Listening on port ' + port);
});