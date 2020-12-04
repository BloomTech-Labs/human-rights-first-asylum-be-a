const faker = require('faker');

const cases = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(5),
  case_url: 'www.google.com',
  judge_name: 'Test001 User',
  court_type: 'Lower',
  hearing_type: 'Primary',
  refugee_origin: 'Syria',
  hearing_location: 'Atlanta',
  protected_ground: 'War',
  hearing_date: '01-11-16',
  decision_date: '01-11-16',
  credibility_of_refugee: 'Very credible?',
  case_status: 'closed',
  social_group_type: 'Female',
  judge_decision: 'No',
  judge_name: 'Test001 User',
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cases')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('cases').insert(cases);
    });
};
