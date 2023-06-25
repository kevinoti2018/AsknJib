import express from "express"
import cron from 'node-cron'
import sendWelcomeEmail from "./Email";
import sendResetEmail from "./Email/reset";
import forgotPassword from "./config/forgotPassword";
// const app =  express()
// app.use(express.json())

cron.schedule('*/5 * * * * *', async() => {
    // console.log('running a task every 5 Seconds');
    await sendWelcomeEmail()
    // await sendResetEmail()
    await forgotPassword()
  });
  // app.listen(8080,()=>{console.log("app is running")})