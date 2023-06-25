import { sendMail } from '../Helpers/sendMail';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import jwt from 'jsonwebtoken';

interface User {
  User_Id: string;
  Email: string;
  Username: string;
}

const forgotPassword = async () => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const users: User[] = await (
      await pool.request().query("SELECT User_Id, Email,Username FROM USERS WHERE ResetSuccess = '1'")
    ).recordset;

    const resetSuccessMessage = 'Your password has been successfully reset.';

    for (let user of users) {
      const { User_Id, Email } = user;
      const token = jwt.sign({ Email }, 'twitterstring', { expiresIn: '1h' });
      const resetLink = `${process.env.RESET}/usersroutes/reset/${token}`;

      const message = {
        from: process.env.EMAIL,
        to: Email,
        subject: 'Password Reset',
        html: `
        <h2>Hi ${user.Username} </h2>
          <h3>You requested a password reset</h3>
          <h4>Click <a href="${resetLink}">here</a> to reset your password.</h4>
          <p>
          If you did not initiate this request, please ignore this email.
          
          Thank you,
          YourApp Team</p>
        `,
      };

      await sendMail(message);
      await pool.request().query(`UPDATE USERS SET ResetSuccess = '0' WHERE User_Id = '${User_Id}'`);

      console.log(resetSuccessMessage);
    }
  } catch (error) {
    console.log(error);
  }
};

export default forgotPassword;
