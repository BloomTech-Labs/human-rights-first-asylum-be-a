const express = require('express');
const Notif = require('./notifModel');
const router = express.Router();

router.get('/', (req, res) => {
  Notif.getAllNotifs()
    .then((notif) => {
      res.status(200).json(notif);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Notif.getNotifById(id)
    .then((notif) => {
      notif ? res.status(200).json(notif) : next();
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: err.message });
    });
});

router.post('/', (req, res) => {
  const { user_id, notif_id } = req.body;
  if (!user_id && !notif_id) {
    res.status(400).json({ message: 'user_id and notif_id are missing' });
  } else if (!user_id) {
    res.status(400).json({ message: 'user_id missing' });
  } else if (!notif_id) {
    res.status(400).json({ message: 'notif_id missing' });
  }
  if (isNaN(notif_id) || notif_id < 0 || notif_id > 3) {
    res.status(422).json({ message: 'notif_id is invalid' });
  }
  Notif.create({ user_id, notif_id })
    .then((notif) => {
      res
        .status(200)
        .json({ message: 'notification created', notif: notif[0] });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Notif.remove(id)
    .then((notif) => {
      res
        .status(200)
        .json({ message: 'notification deleted', notif: notif[0] });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
