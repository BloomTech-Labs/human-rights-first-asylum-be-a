// Only 8 Okta-approved profiles
// ID 1 and 2 are admins, ID 3 is moderator, 4-8 are users
const profiles = [...new Array(9)].map((i, idx) => ({
  user_id: idx + 1,
  email: `llama00${idx + 1}@maildrop.cc`,
  first_name: idx < 2 ? `Admin` : idx == 2 ? `Moderator` : `User`,
  last_name: idx < 2 ? `${idx + 1}` : `${idx + 1}`,
  role_id: idx < 2 ? 1 : idx == 2 ? 2 : 3,
  pending: idx < 6 ? false : true,
}));

/*
  Manually setting the `id` for each profile to the Okta provided ID. Adding
  profiles was not in scope for this iteration, but adding profiles in the 
  future will require the okta-id to be set as the `id` for each profile.
*/
profiles[0].user_id = '00u19v1wwrVU5Ui1j5d7';
profiles[1].user_id = '00u1humq824KiXNFp5d7';
profiles[2].user_id = '00u19v66wqTNTSBw85d7';
profiles[3].user_id = '00ulzenirO3Evj2U95d6';
profiles[4].user_id = '00ulzdb18iCY1wMep5d6';
profiles[5].user_id = '00ulzfj6nX79gu0Nh5d6';

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
