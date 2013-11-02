var express = require('express'),
    app = express();

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

app.get('/:view', function (req, res, next) {
    res.render(req.params.view, {
        environment: process.env.NODE_ENV
    });
});

app.use(function (req, res) {
    res.status(404);
    res.render('404', {});
});

// Listen ---------------------------------------
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});