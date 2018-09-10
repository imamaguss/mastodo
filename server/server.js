require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const todoRoute = require('./routes/todo');
const server = express();

mongoose.connect('mongodb://imam:imam82@ds113700.mlab.com:13700/todo-fancy', {
  useNewUrlParser: true
});

server
  .use(cors())
  .use(express.urlencoded({extends: false}))
  .use(express.json())
  .use(express.static('assets'))
  .use('/', indexRoute)
  .use('/users', userRoute)
  .use('/todo', todoRoute)
  .listen(3013, () => {
    console.log(`Server running on port 3012`);
  });