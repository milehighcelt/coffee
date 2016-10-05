var express = require('express');

var routes = function (Coffee) {

        var coffeeRouter = express.Router();

        coffeeRouter.use('/results/:coffeeResultId', function (req, res, next) {
            console.log('received coffeeResultId = ' + req.params.coffeeResultId);
            Coffee.findById(req.params.coffeeResultId, function (err, coffee) {
                if (err) {
                    res.status(500).send(err);
                    console.log(err);
                } else if (coffee) {
                    req.coffee = coffee;
                    next();
                } else {
                    res.status(404).send('no coffee found');
                }
            });
        });

        coffeeRouter.route('/result')

            .post(function (req, res) {
                var coffee = new Coffee(req.body);
                console.log('POSTing new record: ' + coffee);
                coffee.save(function (err, newDoc) {
                        if (err) {
                            console.log('Error inserting coffee result: ' + err);
                        } else {
                            console.log('coffee result inserted: \n' + newDoc);
                        }
                    }
                );
                res.status(201).send(coffee);
            });

        coffeeRouter.route('/results')
            .post(function (req, res) {

                var counter = 0;
                req.body.forEach(function (item) {
                    var coffee = new Coffee(item);
                    console.log(item);
                    console.log('POSTing new record: ' + coffee);
                    coffee.save();
                    counter++;
                });
                console.log('created ' + counter + ' records');
                res.status(201).send('created ' + counter + ' records');

            })

            .get(function (req, res) {
                console.log('in /results get()');
                var query = {};
                if (req.query.name) {
                    query.name = req.query.name;
                }
                Coffee.find(query, function (err, coffees) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(coffees)
                    }
                });
            });

        coffeeRouter.route('/results/:coffeeResultId')
            .get(function (req, res) {

                res.json(req.coffee);
            })
            .put(function (req, res) {

                req.coffee.name = req.body.name;
                req.coffee.roaster = req.body.roaster;
                req.coffee.aromaCom = req.body.aromaCom;
                req.coffee.aroma = req.body.aroma;
                req.coffee.acidityCom = req.body.acidityCom;
                req.coffee.acidity = req.body.acidity;
                req.coffee.mouthFeelCom = req.body.mouthFeelCom;
                req.coffee.mouthFeel = req.body.mouthFeel;
                req.coffee.flavourCom = req.body.flavourCom;
                req.coffee.flavour = req.body.flavour;
                req.coffee.aftertasteCom = req.body.aftertasteCom;
                req.coffee.aftertaste = req.body.aftertaste;
                req.coffee.balance = req.body.balance;
                req.coffee.cupperScore = req.body.cupperScore;
                req.coffee.save();
                res.json(req.coffee)
            });

        return coffeeRouter;
    };

module.exports = routes;
