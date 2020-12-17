const axios = require('axios');
const dsConfig = require('../../config/dsConfig');
const dsClient = axios.create(dsConfig);

const getPrediction = (x1, x2, x3) => {
  return dsClient.post('/predict', { x1, x2, x3 });
};

const getViz = (state) => {
  return dsClient.get(`/viz/${state}`);
};

const sendPDF = (pdf) => {
  return dsClient.post('/upload/pdf', pdf);
};

const sendCSV = (csv) => {
  return dsClient.post('/upload/csv', csv);
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

module.exports = { getPrediction, getViz, sendPDF, sendCSV, sendJSON };
