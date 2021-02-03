// * Faker is a library used here to make seeding easier

const faker = require('faker');
const protected_tags = [...new Array(5)].map(() => ({
  ground_tag: `${faker.random.word()}`,
}));
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('protected_tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('protected_tags').insert(protected_tags);
    });
};
