const faker = require('faker');

const cases = [...new Array(5)].map((i, idx) => ({
  case_id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  case_url: faker.image.avatar(),
  judge_name: 'Test001 User',
  court_type: faker.random.word(),
  hearing_type: faker.random.word(),
  refugee_origin: faker.random.word(),
  hearing_location: faker.random.word(),
  protected_ground: faker.random.word(),
  hearing_date: faker.date.recent(),
  decision_date: faker.date.recent(),
  credibility_of_refugee: faker.random.words(56),
  case_status: faker.random.word,
  social_group_type: faker.random.word(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('cases').insert(cases);
    });
};
