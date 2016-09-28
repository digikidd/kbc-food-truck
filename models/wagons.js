/**
 * Created by kellycarmichael on 7/26/16.
 */
//This schema is for a food truck that is registered and can be either mobile or stationary.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wagonSchema = new Schema({
    wagonName: String,
    wagonPics:[],
    date: { type: Date, default: Date.now },
    wagonIcon: String,
    schedule: [{dayOfWeek: String, hours: String}],
    wagonRating: {type: Number, default: 0},
    coupons: String,
    tags: [],
    menu: [{menuItem: String, price: Number, description: String}],
    contactInfo: {
        ownerName: {
            firstName: String,
            lastName: String
        },
        city: String,
        email: String,
        phone: Number,
        fbProfile: String,
        twitterProfile: String,
        website: String,
        wagonBio: String
    },
    locations: {
        currentLOC: String,
        scheduledLOC: String,
        lastSeenLOC: String
    },
    reviews: [{userName: String, userComment: String, wagonLove: Number}],
    wagonBlog:[]
});

module.exports = mongoose.model('wagons', wagonSchema);