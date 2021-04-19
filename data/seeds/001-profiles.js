// Only 8 Okta-approved profiles
// ID 1 and 2 are admins, ID 3-8 are users
const profiles = [...new Array(8)].map((i, idx) => ({
  id: idx + 1,
  email: `llama00${idx + 1}@maildrop.cc`,
  name: idx < 2 ? `Admin${idx + 1}` : `User${idx + 1}`,
  role: idx < 2 ? 'admin' : 'user',
}));

/*
  Manually setting the `id` for each profile to the Okta provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/

profiles[0].id = '00ulthapbErVUwVJy4x6';
profiles[1].id = '00ultwew80Onb2vOT4x6';
profiles[2].id = '00ultx74kMUmEW8054x6';
profiles[3].id = '00ultwqjtqt4VCcS24x6';
profiles[4].id = '00ultwz1n9ORpNFc04x6';
profiles[5].id = '00u13omswyZM1xVya4x7';
profiles[6].id = '00u13ol5x1kmKxVJU4x7';
profiles[7].id = '00u13oned0U8XP8Mb4x7';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
