const User = require('../models/Users');
const TempUser = require('../models/TempUser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    console.log(email, "", password);
    User.findOne({email: email})
    .then(user => {
      // check first if user actually is in the system
      if(user) {
      // check if user's already verified their email?
        if(user.isEmailVerified) {
          // user is already verified, then I will check if their password matches
          if(user.password === password && user.email === email) {
            res.send("login success")
          } else {
            res.send("login not successfully because you have wrong password or email");
          }
        } else {
          res.send("You must verify first");
        }
      } else {
        // user isn't even in the system, send user to register
        console.log(__dirname);
        res.send("no such user");
      }
    })
  },


  // sign up function
  signUp: (req, res) => {
    const { email, password } = req.body;
    User.findOne({email: email})
    .then(user => {
      if(user) {
        res.send("logged in, user found");
      } else {
        const newUser = new User({
          email: email,
          password: password
        })

        const newTempUser = new TempUser({
          _userId: newUser._id,
          token: crypto.randomBytes(16).toString('hex')
        })

        newUser.save();
        newTempUser.save();

        let emailBody = `
        
        <h1> Welcome to Netup </h1>

        <p> Please click the link below to verify your email <p>
        <p> It will expire after 5 minutes </p>
        
        <a href="http://localhost:5000/confirmation/${newTempUser.token}">Verification link here</a> 
        `

        // created TestAccount since I don't have a real mail account yet
        
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: "estell.will@ethereal.email",
            pass: "HBEB2ufzXwuH8rttgf"
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOPtions = {
          from: "estell.will@ethereal.email",
          to: email,
          subject: "testing verification email",
          html: emailBody
        }
    
        transporter.sendMail(mailOPtions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          
          res.send("Please check your email to verify before you can login")
        });
      }
    })
    .catch(error => console.error(error))
  },
  // confirmation function
  confirmation: (req, res) => {
    let hash = req.params.hash
    TempUser.findOne({token: hash}, (err, tempUser) => {
      if(tempUser) {
        // finds the temp user meaning the verification hasn't expired
        const userId = tempUser._userId;

        User.findOneAndUpdate({_id: userId},
          {isEmailVerified: true}, (err, user) => {
            if(user) {
              console.log(user);
            } else {
              console.log(err);
            }
          })
        
        // user can now be sent to the login page to login
        res.redirect('/login.html')

      } else {
        res.send("we will redirect to get request at this time")
        // the link has expired, user should enter their email again
      }
    })
  },

  // here's the callback for user to get a new verification email sent to them
  resend: (req, res) => {
    const { email } = req.body;

    // find the user with this email in the db
    User.findOne({email: email}, (err, user) => {
      if(user) {

          // create a new tempUser entry based on the user id
          const newTempUser = new TempUser({
            _userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
          })

          // saves the tempUser in the db
          newTempUser.save();

          // send email to the user again

          let emailBody = `
              
          <h1> Welcome to Netup </h1>

          <p> Please click the link below to verify your email <p>
          <p> It will expire after 5 minutes </p>
          
          <a href="http://localhost:5000/confirmation/${newTempUser.token}">Verification link here</a> 
          `

          // created TestAccount since I don't have a real mail account yet
        
          const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: "estell.will@ethereal.email",
              pass: "HBEB2ufzXwuH8rttgf"
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          const mailOPtions = {
            from: "estell.will@ethereal.email",
            to: email,
            subject: "testing verification email",
            html: emailBody
          }

          transporter.sendMail(mailOPtions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
            res.send("Please check your email to verify before you can login")
          });

      } else {
        res.send("There's no user currently with this account, create account first")
      }
    })
   
  }
}