const express = require('express');
const app = express();
const config = require('./server/config/key');

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
