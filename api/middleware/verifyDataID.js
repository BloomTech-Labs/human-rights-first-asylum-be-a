const Judge = require('../judges/judgeModel');
const Case = require('../cases/caseModel');

// * Middleware for Judge & Case

const verifyJudge = (req, res, next) => {
  const name = String(req.params.name);
  Judge.findByName(name)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const verifyJudgeId = (req, res, next) => {
  Judge.findById(req.params.judge_id)
    .then((judge) => {
      judge
        ? next()
        : res
            .status(404)
            .json({ message: 'No judge found with that judge_id' });
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const verifyCase = (req, res, next) => {
  const id = String(req.params.id);
  Case.findById(id)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

module.exports = {
  verifyCase,
  verifyJudge,
  verifyJudgeId,
};
