const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// aws-sdk automatically pulls credentials from env variables. (found in .env)
const s3 = new AWS.S3();

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    contentType: (req, file, cb) => {
      cb(null, 'image/jpeg');
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `flip-cards/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

function uploadRoute(app) {
  app.post('/upload', uploadS3.single('file'), (req, res) => {
    res.status(200).json(req.file);
  });
}

module.exports = uploadRoute;
