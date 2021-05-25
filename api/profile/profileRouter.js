const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('./profileModel');
const router = express.Router();
const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_SDK_TOKEN,
  clientId: process.env.OKTA_CLIENT_ID,
});

//TODO /:id verify && judge verify && case verify

router.get('/', authRequired, function (req, res) {
  Profiles.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/pending', authRequired, function (req, res) {
  Profiles.findAllPending()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', authRequired, function (req, res) {
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

router.get('/pending/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Profiles.findPendingById(id)
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

router.post('/', authRequired, async (req, res) => {
  const profile = req.body;
  const newUser = {
    profile: {
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
      login: profile.email,
    }, //might be missing credentials object (reference docs: https://developer.okta.com/okta-sdk-nodejs/jsdocs/#create-a-user)
  };
  if (profile) {
    const id = profile.id || 0;
    try {
      Profiles.findPendingById(id).then((pf) => {
        if (pf) {
          Profiles.removePending(pf.id).catch((err) => {
            throw err;
          });
        }
        client.createUser(newUser).then((user) => {
          const appUser = {
            user_id: user.id,
            email: user.profile.email,
            first_name: user.profile.firstName,
            last_name: user.profile.lastName,
            // role: profile.role, //how to get Okta role? doesn't appear in response
          };
          Profiles.create(appUser).then((profile) => {
            res
              .status(200)
              .json({ message: 'profile created by admin,', profile });
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

router.post('/pending', (req, res) => {
  const profile = req.body;
  if (profile) {
    Profiles.createPending(profile)
      .then((profile) => {
        res
          .status(200)
          .json({ message: 'profile created', profile: profile[0] });
      })
      .catch((err) => {
        res.status(500).json(err.message);
      });
  } else {
    res.status(404).json({ message: 'Profile missing' });
  }
});

router.put('/:id', authRequired, (req, res) => {
  const profile = req.body;
  const id = req.params.id;
  if (profile) {
    Profiles.findById(id)
      .then(
        client
          .getUser(id)
          .then((user) => {
            user.profile.firstName = profile.first_name;
            user.profile.lastName = profile.last_name;
            user.profile.email = profile.email;
            user.update();
            Profiles.update(id, profile)
              .then((updated) => {
                res.status(200).json({
                  message: 'profile updated',
                  updated_profile: updated[0],
                  profiles: updated,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: `Could not update profile '${id}'`,
                  error: err.message,
                });
              });
          })
          .catch(() =>
            res.json({ message: 'Okta failed to update this profile' })
          )
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find profile '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Profiles.findById(id).then(() => {
      client
        .getUser(id)
        .then((user) => {
          user.deactivate().then(() => user.delete());
        })
        .catch(() => res.json({ message: 'Okta failed to delete this user' }));
      Profiles.remove(id).then((profiles) => {
        res.status(200).json({
          message: `Profile '${id}' was deleted.`,
          profiles: profiles,
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

router.delete('/pending/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Profiles.findPendingById(id).then((profile) => {
      Profiles.removePending(profile.id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, profile: profile });
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

module.exports = router;
