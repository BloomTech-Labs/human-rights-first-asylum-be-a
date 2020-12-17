const Cases = require('../api/cases/caseModel');
// * load amazon aws service
const AWS = require('aws-sdk');
// * create S3 class
const awsConfig = require('../config/awsConfig');
const S3 = new AWS.S3(awsConfig);
const fs = require('fs');

const make_view_params = async (case_id) => {
  const curr_case = await Cases.findById(case_id);
  const params = {
    Key: `pdf/${curr_case.case_url}`,
    Bucket: 'human-rights-first-asylum-analysis-documents',
    ContentType: 'attachment',
    ContentDisposition: 'application/pdf',
  };
  return params;
};

const fetch_pdf_view = async (params) => {
  const pdf_file = S3.getObject(params);

  return pdf_file;
};

const make_dl_params = async (case_id) => {
  const curr_case = await Cases.findById(case_id);
  const params = {
    Key: `pdf/${curr_case.case_url}`,
    Bucket: 'human-rights-first-asylum-analysis-documents',
    ContentType: 'attachment',
    ContentDisposition: 'application/pdf',
  };
  return params;
};

// TODO include case_id in call
const fetch_pdf_download = async (case_id) => {
  var fileStream = fs.createWriteStream(`${case_id}.pdf`);
  var s3Stream = S3.getObject(make_dl_params(case_url)).createReadStream();

  // Listen for errors returned by the service
  s3Stream.on('error', function (err) {
    // NoSuchKey: The specified key does not exist
    console.error(err);
  });

  s3Stream
    .pipe(fileStream)
    .on('error', function (err) {
      // capture any errors that occur when writing data to the file
      console.error('File Stream:', err);
    })
    .on('close', function () {
      console.log('Done.');
    })
    .on('finish', function () {
      res.status(200).download(`${case_id}.pdf`);
    });
  return case_id;
};

module.exports = {
  make_dl_params,
  make_view_params,
  fetch_pdf_view,
  fetch_pdf_download,
};
