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

const formData = async () => {
  const formData = {};
  const judge = await db('judges').select('name');
  const social = await db('social_tags').select('social_tag');
  const protected = await db('protected_tags').select('ground_tag');
  const pos_keywords = await db('positive_tags').select('positive_tag');
  const neg_keywords = await db('negative_tags').select('negative_tag');

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

  let keywords = [];
  for (let i = 0; i < neg_keywords.length; i++) {
    let tag = Object.values(neg_keywords[i]);
    keywords.push(tag[0]);
  }

  for (let i = 0; i < pos_keywords.length; i++) {
    let tag = Object.values(pos_keywords[i]);
    keywords.push(tag[0]);
  }

  formData['judge_names'] = judges;
  formData['social_group_type'] = socials;
  formData['protected_ground'] = protecteds;
  formData['keywords'] = keywords;

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
  getPrediction,
  getViz,
  sendPDF,
  sendCSV,
  sendJSON,
  formData,
};
