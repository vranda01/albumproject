const express = require('express');
const app = express();
const AlbumRouter = express.Router();
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
  var email = req.body.email;
  var password = req.body.password;
  var result = loginvalidate(email, password);
  function loginvalidate(email, password) {
    if (email == "") {
      return ("Please enter an email id");
      email.focus();
    }
    var emailPattern = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$");
    if (!emailPattern.test(email)) {
      return ("Please enter a valid email id");
      email.focus();
    }
    if (password == "") {
      return ("Please enter your password");
      password.focus();
      return false;
    }
    if (password.length < 6) {
      return ("Password should be atleast 6 characters long");
      password.focus();
      return false;
    }
    return true;
  }
  if (result == true) {
    await User.findOne({ email: req.body.email, password: req.body.password }, function (err, document) {
      console.log(document);
      if (document) {
        req.session.user_id = document.id;
        req.session.fname = document.fname;
        req.session.lname = document.lname;
        req.session.email = document.email;
        req.session.dob = document.dob;
        req.session.con = document.con;
        console.log(req.session);
        res.redirect('/useralbum');
      }
      else {
        res.redirect('/loginerror');
      }
    });
  }
  else {
    res.send(result);
  }
});


AlbumRouter.route('/register').post(function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;
  var con = req.body.con;
  var dob = req.body.dob;
  var result = registervalidate(fname, lname, email, password, con, dob)
  function registervalidate(fname, lname, email, password, con, dob) {
    if (fname == "") {
      return ("Please enter your first name.");
      name.focus();
      return false;
    }
    if (lname == "") {
      return ("Please enter your last name.");
      name.focus();
      return false;
    }
    if (email == "") {
      return ("Please enter an email id");
      email.focus();
      return false;
    }
    var emailPattern = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$");
    if (!emailPattern.test(email)) {
      return ("Please enter a valid email id.");
      email.focus();
    }
    if (password == "") {
      return ("Please enter your password.");
      password.focus();
      return false;
    }
    if (password.length < 6) {
      return ("Password should be atleast 6 charaters long.");
      password.focus();
      return false;
    }
    if (dob == "") {
      return ("Please enter your Birthdate.");
      password.focus();
      return false;
    }
    if (con == "") {
      return ("Please enter your contact number.");
      phone.focus();
      return false;
    }
    var conPattern = new RegExp("^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$");
    if (!CONPattern.test(con)) {
      return ("Please enter a valid contact number.");
      email.focus();
    }
    if (con.length != 10) {
      return ("Phone number must be 10 digits.");
      number.focus();
      return false;
    }
    return true;
  }
  if (result == true) {
    const user = new User(req.body);
    console.log(user);
    user.save()
      .then(user => {
        res.redirect('/login');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  }
  else {
    res.send(result);
  }
});


AlbumRouter.route('/updateprofile').post(function (req, res) {
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
        user.password = req.body.password;
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
