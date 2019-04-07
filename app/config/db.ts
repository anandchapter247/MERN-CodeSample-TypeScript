import * as mySQL from 'mysql2/promise';
import * as config from "./config.json";

var pool: mySQL.Pool = mySQL.createPool({
    host: config.development.host,
    user: config.development.user,
    password: config.development.password,
    database: config.development.database
});

export default pool;