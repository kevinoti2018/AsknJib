import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '../.env')})

let configOptions =  {
    host: "smtp.gmail.com",
    service:"gmail",
    port:587,
    auth:{
        user: 'kelvinotix@gmail.com',
        pass:'bgxufqhgyvvvgboy'
    }
} 
    
function createTransporter(configOpts:any){
    return nodemailer.createTransport(configOpts)
}

export async function  sendMail(messageOptions:any){
    let transporter =  createTransporter(configOptions)
    //await transporter.verify()
    await transporter.sendMail(messageOptions,(err,response)=>{
        console.log(response)
    })
}
