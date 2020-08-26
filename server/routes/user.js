const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

// logout

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

// Auth
router.get('/auth', auth, (req, res) => {
  // role == 0 : user
  // role !== 0 : admin
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// login
router.post('/login', (req, res) => {
  // 1. find user in DB
  User.findOne({ email: req.body.email }, (err, user) => {
    //console.log('usre: ', user);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Can not find user',
      });
    }
    // 2.if email is found in DB, then password check
    user.comparePassword(req.body.password, (err, isMatch) => {
      // Incorrec Password
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: 'Incorrect Password',
        });

      // 3. Correct Password, generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// reigister
router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
