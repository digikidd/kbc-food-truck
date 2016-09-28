/**
 * Created by kcarmichael on 7/28/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    name: String,
    nickname: String,
    email: String,
    icon: String,
    password: String,
    ratingsGiven: [{wagonName: String, userComments: String, wagonLove: Number}],
    userFavs:[],
    userPics: [{wagonName: String, wagonPic: String}]
});

module.exports = mongoose.model('wagonUser',userSchema);