/**
 * Created by kellycarmichael on 7/28/16.
 */
var express = require ('express');
var mongoose = require('mongoose');
var wagonRouter = express.Router ();
var wagonModel = require('../models/wagons');
var db = mongoose.connection;
var wagonCollection = db.collection('wagons');
var mongodb = require('mongodb');

wagonRouter.use (function (req, res, next) {
    console.log ('Time: ', Date.now ());
    next ();
});

//Get and create wagons in this route
wagonRouter.route ('/create')
    .get (function (req, res) {
        res.send ('get');
    })
    .post (function (req, res) {
        var Wagon = new wagonModel ();
        Wagon.wagonName = req.body.name;
        // Wagon.wagonRating = req.body.wagonRating;
        // Wagon.contactInfo.ownerName.firstName = req.body.firstName;
        // Wagon.contactInfo.ownerName.lastName = req.body.lastName;
        // Wagon.contactInfo.phone = req.body.phone;
        // Wagon.contactInfo.city = req.body.city;
        // Wagon.contactInfo.email = req.body.email;
        // Wagon.contactInfo.website = req.body.website;
        // Wagon.contactInfo.wagonBio = req.body.wagonBio;
        Wagon.schedule = req.body.schedule;


        Wagon.save (function (err, result) {
            if (err) {
                res.statusCode(500).json ({message: 'Account could not be saved.'});
                return;
            }
            res.json ({message: 'Account successfully created.'});
        })
    });

//This route retrieves all wagons from db
wagonRouter.route ('/all')
    .get (function (req, res) {
        wagonCollection.find ().toArray (function (err, results) {
            if (err) {
                res.json ({message: 'Error getting all the wagons'});
                return;
            }
            res.json ({message: 'Here are all the wagons', wagons: results});
        });

    });

//This route will find a wagon by id
wagonRouter.route ('/find/:id')
    .get (function (req, res) {
        wagonCollection.findOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, result){
            if (err) {
                res.json ({message: 'Error getting wagon IDs'});
                return;
            }
            res.json ({message: 'A lonely wagon', wagons: result});
        })
    });

//Exporting router
module.exports = wagonRouter;