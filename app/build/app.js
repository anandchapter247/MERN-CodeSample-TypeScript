"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
// Create a new express application instance
const app = express_1.default();
mongoose_1.connect('mongodb://localhost/Codesample-db', {
    useNewUrlParser: true,
});
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
app.use(cors_1.default(corsOption));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// path for API
app.use('/api/v1', routes_1.default);
// rooute for home page
app.get('**', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
