'use strict';

const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const { URI } = require('./mongodbKey');

const userController = require('./controller/userRoutes')
// mongodb connection

mongoose.connect(URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log("connected to db!!"))
.catch(error => console.error(error));


app.use(express.static('public'));

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// *************************** ROUTES START HERE *****************************

app.post("/signup", userController.signUp);

app.post("/login", userController.login);

app.get("/confirmation/:hash", userController.confirmation);

app.post("/resend", userController.resend);

app.listen(port, () => console.log("App started"));



