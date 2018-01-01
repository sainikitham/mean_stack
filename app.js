const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
//connect to databse
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database....'+config.database);
});
//on error
mongoose.connection.on('error', (err) => {
  console.log(err);
});
const app = express();
const users = require('./routes/users');
const port = 3000;

app.use(cors());
//body parser middleware
app.use(express.static('public'))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(bodyParser.json());
app.use('/users',users);
//index route
app.get('/',(req, res) => {
  res.send('invalid endpoint');
});
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(port, () => {
  console.log("server started at "+port);
});
