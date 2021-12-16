var express = require('express');
const path = require('path');
var router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Users = require('../models/Users');
const Subcomment = require('../models/Subcomment');
const validateToken = require("../auth/validateToken.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Discussion forum' });
});

/* GET content page. */
router.get('/content', (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/commentwall.html"));
});

/* GET content data */
router.get("/content_data", (req, res, next) => {
  //Finding all posts from Comment collection
  Comment.find({}, (err, comments) => {
    if(err) return next(err);
    if(comments.length > 0) {
      return res.send(comments);
    } else {
      return res.status(404).send('No posts found!');
    }
  })
})

/* GET comments for a post */
router.get("/subcontent_data/:id", (req, res, next) => {
  //Finding all comments from subcomments collection that has the specific
  //motherID, so those that are under a specific post. This is where the 
  //comment information is fetched
  Subcomment.find( {motherID: req.params.id }, (err, subcomments) => {
    if(err) {
      if(err.name === "CastError") {
        return res.status(404).send("Didn't find anything");
      }
      return next(err);
    }
    if(subcomments.length > 0) {
      return res.send(subcomments);
    } else {
      return res.status(404).send('No comments found for this post!');
    }
  })
})


router.get("/subcontent/:id", (req, res, next) => {
  //Finding all the comments with a specific motherID so under a specific post
  //and rendering them onto the comments page
  Subcomment.find({motherID: req.params.id}, (err, subcomments) => {
    if(err) return next(err);
    res.render("subcomments", {subcomments});
  }
)
})

module.exports = router;
