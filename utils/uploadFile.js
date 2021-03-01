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
      let uploadedFile = req.files.for_datascience;
      console.log(uploadedFile);
      // ! if mime.lookup(uploadedFile) does not parse properly, use uploadedFile.mimetype
      if (uploadedFile.mimetype === 'text/csv') {
        console.log('CSV*****');
        // * send to datascience csv endpoint through dsModel
        dsModel
          .sendCSV(uploadedFile)
          .then(() => {
            res.status(200).json({ message: 'CSV Successfully Uploaded' });
          })
          .catch((err) => res.status(500).json(err.message));
      }
      if (uploadedFile.mimetype === 'application/pdf') {
        console.log('PDF*****');
        // * send to datascience pdf endpoint through dsModel
        dsModel
          .sendPDF(uploadedFile)
          .then(() => {
            res.status(200).json({ message: 'PDF Successfully Uploaded' });
          })
          .catch((err) => res.status(500).json(err.message));
      }
      if (uploadedFile.mimetype === 'application/json') {
        console.log('JSON*****');
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
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadFile,
};
