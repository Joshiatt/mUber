var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PointSchema = new Schema({
    type: { type: String, default: 'Point'},
    coordinates: { type: [Number], index: '2dsphere'}
});



var DriverSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema
});




var Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;