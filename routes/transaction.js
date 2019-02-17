var mongoose = require('mongoose');
var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');
var User = require('../models/User');
var Book = require('../models/Book');
var getToken = require('./getToken');

// POST a new transaction
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  
  var token = getToken(req.headers);

  if(token) {
    Book.findById(req.body.book_id, function(err, book) {
      if(err)
        throw err;
      var newTransaction = new Transaction({
        book_id: req.body.book_id,
        buyer_id: req.body.user._id,
        seller_id: book.user_id
      });

      newTransaction.save(function(err) {
        if(err)
          return res.json({ success: false, msg: 'Error saving transaction' });
        return res.json({ success: true, msg: 'Successfully saved transaction' });
      })
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'unauthorized' });
  }
});

module.exports = router;