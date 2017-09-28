var mongoose = require('mongoose');

var CelebsSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  starredIn: String
});

module.exports = mongoose.model("Celebs", CelebsSchema);