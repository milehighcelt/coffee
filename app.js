var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var path = require('path');

var db = mongoose.connect('mongodb://localhost/coffeeAPI');
db.set('debug', true);

var Coffee = require('./models/coffeeModel');
var Individual = require('./models/individualModel');
var Roaster= require('./models/roasterModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(morgan('common'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/public/htmlPartials'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var coffeeRoutes = require('./routes/coffeeRoutes')(Coffee);
var indivRoutes = require('./routes/individualRoutes')(Individual);
var roasterRoutes = require('./routes/roasterRoutes')(Roaster);
app.use('/api', coffeeRoutes);
app.use('/api', indivRoutes);
app.use('/api', roasterRoutes);

app.get('/', function(req, res) {
    res.render('index', { title: 'Cup of Excellence' });
});

app.listen(port, function() {
    console.log('Running my app on PORT: ' +port )
});
