const mime = require('mime-types');

const uploadFile = async (res, uploadedFile) => {
  try {
    // ! if mime.lookup(uploadedFile) does not parse properly, use uploadedFile.mimetype
    if (mime.lookup(uploadedFile) == 'text/csv') {
      // * send to datascience csv endpoint through dsModel
      dsModel
        .sendCSV(uploadedFile)
        .then(() => {
          res.status(200).json({ message: 'CSV Successfully Uploaded' });
        })
        .catch((err) => res.status(500).json(err.message));
    }
    if (mime.lookup(uploadedFile) == 'application/pdf') {
      // * send to datascience pdf endpoint through dsModel
      dsModel
        .sendPDF(uploadedFile)
        .then(() => {
          res.status(200).json({ message: 'PDF Successfully Uploaded' });
        })
        .catch((err) => res.status(500).json(err.message));
    }
    if (mime.lookup(uploadedFile) == 'application/json') {
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
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadFile,
};
