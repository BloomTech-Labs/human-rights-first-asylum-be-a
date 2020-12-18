const faker = require('faker');
const positive_tags = [...new Array(5)].map((i, idx) => ({
  positive_tag: `${faker.random.word()}`,
}));
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('positive_tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('positive_tags').insert(positive_tags);
    });
};
