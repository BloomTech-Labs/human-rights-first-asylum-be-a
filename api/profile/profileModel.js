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
  let book_marked_cases = await db('book_mark_cases').where({ user_id: id });
  let book_marked_judges = await db('book_mark_judges').where({ user_id: id });

  if (book_marked_cases.length > 0) {
    const cases = [];
    for (let i = 0; i < book_marked_cases.length; i++) {
      const one_case = await db('cases')
        .where({
          id: book_marked_cases[i].case_id,
        })
        .select('*');

      cases.push({
        case_id: one_case.id,
        case_url: one_case.case_url,
        court_type: one_case.court_type,
        hearing_type: one_case.hearing_type,
        refugee_origin: one_case.refugee_origin,
        hearing_location: one_case.hearing_location,
        protected_ground: one_case.protected_ground,
        hearing_date: one_case.hearing_location,
        decision_date: one_case.decision_date,
        credibility_of_refugee: one_case.credibility_of_refugee,
        case_status: one_case.case_status,
        social_group_type: one_case.social_group_type,
        judge_decision: one_case.judge_decision,
        judge_name: one_case.judge_name,
      });
      book_marked_cases = cases;
    }
    if (book_marked_judges.length > 0) {
      const judges = [];
      for (let i = 0; i < book_marked_judges.length; i++) {
        const one_judge = await db('judges')
          .where({
            name: book_marked_judges[i].judge_name,
          })
          .select('*');
        judges.push({
          name: one_judge.name,
          judge_county: one_judge.county,
          judge_image: one_judge.image,
          date_appointed: one_judge.date_appointed,
          birth_date: one_judge.birth_date,
          biography: one_judge.biography,
          positive_keywords: one_judge.positive_keywords,
          negative_keywords: one_judge.negative_keywords,
          denial_rate: one_judge.denial_rate,
          approval_rate: one_judge.approval_rate,
          appointed_by: one_judge.appointed_by,
        });
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

// const add_bookmark
const add_judge_bookmark = async (user_id, judge_name) => {
  await db('book_mark_judges').insert({ user_id, judge_name });

  return await db('book_mark_judges').where({ user_id });
};

const add_case_bookmark = async (user_id, case_id) => {
  await db('book_mark_cases').insert({ user_id, case_id });

  return await db('book_mark_cases').where({ user_id });
};
// const remove_bookmark

const remove_judge_bookmark = async (user_id, judge_name) => {
  return await db('book_mark_judges').where({ user_id, judge_name }).del();
};

const remove_case_bookmark = async (user_id, case_id) => {
  return await db('book_mark_cases').where({ user_id, case_id }).del();
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
};
