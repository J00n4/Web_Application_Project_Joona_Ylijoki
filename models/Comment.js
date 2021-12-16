const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schema for posts, including all the needed variables
let commentSchema = new Schema ({
    id: {type: String},
    username: {type: String},
    comment: {type: String}
});

module.exports = mongoose.model("comment", commentSchema);