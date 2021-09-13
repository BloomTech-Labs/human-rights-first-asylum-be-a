/* eslint-disable prettier/prettier */
const express = require('express');
const Cases = require('./caseModel');
const AWS = require('../../utils/AWS');
const Cache = require('../middleware/cache');
const CSV = require('csv-string');
const router = express.Router();
const authRequired = require('../middleware/authRequired');
const { onlyRoles } = require('../middleware/onlyRoles');

router.get('/', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Cases.findAll()
    .then((cases) => {
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/cases-by-state', (req, res) => {
  Cases.casesByState()
    .then((counts) => {
      res.status(200).json(counts);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/caseOutcome', (req, res) => {
  Cases.caseOutcome().then((data) => {
    res.json(data);
  });
});

router.get('/:id/view-pdf', (req, res) => {
  const id = String(req.params.id);
  AWS.make_params(id)
    .then((params) => {
      AWS.fetch_pdf_view(params, res);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/download-pdf', (req, res) => {
  // * returns pdf of ORIGINAL case
  const id = String(req.params.id);
  AWS.make_params(id)
    .then((params) => {
      AWS.fetch_pdf_download(params, res);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/download-csv', Cache.csvCache, (req, res) => {
  const id = String(req.params.id);
  const key = String(req.originalUrl);
  Cases.writeCSV(id)
    .then((csv) => {
      Cache.makeCache(key, CSV.stringify(csv));
      res.header('Content-Type', 'text/csv');
      res.attachment(`${id}_data.csv`);
      res.status(200).send(csv);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put('/:id', (req, res) => {
  delete req.body.first_name;
  delete req.body.middle_initial;
  delete req.body.last_name;
  const { id } = req.params
  Cases.update(id, req.body)
    .then((updatedCase) => {
      res.status(200).json(updatedCase);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
});

router.get('/user/:id', onlyRoles([1, 2]), (req, res) => {
  Cases.findByUserId(req.profile.user_id)
    .then((userCases) => {
      res.status(200).json(userCases);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get('/pending', (req, res) => {
  const key = String(req.originalUrl);
  Cases.findPending()
    .then((cases) => {
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put('/pending/approve/:id', (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  Cases.changeStatus(id, status)
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put('/update/:case_id', authRequired, (req, res) => {
  const case_id = req.params.case_id;
  req.body.status = 'Pending';
  Cases.updateCaseOnceSraped(case_id, req.body).then((data) => {
    res.json(data);
  });
});

router.put('/pending/reject/:id', (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  Cases.changeStatus(id, status)
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/pending/user/:user_id', authRequired, (req, res) => {
  Cases.findCasesByUser_id(req.profile.user_id)
    .then((userCases) => {
      res.status(200).json(userCases);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Cases.remove(id).then(() => {
      res.status(200).json({ message: `case '${id}' is deleted.` });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete case with ID: ${id}`,
      error: err.message,
    });
  }
});

//updates the comment on case
router.put('/comment/:case_id', (req, res) => {
  const updatedComment = req.body;
  Cases.update(req.params.case_id, updatedComment)
    .then(() => {
      res.status(200).json({
        message: `Comment changed to '${updatedComment.comment}'.`,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  const id = String(req.params.id);
  const key = String(req.originalUrl);
  Cases.findById(id)
    .then((cases) => {
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
