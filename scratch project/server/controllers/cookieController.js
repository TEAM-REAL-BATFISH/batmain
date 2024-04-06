import { db } from '../models/models.js';

const cookieController = {};

// setCookie - set a cookie with a random number

cookieController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { httpOnly: true });
  
  return next();
};

cookieController.deleteCookie = async (req, res, next) => {
  res.cookie('ssid', '', { expires: new Date(0), httpOnly: true});

  return next();
};

cookieController.checkCookie = async (req, res, next) => {
  if (req.cookies.ssid === res.locals.id)
  return next();
};

// cookies are saved in req.cookies.ssid;

/*
const cookieController = {};
const User = require('../models/userModel');

/**
 * setCookie - set a cookie with a random number
 
cookieController.setCookie = (req, res, next) => {
  // write code here

  res.cookie('codesmith', 'hi');
  res.cookie('secret', Math.floor(Math.random() * 100));
  return next();
};

/**
 * setSSIDCookie - store the user id in a cookie

cookieController.setSSIDCookie = (req, res, next) => {
  // write code here

  console.log(res.locals.user);
  if (res.locals.user && res.locals.user._id) {
    console.log('req.user.id', res.locals.user._id);

    const username = res.locals.user._id.toString();
    console.log('username', username);

    res.cookie('ssid', username, { httpOnly: true });
  } else {
    return next();
  }

  return next();
};

*/cookieController.isLoggedIn = async (req, res, next) => {
  
}


export default cookieController;