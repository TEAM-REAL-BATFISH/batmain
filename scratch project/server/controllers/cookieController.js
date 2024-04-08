import { db } from '../models/models.js';

const cookieController = {};

// setCookie - set a cookie with a random number

cookieController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { httpOnly: true });
  
  return next();
};

cookieController.deleteCookie = async (req, res, next) => {
  try {
    // await new Promise((resolve, reject) => {
    //   res.cookie('ssid', '', { expires: new Date(0), httpOnly: true});
    //   resolve();
      await res.clearCookie('ssid');
      return next();

    
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

// req.cookies.ssid === res.locals.id

cookieController.checkCookie = async (req, res, next) => {
  try {
    if (req.cookies.ssid){
      return res.redirect('/main');
  } else {
    return res.redirect('/');
  }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

cookieController.checkCookieLanding = async (req, res, next) => {
  try {
    if (req.cookies.ssid){
      return res.redirect('/main');
    } else {
      return next();
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

cookieController.checkCookieMain = async (req, res, next) => {
  try {
    if (req.cookies.ssid){
      return next();
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
}

cookieController.isLoggedIn = async (req, res, next) => {
  
}

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

*/

export default cookieController;