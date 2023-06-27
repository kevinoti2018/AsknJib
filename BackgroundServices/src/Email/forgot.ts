import { sendMail } from '../Helpers/sendMail';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import jwt from 'jsonwebtoken';

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

const forgotEmail = async () => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const users: User[] = await (
      await pool.request().query("SELECT * FROM USERS WHERE forgot = '1'")
    ).recordset;

    for (let user of users) {
        const Email = user.Email
        let token = jwt.sign(Email,'twitterstring');
        ;
      console.log(user);
      const message = {
        from: process.env.EMAIL,
        to: user.Email,
        subject: 'Forgot Password',
        html: `<h1>Hi ${user.Username}</h1>
            <p>Click <a href="http://localhost:4000/usersroutes/reset/${token}">here</a> to reset your password.</p>`,
      };

      try {
        await sendMail(message);
        await pool
          .request()
          .query(`UPDATE USERS SET forgot = '0' WHERE User_Id = '${user.User_Id}'`);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default forgotEmail;
