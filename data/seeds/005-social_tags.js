const faker = require('faker');
const social_tags = [...new Array(5)].map(() => ({
  social_tag: `${faker.random.word()}`,
}));
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('social_tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('social_tags').insert(social_tags);
    });
};
