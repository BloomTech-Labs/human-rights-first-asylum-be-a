const dsModel = require('../api/dsService/dsModel');

const uploadFile = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      // * Use the name of the input field (i.e. "avatar", "for_ds") to retrieve the uploaded file
      let uploadedFile = req.files.file;
      // ! if mime.lookup(uploadedFile) does not parse properly, use uploadedFile.mimetype
      if (uploadedFile.mimetype === 'text/csv') {
        // * send to datascience csv endpoint through dsModel
        dsModel
          .sendCSV(uploadedFile)
          .then(() => {
            res.status(200).json({ message: 'CSV Successfully Uploaded' });
          })
          .catch((err) => res.status(500).json(err.message));
      }
      if (uploadedFile.mimetype === 'application/pdf') {
        // * send to datascience pdf endpoint through dsModel
        dsModel.sendPDF(req, res);
      }
      if (uploadedFile.mimetype === 'application/json') {
        dsModel
          .sendJSON(uploadedFile)
          .then(() => {
            res.status(200).json({ message: 'Form Successfully Uploaded' });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      } else {
        res.status(400).json({ message: 'Please send valid file type.' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadFile,
};
