const express = require('express');
const app = express();
const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser());

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

//Route
app.use('/api/users', require('./routes/user'));
