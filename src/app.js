require('dotenv').config();
const cors = require('cors'),
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express();
const port = process.env.SERVER_PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Yeah working!');
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
