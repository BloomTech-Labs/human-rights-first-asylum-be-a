const faker = require(faker);

const judges = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  judge_image: faker.image.avatar(),
  judge_name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
  judge_county: faker.random.word(),
  appointed_by: idx === 0 ? 'Trump' : `${faker.name.lastName()}`,
  birth_date: faker.date.recent(),
  date_appointed: faker.date.recent(),
  approval_rate: faker.random.number(),
  denial_rate: faker.random.number(),
  biography: faker.random.words(56),
  positive_keywords: faker.random.words(15),
  negative_keywords: faker.random.words(32),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('judges').insert(judges);
    });
};
