const express = require('express');
const PendingCase = require('./pendingCaseModel');
const Cases = require('../cases/caseModel');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

router.use(authRequired);

router.get('/', (req, res) => {
  PendingCase.getAll()
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});
router.get('/:user_id', (req, res) => {
  PendingCase.getByUserId(req.profile.user_id)
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/approve/:pending_case_id', (req, res) => {
  const UUID = req.params.pending_case_id;
  const uploadedCase = {
    date: req.body.date,
    case_outcome: req.body.case_outcome,
    country_of_origin: req.body.country_of_origin,
    protected_grounds: req.body.protected_grounds,
    application_type: req.body.application_type,
    case_origin_city: req.body.case_origin_city,
    case_origin_state: req.body.case_origin_state,
    gender: req.body.gender,
    applicant_language: req.body.applicant_language,
    indigenous_group: req.body.indigenous_group,
    type_of_violence: req.body.type_of_violence,
    appellate: req.body.appellate,
    filed_in_one_year: req.body.filed_in_one_year,
    credible: req.body.credible,
  };
  PendingCase.update(UUID, uploadedCase)
    .then(() => {
      PendingCase.getByCaseId(UUID)
        .then((caseData) => {
          const approvedCase = {};
          for (const field in caseData) {
            if (field === 'pending_case_id') {
              approvedCase['case_id'] = caseData[field];
            } else if (field === 'status') {
              continue;
            } else if (field === 'uploaded') {
              continue;
            } else if (field === 'file_name') {
              continue;
            } else {
              approvedCase[field] = caseData[field];
            }
          }
          Cases.add(approvedCase)
            .then(() => {
              PendingCase.remove(UUID)
                .then(() => {
                  res.status(200).json({});
                })
                .catch((err) => {
                  res.status(500).json(err.message);
                });
            })
            .catch((err) => {
              res.status(500).json(err.message);
            });
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    })
    .catch((err) => {
      PendingCase.changeStatus(UUID, 'Error');
      res.status(500).json(err.message);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    PendingCase.remove(id).then(() => {
      res.status(200).json({ message: `case '${id}' is deleted.` });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete case with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
