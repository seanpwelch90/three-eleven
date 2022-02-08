var multer = require('multer')
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
require('dotenv').config()

var s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hr-sdc-db',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;