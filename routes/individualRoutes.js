var express = require('express');


var invRoutes = function (Individual) {
    var invRouter = express.Router();

    invRouter.route('/individual')

        .get(function (req, res) {
            // get all individuals from Mongo
            var query = {};
            if (req.query.name) {
                query.name = req.query.name;
            }

            Individual.find(query, function (err, individuals) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(individuals)
                }
            });
        })

        .post(function (req, res) {
            // post a single individual
            var individual = new Individual(req.body);
            console.log('POSTing new Individual record: ' + individual);
            individual.save(function (err, newDoc) {
                    if (err) {
                        console.log('Error inserting individual record: ' + err);
                    } else {
                        console.log('individual user inserted: \n' + newDoc);
                    }

                }
            );
            res.status(201).send(individual);
        });

    return invRouter;
};


module.exports = invRoutes;
