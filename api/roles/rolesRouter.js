const express = require('express');
const authRequired = require('../middleware/authRequired');
const Roles = require('./rolesModel');
const router = express.Router();
const { onlyRoles } = require('../middleware/onlyRoles');

router.get('/', authRequired, function (req, res) {
  Roles.getAll()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:role_id', authRequired, (req, res) => {
  const role_id = req.params.role_id;
  Roles.getRoleById(role_id)
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: err.message });
    });
});

router.get('/:role_name', authRequired, (req, res) => {
  const role_name = req.params.role_name;
  Roles.getRoleByName(role_name)
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({ message: err.message });
    });
});

router.put('/:role_id', authRequired, onlyRoles([1]), async (req, res) => {
  const role_id = req.params.role_id;
  const { role_name } = req.body;
  if (role_name) {
    const role = await Roles.getRoleById(role_id);
    if (role) {
      Roles.update(role_id, { role_name })
        .then((role) => {
          res.status(201).json(role);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(400).json({ message: 'Role required to update' });
  }
});

module.exports = router;
