import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import router from "./routes";
import { connect } from "mongoose";
import path from "path";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

// Create a new express application instance
const app: express.Application = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connect(
  "mongodb://localhost/Codesample-db",
  {
    useNewUrlParser: true
  }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization"]
};
app.use(cors(corsOption));
app.use(express.static(path.join(__dirname, "public")));
// path for API
app.use("/api/v1", router);

// route for home page
app.get("**", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
