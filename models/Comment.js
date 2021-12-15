const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    id: {type: String},
    username: {type: String},
    comment: {type: String}
});

module.exports = mongoose.model("comment", commentSchema);