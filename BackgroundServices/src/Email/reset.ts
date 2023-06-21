import { sendMail } from "../Helpers/sendMail";
import { sqlConfig } from "../config";
import mssql from 'mssql'
import ejs from 'ejs'
interface User{
    id:string
    username:string
    email:string
    isSent:number,
    resetSucces:number
    
    }
const sendResetEmail = async()=>{
    const pool = await mssql.connect(sqlConfig)
    const users:User[]= await(await pool.request().
    query("SELECT * FROM USERDB WHERE resetSuccess ='1'")).recordset
    // console.log(users);

for(let user of users){
    ejs.renderFile('Templates/resetPassword.ejs',{name:user.username}, async(error, html)=>{
    const message = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset",
    html
};

console.log(html);

 try {
await sendMail(message) 
await pool.request().query(`UPDATE USERDB
SET resetSuccess = 0 WHERE Id ='${user.id}'`)
 } catch (error) {
    console.log(error);
    
 }  
})
}    
}

export default sendResetEmail