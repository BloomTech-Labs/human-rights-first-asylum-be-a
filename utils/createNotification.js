const db = require('../data/db-config');

const createNotification = async (user_idInput, titleInput, textInput) => {
  const objectOrVariable = user_idInput.user_id
    ? user_idInput.user_id
    : user_idInput;
  const addedNotification = await db('notifications').insert(
    {
      user_id: `${objectOrVariable}`,
      title: `${titleInput}`,
      text: `${textInput}`,
    },
    ['notification_id']
  );
  return addedNotification;
};

module.exports = createNotification;
