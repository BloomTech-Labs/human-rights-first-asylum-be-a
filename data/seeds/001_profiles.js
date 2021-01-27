const faker = require('faker');

/*
// Faker-Data Profile Generator

const profiles = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
  is_admin: idx === 0 ? 1 : 0,
})); 
*/

// Only 8 Okta-approved profiles
// ID 1 and 2 are admins, ID 3-8 are users
const profiles = [...new Array(8)].map((i, idx) => ({
  id: idx + 1,
  email: `llama00${idx + 1}@maildrop.cc`,
  name: idx < 2 ? `Admin${idx + 1}` : `User${idx + 1}`,
  is_admin: idx < 2 ? 1 : 0,
  avatarUrl: faker.image.avatar(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
