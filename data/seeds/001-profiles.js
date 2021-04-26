// Only 8 Okta-approved profiles
// ID 1 and 2 are admins, ID 3-8 are users
const profiles = [...new Array(6)].map((i, idx) => ({
  id: idx + 1,
  email: `llama00${idx + 1}@maildrop.cc`,
  firstName: idx < 2 ? `Admin` : `User`,
  lastName: idx < 2 ? `${idx + 1}` : `${idx + 1}`,
  role: idx < 2 ? 'admin' : 'user',
}));

/*
  Manually setting the `id` for each profile to the Okta provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/

profiles[0].id = '00ulzdrizE2yzxToH5d6';
profiles[1].id = '00ulzcegtVucXsfdp5d6';
profiles[2].id = '00ulzg60x94UujHsV5d6';
profiles[3].id = '00ulzenirO3Evj2U95d6';
profiles[4].id = '00ulzdb18iCY1wMep5d6';
profiles[5].id = '00ulzfj6nX79gu0Nh5d6';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
