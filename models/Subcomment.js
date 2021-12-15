const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let subcommentSchema = new Schema({
    motherID: {type: String},
    subcomment: {type: String}
});

module.exports = mongoose.model("subcomment", subcommentSchema);