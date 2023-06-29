import { sendMail } from '../Helpers/sendMail';
import { sqlConfig } from '../config';
import mssql from 'mssql';

interface User {
  Username: string;
  Email: string;
}

const acceptedEmail = async () => {
  let pool: mssql.ConnectionPool | undefined;

  try {
    pool = await mssql.connect(sqlConfig);

    const result = await pool.request().execute('GetUserDetailsByAcceptedAnswer2');

    const recordset = result.recordset as User[];

    for (let user of recordset) {
      const message = {
        from: process.env.EMAIL,
        to: user.Email,
        subject: 'Accepted Answer',
        html: `<h1>Hi ${user.Username}</h1>
               <p>Your answer has been accepted 😊</p>`,
      };

      try {
        await sendMail(message);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

export default acceptedEmail;
