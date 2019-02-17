var express = require('express');
var router = express.Router();
var upload = require('../services/upload');

var singleUpload = upload.single('image');

router.post('/image-upload', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if(err) {
      return res.status(422).send({ errors: [{ title: 'Image upload error', detail: err.message }] });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;