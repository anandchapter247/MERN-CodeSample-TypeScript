import express from "express";
import * as bodyParser from "body-parser";
import router from "./routes";
import { connect } from "mongoose";

// Create a new express application instance
const app: express.Application = express();

connect(
  "mongodb://localhost/dr_polly_db",
  {
    useNewUrlParser: true
  }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// path for API
app.use("/api/v1", router);

// rooute for home page
app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
