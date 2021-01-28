const faker = require('faker');

/*
Old Faker Data-Generator
const judges = [...new Array(5)].map((i, idx) => ({
  judge_image: faker.image.avatar(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
  judge_county: `${faker.random.word()}`,
  appointed_by:
    idx === 0 ? 'Trump' : `${faker.name.firstName()} ${faker.name.lastName()}`,
  birth_date: '01-11-09',
  date_appointed: '01-11-09',
  approval_rate: 15.67,
  denial_rate: 87.27,
  biography: 'I was a judge',
}));
*/

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('judges')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('judges').insert([
        {
          judge_name: 'David W. Crosland',
          judge_county: 'Baltimore',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          approval_rate: 48.2,
          denial_rate: 51.8,
          biography:
            'Attorney General Janet Reno appointed Judge Crosland in May 1997. Judge Crosland received a bachelor of science degree in 1959 from Auburn University and a juris doctorate in 1966 from the University of Alabama. From April 2008 to July 2008, he served as a temporary board member with the Board of Immigration Appeals in Falls Church, Va. From October 2006 to April 2008, he served as assistant chief immigration judge (ACIJ) in Miami. From June 2000 to October 2006, Judge Crosland served as an ACIJ in the Office of the Chief Immigration Judge in Falls Church, Va. From May 1997 to June 2000, he worked as an immigration judge at the immigration court in Otay Mesa, Calif. From 1981 to 1987, Judge Crosland practiced immigration law in Washington, D.C., as a partner with the law firms of Ober, Kaler, Grimes & Shriver and Crosland, Strand, Freeman & Mayock. From 1977 to 1981, he served as general counsel and acting commissioner for the former Immigration and Naturalization Service. From 1990 to 1997, he worked as an adjunct professor of law at George Washington School of Law and in 1997 at the District of Columbia School of Law. Judge Crosland is a member of the Alabama State Bar, the District of Columbia Bar, and the State Bar of Georgia. (from https://www.justice.gov/eoir/BaltimoreNatzCer03072012',
        },
        {
          judge_name: 'Patricia A. Cole',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'APPEARS TO BE RETIRED?  Attorney General Janet Reno appointed Patricia A. Cole in July 1995. Ms. Cole received a bachelor of science degree in 1971 from Wilson College, Chambersburg, Pa., and a juris doctorate in 1981 from the University of Maryland. From 1993 to 1995, she was a senior policy analyst at the U.S. Commission on Immigration Reform in Washington, D.C. From 1987 to 1993, Ms. Cole served at the former Immigration and Naturalization Service (INS) as appellate counsel, associate general counsel, legislative counsel, and assistant general counsel. From 1985 to 1987, she was a trial attorney for INS in Houston. Ms. Cole is a member of the Maryland State Bar. (from https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf)',
        },
        {
          judge_name: 'David B. Holmes',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'APPEARS TO BE RETIRED?   Attorney General Janet Reno appointed David B. Holmes in June 1995. Mr. Holmes received a bachelor of arts degree in 1970 from Middlebury College and a juris doctorate in 1973 from the National Law Center, George Washington University. From 2003 to 2005, he served as acting Vice Chairman. From 1977 to 1981, Mr. Holmes worked as an attorney advisor, and from 1981 to 1995, he served as the BIA’s chief attorney examiner. From 1974 to 1977, he served on active duty as a captain in the U.S. Army. Mr. Holmes is a member of the District of Columbia and Commonwealth of Virginia Bars. (from https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf)',
        },
        {
          judge_name: 'Neil P. Miller',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Janet Reno',
          birth_date: '(unavailable)',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'APPEARS TO BE RETIRED? Attorney General Janet Reno appointed Neil P. Miller in July 1999. Mr. Miller received a bachelor of arts degree in 1967 and a juris doctorate in 1974, both from the University of Arizona. From 1995 to 1999, he served as the chief attorney examiner for the BIA. From 1987 to 1995, he served as a deputy chief attorney examiner with the BIA. From 1980 to 1987, Mr. Miller worked for the BIA as an attorney advisor. Mr. Miller was in private practice in Tucson, Arizona, and worked with the Foreign Operations Section of the Passport Office, Department of State. Mr. Miller is a member of the State Bar of Arizona. (from https://www.justice.gov/sites/default/files/eoir/legacy/2014/02/04/BIA_Bios_February2014.pdf)',
        },
        {
          judge_name: 'Linda S. Wendtland',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: '(unavailable)',
          birth_date: '(unavailable)',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'APPEARS TO BE RETIRED? Linda Wendtland was appointed as a member of the BIA in August 2008.  She received a juris doctorate in 1985 from the University of Virginia.  From May 1996 to August 2008, Ms. Wendtland served as Assistant Director and Senior Litigation Counsel at the Office of Immigration Litigation (OIL), Civil Division, DOJ.  From October 1990 to May 1996, she was in private practice.  From August 1985 to October 1990, Ms. Wendtland served as a trial attorney at OIL, entering on duty through the Attorney General’s Honor Program.  She is a member of the Virginia and District of Columbia bars. (from https://www.justice.gov/archive/opa/pr/2008/December/08-eoir-1110.html)',
        },
        {
          judge_name: 'Charles K. Adkins-Blanch',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Eric Holder',
          birth_date: '(unavailable)',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Attorney General Eric Holder appointed Charles Adkins-Blanch as Deputy Chief Appellate Immigration Judge of the Board of Immigration Appeals in January 2013. Deputy Chief Judge Adkins-Blanch received a bachelor of arts degree in 1984 from Grinnell College and a juris doctorate in 1990 from the National Law Center, George Washington University. He served as a board member from 2008 until his appointment as Deputy Chief Judge. From 2004 to 2008, he served as an immigration judge at the Headquarters Immigration Court and, from 1995 to 2004, Deputy Chief Judge Adkins-Blanch served in EOIR’s Office of the General Counsel, as general counsel from 2000 to 2004, as acting general counsel from 1999 to 2000, and as an associate general counsel from 1995 to 1999. From 1990 to 1995, he worked for the Board as an attorney advisor entering on duty through the Attorney General’s Honors Program. From 1989 to 1990, he clerked in private practice with the firm of Maggio & Kattar, specializing in immigration and nationality law. Deputy Chief Judge Adkins-Blanch is a member of the District of Columbia and Virginia State Bars. (from https://www.justice.gov/eoir/board-of-immigration-appeals-bios#CharlesAdkins-Blanch)',
        },
        {
          judge_name: 'Gary D. Malphrus',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'William P. Barr',
          birth_date: '(unavailable)',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Attorney General William P. Barr appointed Garry D. Malphrus as a deputy chief appellate immigration judge in September 2020. Judge Malphrus earned a Bachelor of Arts in 1989 from the University of South Carolina and a Juris Doctor in 1993 from the University of South Carolina. From August 2008 to September 2020, he served on the Board of Immigration Appeals, Executive Office for Immigration Review, including as acting Board Chairman from October 2019 to May 2020. From 2005 to 2008, he served as an immigration judge at the Arlington Immigration Court. From 2001 to 2005, he served as associate director of the White House Domestic Policy Council. From 1997 to 2001, he worked for the U.S. Senate Committee on the Judiciary, which included serving as chief counsel and staff director on the Subcommittee on Criminal Justice Oversight and the Subcommittee on the Constitution. From 1995 to 1997, Garry served as a law clerk for the Honorable Dennis W. Shedd, U.S. District Judge for the District of South Carolina. From 1994 to 1995, he was a law clerk for the Honorable William W. Wilkins of the U.S. Court of Appeals for the Fourth Circuit. From 1993 to 1994, he was a law clerk for the Honorable Larry R. Patterson, Circuit Judge for South Carolina. Judge Malphrus is a member of the South Carolina Bar. (from https://www.justice.gov/eoir/board-of-immigration-appeals-bios#GarryMalphrus)',
        },
        {
          judge_name: 'John Guendelsberger',
          judge_county: 'Virginia Falls',
          judge_image: faker.image.avatar(),
          appointed_by: 'Eric H. Holder, Jr.',
          birth_date: '(unavailable)',
          approval_rate: 0,
          denial_rate: 0,
          biography:
            'Appears to be retired?  Attorney General Eric H. Holder, Jr., announced today the appointment John H. Guendelsberger as a new member of the Board of Immigration Appeals (BIA). The BIA is part of the Justice Department’s Executive Office for Immigration Review located in Falls Church, Va., and is responsible for hearing appeals of decisions rendered by immigration judges or certain Department of Homeland Security officers. It is the highest administrative body for interpreting and applying Federal immigration laws.Mr. Guendelsberger has served as senior counsel to BIA’s board chairman since October 2003. During this time, from May 2007 to July 2009, he has served as a temporary board member. He previously served as a board member from September 1995 to October 2003. Mr. Guendelsberger worked for three years as a staff attorney with Ohio Legal Rights Service, a state agency advocating the rights of persons with mental or developmental disabilities. From 1980 to 1995, he was a professor of law at Ohio Northern University College of Law where he specialized in immigration law, comparative law and international law. Mr. Guendelsberger has written numerous articles in the area of immigration law and has represented aliens on a pro bono basis before Immigration Judges and the Board.He received his juris doctorate from Ohio State University College of Law in 1977. Mr. Guendelsberger also earned a number of advanced degrees in law including a master of laws degree and a doctor of science of law degree from Columbia University School of Law and a diploma of advanced studies from the University of Paris (Pantheon-Sorbonne). He is a member of the Ohio Bar. (from https://www.justice.gov/opa/pr/attorney-general-holder-appoints-new-member-board-immigration-appeals)',
        },
      ]);
    });
};
