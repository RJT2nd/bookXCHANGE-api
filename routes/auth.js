var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User');

// POST new user
router.post('/register', function(req, res) {
  if(!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass a username and password.' });
  }
  else {
    // Creates new user
    var newUser = new User({
      email: req.body.email,
      email_verified: false,
      username: req.body.username,
      password: req.body.password,
      books: []
    });

    // Save the user
    newUser.save(function(err) {
      if(err) {
        return res.json({ success: false, msg: 'Username already exists' });
      }
      return res.json({ success: true, msg: "Successfully created new user" });
    });
  }
});

// POST login
router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if(err) throw err;

    if(!user) {
      res.status(401).send({ success: false, msg: 'User not found.' });
    }
    else {
      // checking password
      user.comparePassword(req.body.password, function(err, isMatch) {
        if(isMatch && !err) {
          // Generate token with secret
          var token = jwt.sign(user.toJSON(), settings.secret);
          // Return success status + token
          res.json({ success: true, token: token });
        }
        else {
          res.status(401).send({ success: true, msg: 'Failed to authenticate. Wrong password.' });
        }
      }); 
    }
  });
});

module.exports = router;