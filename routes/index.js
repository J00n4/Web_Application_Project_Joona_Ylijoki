var express = require('express');
const path = require('path');
var router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Users = require('../models/Users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Discussion forum' });
});

/* GET content page. */
router.get('/content', (req, res, next) => {
  /*Comment.deleteMany({}).then(function() {
    console.log("DATA DELETED");
  }).catch(function(err) {
    console.log(err);
  })*/
  Comment.find({}, (err, comments) => {
    if(err) return next(err);
    /*Comment.count({}, function(err, count) {
      console.log("The amount of items in Comment is: " + count);
    })*/
    //res.render('comments', {comments});
    if(comments.length > 0) {
      /*comments.forEach(comment => {
        const postwall = document.createElement("div");
        const writer_area = document.createElement("p");
        const text_area = document.createElement("p");
        writer_area.innerHTML = comment.username;
        text_area.innerHTML = comment.comment;
        postwall.appendChild(writer_area);
        postwall.appendChild(text_area);
      })*/
      return /*res.sendFile(path.join(__dirname + "/commentwall.js"));*/res.send(comments);
    } else {
      return res.status(404).send('No comments found!');
    }
  })
});

module.exports = router;
