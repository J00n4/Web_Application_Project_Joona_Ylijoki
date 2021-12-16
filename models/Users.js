const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schema for users, includes user information
let userSchema = new Schema ({
    username: {type: String},
    password: {type: String},
    token: {type: String}
});

module.exports = mongoose.model("users", userSchema);