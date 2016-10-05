var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.set('debug', true);

var roasterModel = new Schema({
    name: {type: String}

});

module.exports = mongoose.model('Roaster', roasterModel);
