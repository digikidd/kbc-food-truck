/**
 * Created by kellycarmichael on 7/28/16.
 */
var express = require ('express');
var mongoose = require('mongoose');
var userRouter = express.Router ();
var userModel = require('../models/wagonUser');
var db = mongoose.connection;
var userCollection = db.collection('wagonUser');
var mongodb = require('mongodb');


userRouter.use (function (req, res, next) {
    console.log ('user head blew up: ', Date.now ());
    next ();
});

userRouter.route('/').get (function (req, res) {
    res.json ({message: "welcome new person"});

});

userRouter.route ('/create')
    .get (function (req, res) {
        res.send ('get');
    })
    .post (function (req, res) {
        var user = new userModel ();
        user.name = req.body.name;
        user.nickname = req.body.nickname;
        user.email = req.body.email;
        user.password = req.body.password;
        /*user.icon = req.body.icon;
        user.userFavs = req.body.userFavs;
        user.userPics = req.body.userPics;
        user.ratingsGiven = req.body.ratingsGiven;*/
        user.save (function (err, result) {
            if (err) {
                res.statusCode(500).json ({message: 'Account could not be saved.'});
                return;
            }
            res.json ({message: 'Account successfully created.'});
        })
    });

userRouter.route ('/find/:id')
    .get (function (req, res) {
        userCollection.findOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, result){
            if (err) {
                res.json ({message: 'Error getting user IDs'});
                return;
            }
            res.json ({message: 'A lonely user', user: result});
        })
    });

module.exports = userRouter;