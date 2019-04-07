import express from 'express';
import * as bodyParser from "body-parser";
import router from './routes';

// Create a new express application instance
const app: express.Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// path for API
app.use('/api/v1', router);

// rooute for home page
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});