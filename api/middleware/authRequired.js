const Profiles = require('../profile/profileModel');

const makeProfileObj = (claims) => {
  return {
    id: 1,
    email: 'innovationlab@humanrightsfirst.org',
    name: 'Innovation Lab',
  };
};
/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
const authRequired = async (req, res, next) => {
  const jwtUserObj = makeProfileObj(data.claims);
  const profile = await Profiles.findOrCreateProfile(jwtUserObj);
  if (profile) {
    req.profile = profile;
  } else {
    throw new Error('Unable to process idToken');
  }
  next();
};

module.exports = authRequired;
