// File upload
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var settings = require('../config/settings');

aws.config.update({
  secretAccessKey: settings.secretAccessKey,
  accessKeyId: settings.accessKeyId,
  region: settings.region
});

var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'book-exchange-jhacks',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    }
  })
});

module.exports = upload;