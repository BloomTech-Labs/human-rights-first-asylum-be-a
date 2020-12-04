const Judge = require('../judges/judgeModel');
const Case = require('../cases/caseModel');

/* Middleware for Judge & Case - */

// import judgeModel
// import caseModel

const verifyJudge = (req, res, next) => {
  const id = String(req.params.id);
  Judge.findById(id)
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
