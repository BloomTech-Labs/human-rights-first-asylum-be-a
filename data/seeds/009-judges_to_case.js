exports.seed = function (knex) {
  return knex('judges_to_case').insert([
    {
      case_id: '099f113a-3514-45be-a2c7-9257eded3fe7',
      judge_id: 1,
    },
    {
      case_id: '099f113a-3514-45be-a2c7-9257eded3fe7',
      judge_id: 2,
    },
    {
      case_id: '099f113a-3514-45be-a2c7-9257eded3fe7',
      judge_id: 3,
    },
    {
      case_id: '099f113a-3514-45be-a2c7-9257eded3fe7',
      judge_id: 4,
    },
  ]);
};
