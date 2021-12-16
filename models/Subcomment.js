const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for subcomments, includes all the needed variables
let subcommentSchema = new Schema({
    motherID: {type: String},
    subcomment: {type: String},
    username: {type: String}
});

module.exports = mongoose.model("subcomment", subcommentSchema);