const router = require('express').Router();
const Notifications = require('./notificationsModel');
// const authRequired = require('../middleware/authRequired');
const notificationValidation = require('../middleware/notificationValidation');

router.get('/:profileID', async (req, res) => {
  const { profileID } = req.params;
  const result = await Notifications.getAll(profileID);
  res.json(result);
});

router.get(
  '/:profileID/:notificationID',
  notificationValidation,
  async (req, res) => {
    const { notificationID } = req.params;
    const result = await Notifications.getOne(notificationID);
    res.json(result);
  }
);

router.put(
  '/:profileID/:notificationID',
  notificationValidation,
  async (req, res) => {
    const { notificationID } = req.params;
    const result = await Notifications.markAsRead(notificationID);
    res.json(result);
  }
);

module.exports = router;
