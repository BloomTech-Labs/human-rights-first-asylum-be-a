const Judge = require('../judges/judgeModel');
const Case = require('../cases/caseModel');

// * Middleware for Judge & Case

const verifyJudge = (req, res, next) => {
  const name = String(req.params.name);
  Judge.findByName(name)
    .then((res) => {
      if (res) {
        next();
      } else {
        res.status(404).json(err.message);
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const verifyCase = (req, res, next) => {
  const id = String(req.params.id);
  Case.findById(id)
    .then((res) => {
      if (res) {
        next();
      } else {
        res.status(404).json(err.message);
      }
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

module.exports = {
  verifyCase,
  verifyJudge,
};
