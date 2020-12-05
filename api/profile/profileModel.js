const db = require('../../data/db-config');

//add functionality to add/remove bookmarks

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (id) => {
  const user = await db('profiles').where({ id }).first().select('*');
  const book_marked_cases = await db('book_mark_cases');
  const book_marked_judges = await db('book_mark_judges');

  if (book_marked_cases.length > 0) {
    const cases = [];
    for (let i = 0; i < book_marked_cases.length; i++) {
      const one_case = await db('cases')
        .where({
          case_id: book_marked_cases[i].case_id,
        })
        .select('case_id', 'case_status');

      cases.push({
        case_id: one_case.case_id,
        case_status: one_case.case_status,
      });
      book_marked_cases = cases;
    }
    if (book_marked_judges.length > 0) {
      const judges = [];
      for (let i = 0; i < book_marked_judges.length; i++) {
        const judge = await db('judges').where({
          name: book_marked_judges[i].name,
          judge_image: book_marked_judges[i].judge_image,
          judge_county: book_marked_judges[i].judge_county,
        });
        judges.push(judge);
      }
      book_marked_judges = judges;
    }
  }
  user['case_bookmarks'] = book_marked_cases;
  user['judge_bookmarks'] = book_marked_judges;

  return user;
};

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
};

const update = (id, profile) => {
  return db('profiles')
    .where({ id: id })
    .first()
    .update(profile)
    .returning('*');
};

// const add_bookmark
// const remove_bookmark

const remove = async (id) => {
  return await db('profiles').where({ id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
  if (foundProfile) {
    return foundProfile;
  } else {
    return await create(profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateProfile,
};
