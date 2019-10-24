const express = require('express');
const app = express();
const AlbumRouter = express.Router();
const Bcrypt = require("bcryptjs");
const multer = require('multer');
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, rename(file));
  },
});
function rename(file) {
  var newname = file.originalname;
  return newname;
}
var upload = multer({ storage: storage }, {
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png' || file.mimetype !== 'image/gif' || file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/jpg') {
      return cb(null, false);
    } else {
      cb(null, true);
    }
  }
});
const User = require('../models/User.model');
const Album = require('../models/Album.model');
const AlbumImage = require('../models/AlbumImage.model');
const hostname = "http://localhost:3001/";


//GET ROUTES
AlbumRouter.route('/login').get(function (req, res) {
  if (req.session.user_id) {
    res.redirect('/useralbum');
  }
  else {
    res.render('login');
  }
});

AlbumRouter.route('/register').get(function (req, res) {
  res.render('register');
});

AlbumRouter.route('/loginerror').get(function (req, res) {
  res.render('loginerror');
});


AlbumRouter.route('/profile').get(function (req, res) {
  if (req.session.user_id) {
    res.render('profile', { fname: req.session.fname, lname: req.session.lname, email: req.session.email, dob: req.session.dob, con: req.session.con });
  }
  else {
    res.redirect('/login');
  }
});

AlbumRouter.route('/updateprofile').get(function (req, res) {
  if (req.session.user_id) {
    res.render('updateprofile', { fname: req.session.fname, lname: req.session.lname });
  }
  else {
    res.redirect('/login');
  }
});

AlbumRouter.route('/useralbum').get(function (req, res) {
  if (req.session.user_id) {
    Album.find({ user_id: req.session.user_id }, function (err, albums) {
      console.log(albums);
      res.render('useralbum', { fname: req.session.fname, lname: req.session.lname, hostname, albums });
    })
  }
  else {
    res.redirect('/login');
  }
});

AlbumRouter.route('/addimage/:album_id').get(function (req, res) {
  if (req.session.user_id) {
    AlbumImage.find({ album_id: req.params.album_id }, function (err, images) {
      console.log(images);
      res.render('albimages', { fname: req.session.fname, lname: req.session.lname, hostname, images, album_id: req.params.album_id });
    });
  }
  else {
    res.redirect('/login');
  }
});

AlbumRouter.route('/logout').get(function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    console.log(req.session);
    res.redirect('/login');
  });
});

//POST ROUTES
AlbumRouter.route('/login').post(async function (req, res) {
    var user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      res.redirect('/loginerror');
    }
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      res.redirect('/loginerror');
    }
    req.session.user_id = user.id;
        req.session.fname = user.fname;
        req.session.lname = user.lname;
        req.session.email = user.email;
        req.session.dob = user.dob;
        req.session.con = user.con;
        res.redirect('/useralbum');
});


AlbumRouter.route('/register').post(function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;
  var con = req.body.con;
  var dob = req.body.dob;
  req.body.password = Bcrypt.hashSync(req.body.password, 10);
    const user = new User(req.body);
    console.log(user);
    user.save()
      .then(user => {
        res.redirect('/login');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});


AlbumRouter.route('/updateprofile').post(function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;
  var con = req.body.con;
  var dob = req.body.dob;
  User.findOne({ email: req.body.email }, function (err, document) {
    console.log(document.id);
    sess._id = document.id;
    User.findById(sess._id, function (err, user) {
      if (!user)
        res.send('Error! Could not update your profile');
      else {
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.email = req.body.email;
        user.password = Bcrypt.hashSync(req.body.password, 10);
        user.dob = req.body.dob;
        user.con = req.body.con;
        user.save().then(user => {
          res.redirect('/login');
        })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
      }
    });
  });
});


AlbumRouter.route('/addalbum').post(upload.single('covimage'), function (req, res) {
  path = req.file.path;
  req.session.aname = req.body.aname;
  const album = new Album({ user_id: req.session.user_id, aname: req.body.aname, covimage: path });
  console.log(album);
  album.save()
    .then(album => {
      res.redirect('/useralbum');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

AlbumRouter.route('/addimage/:album_id').post(upload.single('picture'), function (req, res) {
  path = req.file.path;
  Album.findOne({ _id: req.params.album_id }, function (err, album) {
    console.log(album);
    album_id = req.params.album_id;
    aname = album.aname;
    const albumimage = new AlbumImage({ album_id: album_id, aname: aname, image: path });
    console.log(albumimage);
    albumimage.save()
      .then(albumimage => {
        res.redirect("/addimage/" + album_id);
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  })
});
module.exports = AlbumRouter;
