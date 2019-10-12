import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import router from './routes';
import { connect } from 'mongoose';

// Create a new express application instance
const app: express.Application = express();

connect(
  'mongodb://localhost/Codesample-db',
  {
    useNewUrlParser: true,
  },
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token', 'authorization'],
};
app.use(cors(corsOption));

// path for API
app.use('/api/v1', router);

// rooute for home page
app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
