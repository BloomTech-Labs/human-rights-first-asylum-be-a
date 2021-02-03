const faker = require('faker');
const negative_tags = [...new Array(5)].map(() => ({
  negative_tag: `${faker.random.word()}`,
}));
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('negative_tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('negative_tags').insert(negative_tags);
    });
};
