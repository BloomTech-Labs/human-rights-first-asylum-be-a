const express = require('express');
const Notif = require('./notifModel');
const router = express.Router();

router.get('/', (req, res) => {
  Notif.getAllNotifTypes()
    .then((notif_types) => {
      res.status(200).json(notif_types);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:notif_type', (req, res) => {
  const notif_type = req.params.notif_type;
  if (isNaN(notif_type)) {
    Notif.getNotifByName(notif_type)
      .then((notif_type) => {
        if (!notif_type) throw new Error('Not Found');
        res.status(200).json(notif_type);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err.message });
      });
  } else {
    Notif.getNotifById(notif_type)
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
