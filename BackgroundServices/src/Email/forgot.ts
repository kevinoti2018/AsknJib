import { sendMail } from '../Helpers/sendMail';
import { sqlConfig } from '../config';
import mssql from 'mssql';
import jwt from 'jsonwebtoken'

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
 
  const pool = await mssql.connect(sqlConfig);
  const users: User[] = await (
    await pool.request().query("SELECT * FROM USERS WHERE forgot ='1'")
  ).recordset;

 

  for (let user of users) {
    let token  = jwt.sign(user.Email,'twitterstring',{expiresIn:'1h'})
  
    const message = {
      from: process.env.EMAIL,
      to: user.Email,
      subject: 'Forgot Passwword',
      html: `<h1>Hi ${user.Username}</h1>
            <p>click <a href="localhost:4000/reset/${token}"></a></p>
      `
            
      ,
    };

    try {
      await sendMail(message);
      await pool
        .request()
        .query(
          `UPDATE USERS SET forgot =' 0 'WHERE User_Id ='${user.User_Id}'`
        );
     
    } catch (error) {
      console.log(error);
    }
  }
};

export default forgotEmail;
