const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Article = require('../../models/Article');
const jwt = require('jsonwebtoken');
const keys = require('../../frontend/src/config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Throw a 400 error if the email address already exists
        return res.status(400).json({ email: "A user has already registered with this address" })
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          savedArticles: []
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then((user) => {
              const payload = { id: user.id, email: user.email };
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  // key expires in one hour
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})


router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'This user does not exist' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, email: user.email };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})

router.patch('/articles', (req, res) => {
  const { userId, articleURL } = req.body;
  User.findById(userId)
    .then(user => {
      if (user.savedArticles.includes(articleURL)) {
        user.savedArticles.splice(user.savedArticles.indexOf(articleURL), 1);
      } else {
        user.savedArticles.push(articleURL);
      }
      user.save()
        .then(savedUser => {
          return res.json({ articleURL });
        })
    })
})

router.post('/articles', (req, res) => {
  const userId = req.body.userId;
  User.findById(userId)
    .then(user => {
      const articleURLs = user.savedArticles;
      Article.find({ articleURL: { $in: articleURLs } })
        .then(articles => {
          if (articles.length) {
            return res.json(articles);
          } else {
            return res.status(404).json({ articles: 'No articles found' })
          }
        })
    })
})

module.exports = router;