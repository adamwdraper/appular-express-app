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

app.get('/:view/:data?', function (req, res) {
    res.render(req.params.view, {
        environment: process.env.NODE_ENV
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