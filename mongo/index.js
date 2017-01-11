var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/radionoise');

var portfolioSchema = mongoose.Schema({
  id: {type: String},
  name: {type: String},
  html: {type: String}
});

var portfolio = mongoose.model("portfolio", portfolioSchema);
exports.portfolio = portfolio;
exports.db = db;
