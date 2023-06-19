import sql from 'mssql'
import { log } from 'console'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '../../.env')})

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: "#Kyu@2019"  as string,
  database: process.env.DB_NAME as string,
  server: process.env.DB_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

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
  