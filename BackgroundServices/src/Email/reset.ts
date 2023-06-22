import { sendMail } from '../Helpers/sendMail';
import { sqlConfig } from '../config';
import mssql from 'mssql';

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

const sendResetEmail = async () => {
  const pool = await mssql.connect(sqlConfig);
  const users: User[] = await (
    await pool.request().query("SELECT * FROM USERS WHERE ResetSuccess ='0'")
  ).recordset;

  const resetSuccessMessage = 'Your password has been successfully reset.';

  for (let user of users) {
    const message = {
      from: process.env.EMAIL,
      to: user.Email,
      subject: 'Password Reset',
      html: `<p>${resetSuccessMessage}</p>`,
    };

    try {
      await sendMail(message);
      await pool
        .request()
        .query(
          `UPDATE USERS SET ResetSuccess =' 1 'WHERE User_Id ='${user.User_Id}'`
        );
      console.log(resetSuccessMessage);
    } catch (error) {
      console.log(error);
    }
  }
};

export default sendResetEmail;
