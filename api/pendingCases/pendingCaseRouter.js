const express = require('express');
const PendingCase = require('./pendingCaseModel');
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
  PendingCase.getById(req.profile.user_id)
    .then((cases) => {
      res.status(200).json(cases);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//  reference for future
// router.post('/approve', async (req, res) => {
//   const id = req.body.id;
//   PendingCase.approve(id)
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((e) => {
//       res.status(500).json({ message: e.message });
//     });
// });

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
