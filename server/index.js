const express = require('express');
const app = express();
const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// use cors
app.use(cors());

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

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

//Route
app.use('/api/users', require('./routes/user'));
app.use('/api/like', require('./routes/like'));

app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
