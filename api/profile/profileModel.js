const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles');
};

const findAllPending = async () => {
  return await db('pending_profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findPendingBy = (filter) => {
  return db('pending_profiles').where(filter);
};

const findById = async (user_id) => {
  const user = await db('profiles').where({ user_id }).first().select('*');
  let book_marked_cases = await db('book_mark_cases').where({ user_id });
  let book_marked_judges = await db('book_mark_judges').where({
    user_id
  });

  if (book_marked_cases.length > 0) {
    let cases = [];
    for (let i = 0; i < book_marked_cases.length; i++) {
      const one_case = await db('cases')
        .where({
          case_id: book_marked_cases[i].case_id,
        })
        .select('*');

      cases.push(Object.values(one_case)[0]);
    }
    book_marked_cases = cases;
  }

  if (book_marked_judges.length > 0) {
    let judges = [];
    for (let i = 0; i < book_marked_judges.length; i++) {
      const one_judge = await db('judges')
        .where({
          judge_id: book_marked_judges[i].judge_id,
        })
        .select('*');
      judges.push(Object.values(one_judge)[0]);
    }
    book_marked_judges = judges;
  }

  user['case_bookmarks'] = book_marked_cases;
  user['judge_bookmarks'] = book_marked_judges;

  return user;
};

const findPendingById = async (user_id) => {
  const user = await db('pending_profiles')
    .where({ user_id })
    .first()
    .select('*');
  return user;
};

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
};

const createPending = async (profile) => {
  return db('pending_profiles').insert(profile).returning('*');
};

const update = (user_id, profile) => {
  return db('profiles')
    .where({ user_id })
    .first()
    .update(profile)
    .returning('*');
};

const remove = async (user_id) => {
  return await db('profiles').where({ user_id }).del();
};

const removePending = async (id) => {
  return await db('pending_profiles').where({ id }).del();
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

const add_judge_bookmark = async (user_id, judge_id) => {
  await db('book_mark_judges').insert({ user_id, judge_id });
  return await db('book_mark_judges').where({ user_id });
};

const remove_judge_bookmark = async (user_id, judge_id) => {
  await db('book_mark_judges').where({ user_id, judge_id }).del();
  return await db('book_mark_judges').where({ user_id });
};

const add_case_bookmark = async (user_id, case_id) => {
  await db('book_mark_cases').insert({ user_id, case_id });
  return await db('book_mark_cases').where({ user_id });
};

const remove_case_bookmark = async (user_id, case_id) => {
  await db('book_mark_cases').where({ user_id, case_id }).del();
  return await db('book_mark_cases').where({user_id});
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateProfile,
  add_judge_bookmark,
  add_case_bookmark,
  remove_judge_bookmark,
  remove_case_bookmark,
  findAllPending,
  findPendingBy,
  findPendingById,
  createPending,
  removePending,
};
