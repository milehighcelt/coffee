var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.set('debug', true);

var individualModel = new Schema({
    name: {type: String}

});

module.exports = mongoose.model('Individual', individualModel);
