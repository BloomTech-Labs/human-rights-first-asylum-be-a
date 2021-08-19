const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

aws.config.update({
  secretAccessKey: '6v64KB/ZOlrG9R85O3eq5/3MdGaTKwwlEFFmdOSl',
  accessKeyId: 'AKIATA66VIBVE5YVNX4R',
  region: 'us-east-1',
});

const s3 = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'hrf-asylum-cases',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${uuidv4()}.pdf`);
    },
  }),
});

module.exports = upload;
