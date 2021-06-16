const express = require('express');
const Cases = require('./caseModel');
const AWS = require('../../utils/AWS');
const Verify = require('../middleware/verifyDataID');
const Cache = require('../middleware/cache');
const CSV = require('csv-string');
const router = express.Router();
const authRequired = require('../middleware/authRequired');

router.use('/:id', authRequired, Verify.verifyCase);

router.get('/', Cache.checkCache, (req, res) => {
  const key = String(req.originalUrl);
  Cases.findAll()
    .then((cases) => {
      Cache.makeCache(key, JSON.stringify(cases));
      res.status(200).json(cases);
    })
    .catch((err) => {
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
  Cases.update(req.params.id, req.body)
    .then((updatedCase) => {
      res.status(200).json(updatedCase);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get('/user/:id', (req, res) => {
  Cases.findByUserId(req.profile.user_id)
    .then((userCases) => {
      res.status(200).json(userCases);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// Pending Cases

router.get('/pending', Cache.checkCache, (req, res) => {
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

router.get('/pending/user/:id', (req, res) => {
  Cases.findPendingByUserId(req.profile.user_id)
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
router.put('/comment/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  Cases.update(id, updatedComment)
    .then(() => {
      res.status(200).json({
        message: `Comment on ${id} changed to '${updatedComment.comment}'.`,
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
