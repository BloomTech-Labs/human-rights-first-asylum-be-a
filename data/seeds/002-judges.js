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
          name: 'David W. Crosland',
          judge_county: 'Baltimore',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          date_appointed: 'May 1997',
          approval_rate: 48.2,
          denial_rate: 51.8,
          biography: 'https://www.justice.gov/eoir/BaltimoreNatzCer03072012',
        },
        {
          name: 'Patricia A. Cole',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          date_appointed: 'Jul 1995',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Appears to be retired? https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf',
        },
        {
          name: 'David B. Holmes',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          date_appointed: 'Jun 1995',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Appears to be retired? https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf',
        },
        {
          name: 'Neil P. Miller',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          date_appointed: 'Jul 1999',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Appears to be retired? https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf',
        },
        {
          name: 'Linda S. Wendtland',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: '(unavailable)',
          birth_date: '(unavailable)',
          date_appointed: 'Aug 2008',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Appears to be retired? https://www.justice.gov/archive/opa/pr/2008/December/08-eoir-1110.html',
        },
        {
          name: 'Charles K. Adkins-Blanch',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Eric Holder',
          birth_date: '(unavailable)',
          date_appointed: 'Jan 2013',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'https://www.justice.gov/eoir/board-of-immigration-appeals-bios#CharlesAdkins-Blanch',
        },
        {
          name: 'Gary D. Malphrus',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'William P. Barr',
          birth_date: '(unavailable)',
          date_appointed: 'Sep 2020',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'https://www.justice.gov/eoir/board-of-immigration-appeals-bios#GarryMalphrus',
        },
        {
          name: 'John Guendelsberger',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Eric H. Holder, Jr.',
          birth_date: '(unavailable)',
          date_appointed: 'Aug 2009',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Appears to be retired?  https://www.justice.gov/opa/pr/attorney-general-holder-appoints-new-member-board-immigration-appeals',
        },
      ]);
    });
};
