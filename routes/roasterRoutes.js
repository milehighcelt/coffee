var express = require('express');

var roasterRoutes = function (Roaster) {
    var roasterRoute = express.Router();

    roasterRoute.route('/roaster')

        .get(function (req, res) {
            // get all roasters from Mongo
            var query = {};
            if (req.query.name) {
                query.name = req.query.name;
            }

            Roaster.find(query, function (err, roasters) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(roasters)
                }
            });
        })

        .post(function (req, res) {
            // post a single roaster
            var roaster = new Roaster(req.body);
            console.log('POSTing new Roaster record: ' + roaster);
            roaster.save(function (err, newDoc) {
                    if (err) {
                        console.log('Error inserting roaster record: ' + err);
                    } else {
                        console.log('roaster record inserted: \n' + newDoc);
                    }

                }
            );
            res.status(201).send(roaster);
        });

    return roasterRoute;
};

module.exports = roasterRoutes;
