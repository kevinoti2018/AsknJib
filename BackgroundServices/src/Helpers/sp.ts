import { sqlConfig } from '../config';
import mssql from 'mssql';

const executeGetUserDetailsByAcceptedAnswer2 = async () => {
  let pool: mssql.ConnectionPool | undefined;

  try {
    pool = await mssql.connect(sqlConfig);

    const result = await pool.request().execute('GetUserDetailsByAcceptedAnswer2');

    const recordset = result.recordset;

    console.log(recordset);
  } catch (error) {
    console.log(error);
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

executeGetUserDetailsByAcceptedAnswer2();
