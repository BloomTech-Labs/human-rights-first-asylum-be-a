const express = require('express');
const Type = require('./typeModel');
const router = express.Router();

router.get('/', (req, res) => {
  Type.getAllNotifTypes()
    .then((notif_types) => {
      res.status(200).json(notif_types);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:notif_id', (req, res, next) => {
  const { notif_id } = req.params;
  Type.getNotifTypeById(notif_id)
    .then((notif_type) => {
      if (!notif_type) throw new Error('not found by notif_id');
      res.status(200).json(notif_type);
    })
    .catch((err) => {
      if (isNaN(notif_id)) {
        return next();
      }
      console.error(err);
      res.status(404).json({ message: err.message });
    });
});

router.get('/:notif_name', (req, res) => {
  const { notif_name } = req.params;
  Type.getNotifTypeByName(notif_name)
    .then((notif_type) => {
      if (!notif_type) throw new Error('not found by notif_name');
      res.status(200).json(notif_type);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: err.message });
    });
});

module.exports = router;
