const express = require('express');
const router = express.Router();

// User model - once validation of the user entry passed

const User = require('../models/User')

// if user don't already exists, before you add the user to db, you need to encrypt the password

const bcrypt = require('bcryptjs');

// registration page
router.get('/create_account', (req, res) => {
  res.render('create_account');
})


router.get('/reminder', (req, res) => {
  res.render('reminderPage')
})

// register handle

router.post('/create_account', (req, res) => {
  
  const { username, email, password, password2, reminderList } = req.body;
  let errors = [];

  // check required fields
  if (!username || !email || !password || !password2) {
    errors.push({msg: 'Please fill in all fields'});
  }

  // check passwords match
  if (password !== password2) {
    errors.push({msg: "Passwords must match"});
  }

  if (password.length < 6 || password.length >= 25) {
    errors.push({ msg: "Passwords need to be longer than 6"});
  }

  if(errors.length > 0) {
    // when you render the template, the 2nd object parameter are basically
    // the variables you want to pass into the template engine
    res.render('create_account', {
      errors,
      username,
      email,
      password,
      password2 
    });
  } else {
    // After user entry is good, we need to now add to db
    
    // before adding to DB, we need to check if user exists

    User.findOne({ email: email })
    .then((user) => {
      if(user) {
        // user exists
        errors.push({ msg: "User already exists"});
        res.render('create_account', {
          errors,
          username,
          email,
          password,
          password2 
        });
      } else {

        // create new user, but need to encrypt the password
        const newUser = new User({
          username,
          email,
          password,
          reminderList
        });

        // hash password using bcrypt
        bcrypt.genSalt((error, salt) => 
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if(error) throw error;
            // after it's been hashed, set password to the hash
            newUser.password = hash;

            // ****** SAVES THE USER INFORMATION IN DB ********
            newUser.save()
            .then( user => {
              req.flash('success_msg', `Successfully created account, hello <strong>${user.username}</strong>`);
              res.redirect('reminder');
            })
            .catch( error => console.log(error));
        }))

      }
    });

  }
})
module.exports = router;