import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '../.env')})

const app =  express()
const port = process.env.PORT || 3000;
console.log(process.env.PORT);

app.get('/',(req:any,res:any)=>{
    res.send('Hello there')
})
app.listen(port, ()=>{
    console.log( ` app is running on http://localhost:${port}`)
})