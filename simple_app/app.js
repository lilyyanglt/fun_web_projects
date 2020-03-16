// CREDITS: Tutorial by 
// TRAVERSY MEDIA - https://www.youtube.com/user/TechGuyWeb/about

const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// ********************** INITIALIZE WEB SERVER *********************
const app = express();

// ********************** PASSPORT config *************************
require('./config/passport_local')(passport);

// ****************** DB CONNECTION *********************************
// db Configuration

const db = require('./config/keys').MongoURI

// Connecting to Mongo, mongoose returns a promise

mongoose.connect(db, { useUnifiedTopology: true,
                       useNewUrlParser: true })
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error(error));

// ********************* REGISTRATION AND LOGIN ***********************
// because we have a form, we need to use body parser middleware from 
// express so that POST request can return json format

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ********************* EXPRESS SESSION MIDDLEWARE *******************
// one reason we needed this was for the flash messaging after the user
// registers and before redirecting them to their account reminder page
// we are giving them a message to confirm that they've successfully
// signed up

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

// ********************* ADD CONNECT-FLASH MIDDLEWARE *****************

app.use(flash());

// ************ USING CUSTOM MIDDLEWARE *******************************
// this is so we can have different color messaging 
// yellow for our warnings
// green for success

app.use((req, res, next) => {
  // set up global variables
  res.locals.success_msg = req.flash('success_msg');
  // NOT SURE WHAT THIS ERROR_MSG WILL BE UNLESS WE ARE HANDLING ANY ERROR WITH SETTING UP USER IN THE DATABASE
  res.locals.error_msg = req.flash('error_msg');
  // global variable for the flash error for passport just returns an error
  res.locals.error = req.flash('error');
  // global variable for the flash error for passport when login succeeded
  res.locals.success = req.flash('success');

  next();
})

// ********************** PASSPORT MIDDLEWARE *************************
// this is intentially put after the express-session middleware since 
// passport is dependent on express-session

app.use(passport.initialize());
app.use(passport.session());


// ********************** INITIALIZE EJS ******************************
app.use(ejsLayouts);
app.set('view engine', 'ejs');

// ********************* USING STATIC STYLE SHEETS *******************
app.use(express.static('public'));


// ********************** SET UP THE PORT *****************************
const PORT = process.env.PORT || 5000;


// ********************** ROUTES **************************************
app.use('/', require('./routes/index.js'));
app.use('/account', require('./routes/account.js'));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})