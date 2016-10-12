var express = require('express');
var jwt    = require('jsonwebtoken');

var routes = function (User, app) {

    var authRouter = express.Router();

    authRouter.post('/authenticate', function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: '15m' // expires in 15 minutes
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    })

        .post('/createUser', function (req, res) {
            // post a single user
            var user = new User(req.body);
            console.log('POSTing new User record: ' + user);
            user.save(function (err, newDoc) {
                    if (err) {
                        console.log('Error inserting user record: ' + err);
                    } else {
                        console.log('user record inserted: \n' + newDoc);
                    }

                }
            );
            res.status(201).send(user);
        });

    return  authRouter;
};

module.exports = routes;
