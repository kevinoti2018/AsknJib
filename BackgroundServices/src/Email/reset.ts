import { sendMail } from "../Helpers/sendMail";
import { sqlConfig } from "../config";
import mssql from 'mssql'
import ejs from 'ejs'
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
const sendResetEmail = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const users:User[]= await(await pool.request().
    query("SELECT * FROM USERS WHERE ResetSuccess ='1'")).recordset
    // console.log(users);

for(let user of users){
    ejs.renderFile('Templates/resetPassword.ejs',{name:user.Username}, async(error, html)=>{
    const message = {
    from: process.env.EMAIL,
    to: user.Email,
    subject: "Password Reset",
    html
};

console.log(html);

 try {
await sendMail(message) 
await pool.request().query(`UPDATE USERS
SET resetSuccess = 0 WHERE User_Id ='${user.User_Id}'`)
 } catch (error) {
    console.log(error);
    
 }  
})
}    
}

export default sendResetEmail