const faker = require('faker');

const judges = [...new Array(5)].map((i, idx) => ({
  judge_image: faker.image.avatar(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
  judge_county: `${faker.random.word()}`,
  appointed_by:
    idx === 0 ? 'Trump' : `${faker.name.firstName()} ${faker.name.lastName()}`,
  birth_date: '01-11-09',
  date_appointed: '01-11-09',
  approval_rate: 15.67,
  denial_rate: 87.27,
  biography: 'I was a judge',
  negative_keywords: 'brussel-sprouts',
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('judges')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('judges').insert(judges);
    });
};
