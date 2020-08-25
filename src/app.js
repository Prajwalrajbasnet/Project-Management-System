require('dotenv').config();
const cors = require('cors'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express(),
  apiRoute = require('./routes');
const port = process.env.SERVER_PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//API route
app.use('/api', apiRoute);

// error handling middleware
app.use((err, req, res, next) => {
  let code = 400;
  if (err.statusCode == 500) {
    code = 500;
  }
  res.status(code).send({
    message: err.message || err,
    status: code
  });
});

app.listen(port, () => {
  console.log('Server listening on port ', port);
});
