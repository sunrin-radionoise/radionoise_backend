var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/edcan');

var portfolioSchema = mongoose.Schema({
  id: {type: String},
  user: {type: String},
  html: {type: String}
});

var portfolio = mongoose.model("portfolio", portfolioSchema);
exports.portfolio = portfolio;
exports.db = db;
