
import ejs from 'ejs'
import mssql from 'mssql'
import { sqlConfig } from '../config'
import { sendMail } from '../Helpers/sendMail'
interface User{
    id:string
    username:string
    email:string
    isSent:number
    }
    
    const sendWelcomeEmail = async()=>{
        const pool = await mssql.connect(sqlConfig)
        const users:User[]= await(await pool.request().
        query("SELECT * FROM USERDB WHERE isSent ='0'")).recordset
        // console.log(users);
    
    for(let user of users){
        ejs.renderFile('Templates/register.ejs',{name:user.username}, async(error, html)=>{
        const message = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Karibu",
        html
    };
    
    
    
     try {
    await sendMail(message) 
    await pool.request().query(`UPDATE USERDB SET isSent ='1' WHERE Id ='${user.id}'`)
     } catch (error) {
        console.log(error);
        
     }  
    })
    }    
    }
    
    export default sendWelcomeEmail
    