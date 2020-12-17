const faker = require('faker');
const protected_tags = [...new Array(5)].map((i, idx) => ({
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
