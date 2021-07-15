// * Faker is a library used here to make seeding easier

const faker = require('faker');
const protected_grounds = [...new Array(5)].map(() => ({
  protected_grounds: `${faker.random.word()}`,
}));
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('protected_grounds')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('protected_grounds').insert(protected_grounds);
    });
};
