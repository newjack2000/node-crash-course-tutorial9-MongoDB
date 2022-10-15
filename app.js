const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb
const dbURI = "mongodb+srv://newjack:K33p!t4r3al@ivytech-sdev.yfmxsgb.mongodb.net/Node-Tutorials?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));
// add only if receiving DeprecationWarnig: { useNewUrlParser: true, useUnifiedTopology: true}

// if you want to specify the name of the folder for express to look for the ejs files
// user-- app.set{'views', 'myviews'}

// register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });
  
  app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

// 404 page
// use funciton fires for every request if it reached this code
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });

});