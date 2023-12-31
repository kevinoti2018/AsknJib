import mssql from 'mssql';
import { sqlConfig } from '../config';
import { sendMail } from '../Helpers/sendMail';

interface User {
  User_Id: string;
  Username: string;
  Email: string;
  Password: string;
  IsAdmin: boolean;
  isDeleted: boolean;
  ResetSuccess: boolean;
  isSent: boolean;
}

const sendWelcomeEmail = async () => {
  const pool = await mssql.connect(sqlConfig);
  const users: User[] = await (
    await pool.request().query('SELECT * FROM USERS WHERE isSent = 0')
  ).recordset;

  for (let user of users) {
   
    const message = {
      from: process.env.EMAIL,
      to: user.Email,
      subject: 'Welcome to the Platform',
      html: `<p>Welcome, ${user.Username}!</p><p>Thank you for joining our platform.</p>`,
    };

    try {
      await sendMail(message);
      await pool
        .request()
        .query(`UPDATE USERS SET isSent ='1' WHERE User_Id ='${user.User_Id}'`);
    } catch (error) {
      console.log(error);
    }
  }
};

export default sendWelcomeEmail;
