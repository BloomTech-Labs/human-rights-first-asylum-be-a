const axios = require('axios');
var request = require('request');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const dsConfig = require('../../config/dsConfig');
const dsClient = axios.create(dsConfig);
const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const getViz = (state) => {
  return dsClient.get(`/viz/${state}`);
};

const sendPDF = (req, res) => {
  return request(
    {
      method: 'POST',
      url: `${process.env.DS_API_URL}/get_fields`,
      headers: {},
      formData: {
        file: {
          value: JSON.stringify(req.files.file),
          options: {
            filename: req.files.file.name,
            contentType: null,
          },
        },
      },
    },
    function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body);
    }
  );
};

const sendCSV = (csv) => {
  return dsClient.post('/upload/csv', csv);
};

// * Creates a CSV file from JSON data -> DS has an easier time parsing CSV data, apparently
// * Made their job easier
const formData = async () => {
  const formData = {};
  const judge = await db('judges').select('name');
  const social = await db('social_tags').select('social_tag');
  const protected = await db('protected_tags').select('ground_tag');

  let judges = [];
  for (let i = 0; i < judge.length; i++) {
    let tag = Object.values(judge[i]);
    judges.push(tag[0]);
  }
  let socials = [];
  for (let i = 0; i < social.length; i++) {
    let tag = Object.values(social[i]);
    socials.push(tag[0]);
  }

  let protecteds = [];
  for (let i = 0; i < protected.length; i++) {
    let tag = Object.values(protected[i]);
    protecteds.push(tag[0]);
  }

  formData['judge_names'] = judges;
  formData['social_group_type'] = socials;
  formData['protected_ground'] = protecteds;

  return formData;
};

const sendJSON = (json) => {
  //* create fields
  const form_fields = [];
  for (let field in json) {
    form_fields.push(field);
  }
  const form_opts = { fields: form_fields };
  try {
    const form_parser = new Parser(form_opts);
    const form_csv = form_parser.parse(json);
    // * return variable with csv data
    return sendCSV(form_csv);
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getViz,
  sendPDF,
  sendCSV,
  sendJSON,
  formData,
};
