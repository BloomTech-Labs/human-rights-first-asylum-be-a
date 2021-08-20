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

router.get('/:notif_type', (req, res) => {
  const { notif_type } = req.params;
  if (isNaN(notif_type)) {
    Type.getNotifTypeByName(notif_type)
      .then((notif_type) => {
        if (!notif_type) throw new Error('Not Found');
        res.status(200).json(notif_type);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err.message });
      });
  } else {
    Type.getNotifTypeById(notif_type)
      .then((notif_type) => {
        if (!notif_type) throw new Error('Not Found');
        res.status(200).json(notif_type);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err.message });
      });
  }
});

module.exports = router;
