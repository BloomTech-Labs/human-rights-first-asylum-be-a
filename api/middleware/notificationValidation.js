const { getOne } = require('../notifications/notificationsModel');

const notificationValidation = async (req, res, next) => {
  req.notification_id = req.params.notificationID;
  try {
    const notification_id = await getOne(req.notification_id);
    if (!notification_id || notification_id === undefined) {
      res.json({
        status: 400,
        message: 'Notification ID not found',
      });
      next({
        status: 400,
        message: 'Notification ID not found',
      });
    } else {
      req.notification_id = notification_id;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = notificationValidation;
