import express from "express"
import cron from 'node-cron'
import sendWelcomeEmail from "./Email";
import sendResetEmail from "./Email/reset";
import forgotEmail from "./Email/forgot";


cron.schedule('*/5 * * * * *', async() => {

    await sendWelcomeEmail()
    await sendResetEmail()
    await forgotEmail()
  });
  // app.listen(8080,()=>{console.log("app is running")})