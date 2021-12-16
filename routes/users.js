var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");
const Comment = require("../models/Comment");
const Subcomment = require("../models/Subcomment");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/* Route for login page */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/* Login info checking with jwt */
router.post('/login', 
  upload.none(),
  (req, res, next) => {
    //Trying to find a user login in. If there is no user with the inserted
    //info, login is failed. Otherwise password is compared and if it is a match
    //user is signed with a token that grants access to creating posts and comments
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.status(403).json({message: "Login failed"});
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch) {
            const jwtPayload = {
              id: user._id,
              username: user.username
            }
            //jsonwebtoken payload and the defined SECRET key is signed to a token
            //which is valid for 10 minutes
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 600
              },
              (err, token) => {
                user.token = token;
                user.save();
                res.json({success: true, token});
              }
            );
          }
        })
      }
    })
});

/* Route for register page */
router.get('/register', (req, res, next) => {
  res.render('register');
});

/* Route for saving the registration to the database */
router.post('/register', 
  upload.none(),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    //Trying to find a user, if the user exists the registering user is notified
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) throw err;
      if(user) {
        return res.status(403).json({username: "Username already in use. Please login."});
      } else {
        //Hashing the password for safety reasons
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            //Setting user information and creating the user to the database
            User.create(
              {
              username: req.body.username,
              password: hash,
              token: ""
              },
              (err, ok) => {
                if(err) throw err;
                res.json({success: true});
              }
            );
          });
        });
      }
    });
});

/* Route for adding comments */
router.post('/comment/add', validateToken, upload.none(), (req, res, next) => {
  //Creating posts requires a token (the user must be logged in), this is checked 
  //by validateToken function

  //If user is logged in the inputs from the form is sent to this post route and 
  //the post is created and stored in the database
  let newComment = Comment.create(
    {
    username: req.user.username,
    comment: req.body.comment
    },
    (err, ok) => {
      if(err) throw err;
      return res.redirect("/content");
    }
  );
});


/* Route for add post page */
router.get('/comment/add', (req, res, next) => {
  //In here we render the "Add post" page
  res.render('addcomment');
});


/* GET content_data adding page. */
router.post("/content_data/addsubcomment", validateToken, upload.none(), (req, res, next) => {
  //Creating comments also requires a login which is again checked by the
  //validateToken function.

  //If user is logged in the inputs from the form is sent to this post route and
  //the comment is created and stored in the database.
  Subcomment.create(
    {
    motherID: req.body.motherID, //This is for specifying under which post is the comment
    subcomment: req.body.subcomment,
    username: req.user.username
    },
    (err, ok) => {
      if(err) throw err;
      return res.redirect("/content");
    }
  );
})

/* Route for add subcomment page */
router.get('/content_data/add', (req, res, next) => {
  //In here we render the add comment page
  res.render('addsubcomment');
});

module.exports = router;
