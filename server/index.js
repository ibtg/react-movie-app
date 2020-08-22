const express = require('express');
const app = express();
const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser());

// login
app.post('/login', (req, res) => {
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
app.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// mongoDB connection
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MomgoDB connected ...'))
  .catch((err) => console.log(err));

// express connection
const port = 5000;
app.get('/', (req, res) => res.send('Hello world'));
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
