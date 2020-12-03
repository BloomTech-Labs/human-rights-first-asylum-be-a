const faker = require(faker);

const country = [...new Array(5)].map((i, idx) => ({
  country_name:
    idx === 0
      ? 'Test001 Country'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
  approval_rate: faker.random.number(),
  denial_rate: faker.random.number(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('country').insert(country);
    });
};
