const { User } = require('../models/User');

let auth = (req, res, next) => {
  // get token from cookie
  let token = req.cookies.x_auth;
  //console.log('auto token: ', token);

  User.findByToken(token, (err, user) => {
    // console.log('findByToken');
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    // console.log('auto user: ', user);

    next();
  });
};

module.exports = { auth };
