var mongoose = require('mongoose');
var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var getToken = require('./getToken');

// GET all books
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if(token) {
    Book.find(function(err, books) {
      if(err) {
        return next(err);
      }
      res.json(books);
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'unauthorized' });
  }
});

// GET single book by id
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers);
  if(token) {
    Book.findById(req.params.id, function(err, book) {
      if(err) {
        return next(err);
      }
      res.json(book);
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'unauthorized' });
  }
});

// POST book
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if(token) {
    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      condition: req.body.condition,
      price: req.body.price,
      primary_image_location: req.body.image_location,
      secondary_image_locations: req.body.secondary_image_locations,
      user_id: req.user._id,
      publisher: req.body.publisher,
      published_year: req.body.published_year,
      description: req.body.description
    });

    // Save the book
    newBook.save(function(err) {
      if(err) {
        return res.json({ success: false, msg: 'Error saving book' });
      }
      return res.json({ success: true, msg: "Successfully created new book" });
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'unauthorized' });
  }
});

module.exports = router;