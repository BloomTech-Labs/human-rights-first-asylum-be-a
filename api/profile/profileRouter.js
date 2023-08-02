const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('./profileModel');
const router = express.Router();
const { onlyRoles } = require('../middleware/onlyRoles');

//TODO /:id verify && judge verify && case verify

router.get('/', authRequired, onlyRoles([1]), function (req, res) {
  Profiles.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/pending', authRequired, onlyRoles([1]), function (req, res) {
  Profiles.findAllPending()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post('/', authRequired, onlyRoles([1]), async (req, res) => {
  const profile = req.body;
  const newUser = {
    profile: {
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
      login: profile.email,
    },
  };
  if (profile) {
    try {
      client.createUser(newUser).then((user) => {
        const appUser = {
          user_id: user.id,
          email: user.profile.email,
          first_name: user.profile.firstName,
          last_name: user.profile.lastName,
          role_id: profile.role_id,
          pending: true,
        };
        Profiles.create(appUser).then((data) => {
          res.status(200).json({
            message: 'profile created by admin,',
            profile: data,
          });
        });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Profile missing' });
  }
});

router.put('/:id', authRequired, onlyRoles([1]), (req, res) => {
  const id = req.params.id;
  Profiles.update(id, { pending: false }).then(() => {
    res.status(200).json({
      message: 'profile updated',
    });
  });
});

router.delete('/:id', authRequired, onlyRoles([1]), (req, res) => {
  const id = req.params.id;
  try {
    Profiles.findById(id).then(() => {
      client
        .getUser(id)
        .then((user) => {
          user.deactivate().then(() => user.delete());
        })
        .catch(() => res.json({ message: 'Okta failed to delete this user' }));
      Profiles.remove(id).then(() => {
        res.status(200).json({
          message: `Profile '${id}' was deleted.`,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete profile with ID: ${id}`,
      error: err.message,
    });
  }
});

router.post('/:id/judge/:name', authRequired, (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  Profiles.add_judge_bookmark(id, name)
    .then((data) => {
      res
        .status(200)
        .json({ message: 'Bookmark Added', judge_bookmarks: data });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.post('/:id/case/:case_id', authRequired, (req, res) => {
  const id = req.params.id;
  const case_id = req.params.case_id;
  Profiles.add_case_bookmark(id, case_id)
    .then((data) => {
      res.status(200).json({ message: 'Bookmark Added', case_bookmarks: data });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.delete('/:id/judge/:judge_id', authRequired, (req, res) => {
  const id = req.params.id;
  const judge_id = req.params.judge_id;
  Profiles.remove_judge_bookmark(id, judge_id)
    .then((data) => {
      res.status(200).json({
        message: `Bookmark '${judge_id}' was deleted.`,
        judge_bookmarks: data,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.delete('/:id/case/:case_id', authRequired, (req, res) => {
  const id = req.params.id;
  const case_id = req.params.case_id;
  Profiles.remove_case_bookmark(id, case_id)
    .then(() => {
      res.status(200).json({ message: `Bookmark '${case_id}' was deleted.` });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get('/:id', authRequired, onlyRoles([1]), function (req, res) {
  const id = String(req.params.id);
  Profiles.findById(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'Profile Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
