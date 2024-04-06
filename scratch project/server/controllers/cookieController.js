const db = require('../models/models');

const cookieController = {};

// setCookie - set a cookie with a random number

cookieController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user, { httpOnly: true });

  return next();
};