var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var path = require('path');
var config = require('./config');

var db = mongoose.connect(config.database);

db.set('debug', true);

var Coffee = require('./models/coffeeModel');
var Individual = require('./models/individualModel');
var Roaster= require('./models/roasterModel');
var User= require('./models/userModel');

var app = express();
app.set('superSecret', config.secret);

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
var authRoutes = require('./routes/authRoutes')(User, app);
app.use('/api', coffeeRoutes);
app.use('/api', indivRoutes);
app.use('/api', roasterRoutes);
app.use('/api', authRoutes);

app.get('/', function(req, res) {
    res.render('index', { title: 'Cup of Excellence' });
});

app.listen(port, function() {
    console.log('Running my app on PORT: ' +port )
});
