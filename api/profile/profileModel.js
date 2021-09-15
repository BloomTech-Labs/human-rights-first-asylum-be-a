const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles')
    .leftJoin('roles', 'profiles.role_id', 'roles.role_id')
    .where({ pending: false });
};

const findAllPending = async () => {
  return await db('profiles')
    .leftJoin('roles', 'profiles.role_id', 'roles.role_id')
    .where({ pending: true });
};

const findBy = (filter) => {
  return db('profiles')
    .leftJoin('roles', 'profiles.role_id', 'roles.role_id')
    .where(filter);
};

const findById = async (user_id) => {
  const user = await db('profiles')
    .leftJoin('roles', 'profiles.role_id', 'roles.role_id')
    .where({ user_id })
    .first();
  let book_marked_cases = await db('book_mark_cases').where({ user_id });
  let book_marked_judges = await db('book_mark_judges').where({
    user_id,
  });

  if (book_marked_cases.length > 0) {
    let cases = [];
    for (let i = 0; i < book_marked_cases.length; i++) {
      const one_case = await db('cases as c')
        .join('judges as j', 'j.judge_id', 'c.judge_id')
        .select('c.*', 'j.first_name', 'j.middle_initial', 'j.last_name')
        .where({
          case_id: book_marked_cases[i].case_id,
        });
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
  if (user) {
    user['case_bookmarks'] = book_marked_cases;
    user['judge_bookmarks'] = book_marked_judges;
  }
  return user;
};

const create = (profile) => {
  return db('profiles').insert(
    profile.user_id ? { user_id: profile.user_id, ...profile } : profile,
    '*'
  );
};

const update = async (user_id, profile) => {
  await db('profiles')
    .where({ user_id })
    .first()
    .update(profile)
    .returning('*');
  return await db('profiles').orderBy('created_at');
};

const remove = async (user_id) => {
  await db('profiles').where({ user_id: user_id }).del();
  RemoveAllCaseWithUser_id(user_id);
  return await db('profiles');
};

const RemoveAllCaseWithUser_id = async (user_id) => {
  await db('cases').where({ user_id: user_id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const nameArray = profileObj.name.split(' ');
  const formattedProfile = {
    user_id: profileObj.id,
    email: profileObj.email,
    first_name: nameArray[0],
    last_name: nameArray[1],
  };
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
  if (foundProfile) {
    return foundProfile;
  } else {
    return await create(formattedProfile).then((newProfile) => {
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
  return await db('book_mark_cases').where({ user_id });
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
  RemoveAllCaseWithUser_id,
};
