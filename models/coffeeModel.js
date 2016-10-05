var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.set('debug', true);

var coffeeModel = new Schema({
    name: {type: String},
    roaster: {type: String},
    aromaCom: {type: String},
    aroma:  { type: Number},
    acidityCom: { type: String},
    acidity: { type: Number},
    mouthFeelCom: {type: String},
    mouthFeel: { type: Number},
    flavourCom: {type: String},
    flavour: { type: Number},
    aftertasteCom: { type: Number},
    aftertaste: { type: Number},
    balance: {type: String},
    cupperScore:{ type: Number}
});

module.exports = mongoose.model('Coffee', coffeeModel);
