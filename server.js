const express = require('express');
const app = express();
const session = require('express-session');
const port = 3001;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/albumproject');

const AlbumRouter = require('./routes/AlbumRouter');

app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));
//app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.use('/', AlbumRouter);

app.listen(port,function(){
  console.log('My Album Project');
});
