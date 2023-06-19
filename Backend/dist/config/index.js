"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
exports.sqlConfig = {
    user: process.env.DB_USER,
    password: "#Kyu@2019",
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
};
// async function connectToDB() {
//   try {
//     const pool = await sql.connect(sqlConfig);
//     if (pool.connected) {
//       console.log('Connected to DB');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
// connectToDB();
