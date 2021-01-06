const Cases = require('../api/cases/caseModel');
// * load amazon aws service
const AWS = require('aws-sdk');
// * create S3 class
const awsConfig = require('../config/awsConfig');
const S3 = new AWS.S3(awsConfig);
const fs = require('fs');

const make_params = async (case_id) => {
  const curr_case = await Cases.findById(case_id);
  const params = {
    Key: `pdf/${curr_case.case_url}`,
    Bucket: 'hrf-asylum-dsa-documents',
  };
  return params;
};

// ! s3Stream should ACTUALLY pipe the file into a cacache temp folder
// TODO set up the fetch to pipe into a cacache temp folder to serve to client
const fetch_pdf_view = async (params, res) => {
  const title = params.Key;
  const fileStream = fs.createWriteStream(`tempfile.pdf`);
  const s3Stream = S3.getObject(params).createReadStream();

  // Listen for errors returned by the service
  s3Stream.on('error', function (err) {
    // NoSuchKey: The specified key does not exist
    return err;
  });

  s3Stream
    .pipe(fileStream)
    .on('error', function (err) {
      // capture any errors that occur when writing data to the file
      console.log(err);
    })
    .on('close', function () {
      console.log('Done.');
    })
    .on('finish', function () {
      fs.readFile('tempfile.pdf', function (err, data) {
        res.contentType('application/pdf');
        res.send(data);
      });
    });

  return title;
};

const fetch_pdf_download = async (params, res) => {
  const title = params.Key;
  const fileStream = fs.createWriteStream(`tempfile.pdf`);
  const s3Stream = S3.getObject(params).createReadStream();

  // Listen for errors returned by the service
  s3Stream.on('error', function (err) {
    // NoSuchKey: The specified key does not exist
    res.status(404).json({ message: err.message });
  });

  s3Stream
    .pipe(fileStream)
    .on('error', function (err) {
      // capture any errors that occur when writing data to the file
      res.status(500).json({ message: err.message });
    })
    .on('close', function () {
      console.log('Done.');
    })
    .on('finish', function () {
      res.header('application/pdf');
      res.attachment(`${title}.pdf`);
      res.status(200).download(`tempfile.pdf`);
    });
  return case_id;
};

module.exports = {
  make_params,
  fetch_pdf_view,
  fetch_pdf_download,
};
