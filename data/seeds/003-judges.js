const faker = require('faker');

// * This data was manually mocked based off of what we could find online about these judges
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('judges')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('judges').insert([
        {
          first_name: 'David',
          middle_initial: 'W',
          last_name: 'Crosland',
          county: 'Baltimore',
          image_url: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          date_appointed: 'May 1, 1997',
          biography: 'https://www.justice.gov/eoir/BaltimoreNatzCer03072012',
        },
        {
          first_name: 'Patricia',
          middle_initial: 'A',
          last_name: 'Cole',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          date_appointed: 'July 1, 1995',
          biography:
            'Appears to be retired? https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf',
        },
        {
          first_name: 'David',
          middle_initial: 'B',
          last_name: 'Holmes',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          date_appointed: 'June 1, 1995',
          biography:
            'Appears to be retired? https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf',
        },
        {
          first_name: 'Neil',
          middle_initial: 'P',
          last_name: 'Miller',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          date_appointed: 'July 1, 1999',
          biography:
            'Appears to be retired? https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf',
        },
        {
          first_name: 'Linda',
          middle_initial: 'S',
          last_name: 'Wendtland',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
          appointed_by: '(unavailable)',
          date_appointed: 'August 1, 2008',
          biography:
            'Appears to be retired? https://www.justice.gov/archive/opa/pr/2008/December/08-eoir-1110.html',
        },
        {
          first_name: 'Charles',
          middle_initial: 'K',
          last_name: 'Adkins-Blanch',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
          appointed_by: 'Eric Holder',
          date_appointed: 'January 1, 2013',
          biography:
            'https://www.justice.gov/eoir/board-of-immigration-appeals-bios#CharlesAdkins-Blanch',
        },
        {
          first_name: 'Gary',
          middle_initial: 'D',
          last_name: 'Malphrus',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
          appointed_by: 'William P. Barr',
          date_appointed: 'September 1, 2020',
          biography:
            'https://www.justice.gov/eoir/board-of-immigration-appeals-bios#GarryMalphrus',
        },
        {
          first_name: 'John',
          middle_initial: '',
          last_name: 'Guendelsberger',
          county: 'Virginia Falls',
          image_url: faker.image.avatar(),
          appointed_by: 'Eric H. Holder, Jr.',
          date_appointed: 'August 1, 2009',
          biography:
            'Appears to be retired?  https://www.justice.gov/opa/pr/attorney-general-holder-appoints-new-member-board-immigration-appeals',
        },
      ]);
    });
};
