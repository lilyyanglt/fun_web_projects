const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res) => {
  res.render('login');
})

//************ LOGIN HANDLE ******************************
// when user logs in they are going to make a post request

router.post('/', (req, res, next) => {
  passport.authenticate('local', { 
    successRedirect: '/account/reminder',
    failureRedirect: '/',
    failureFlash: true,
    successFlash: true
  })(req, res, next);
});

module.exports = router;