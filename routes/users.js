var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");
const Comment = require("../models/Comment");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});
//const somefeature = require("../public/javascripts/commentwall");

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
  /*body("username").trim().escape(),
  body("password").escape(),*/
  upload.none(),
  (req, res, next) => {
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
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 600
              },
              (err, token) => {
                user.token = token;
                console.log("TÄMÄ ON USER.TOKEN: " + user.token);
                user.save();
                //localStorage.setItem("auth_token", token);
                console.log("This comes from /users/login POST");
                res.json({success: true, token});
                //return res.redirect("/");
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
  /*body("username").isLength({min: 3}).trim().escape(),
  body("password").isLength({min: 8}),*/
  upload.none(),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) throw err;
      if(user) {
        return res.status(403).json({username: "Username already in use."});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            User.create(
              {
              username: req.body.username,
              password: hash,
              token: ""
              },
              (err, ok) => {
                if(err) throw err;
                //res.json({success: true});
                return res.redirect("/users/login");
              }
            );
          });
        });
      }
    });
});

/* Route for adding comments */
router.post('/comment/add', validateToken, upload.none(), (req, res, next) => {
  /*let token = localStorage.getItem("auth_token");
  //token = somefeature.getToken();
  console.log(token);

  if(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var info = JSON.parse(jsonPayload);

    console.log(info);
  }*/

  let nameinfo;

  let commentslist = [];

  console.log(commentslist);

  let itemID = (commentslist.length+1).toString;
  /*Comment.count({}, function(err, count) {
    itemID = count;
    return itemID
  });
  console.log(itemID);*/
  
  //let commentinput = document.createElement("textarea").setAttribute("id", "comment-input");

  //Comment.deleteOne({ "username": "foobar4"});
  let newComment = Comment.create(
    {
    username: req.body.username,
    comment: req.body.comment
    },
    (err, ok) => {
      if(err) throw err;
      //itemID = itemID + 1;
      return res.redirect("/content");
    }
  );
  commentslist.push(newComment);
  console.log(commentslist);
  /*console.log("This is newComment: " + newComment);
  commentslist.push(newComment);
  console.log(commentslist);
  return res.redirect("/content");*/


});


/* Route for add comment page */
router.get('/comment/add', (req, res, next) => {
  console.log("this is req from /comment/add: " + req.value);
  console.log("this is req.headers from there: " + req.headers);
  res.render('addcomment');
});

module.exports = router;
