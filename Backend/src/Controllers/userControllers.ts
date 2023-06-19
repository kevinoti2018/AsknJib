import {Response,Request, RequestHandler } from "express";
import bcrypt from 'bcrypt';
import {v4 as uid} from 'uuid'
import jwt from 'jsonwebtoken'
import { DatabaseHelper } from "../Helpers";
import { registrationSchema, resetPasswordSchema } from "../Helpers/joiauth";

interface ExtendedRequest extends Request{
    body:{
    User_Id: string;
    Username: string;
    Email: string;
    Password: string;
    IsAdmin: number;
    isDeleted: number;
    }
}


export const registerController= async(req:ExtendedRequest,res:Response)=>{
    try {

        //creates users id
        let User_Id=uid()
        console.log(User_Id)
        //gets users data from the body
        const {Username,Email,Password} = req.body
        console.log(req.body)

         //validate first
         const {error}= registrationSchema.validate(req.body)
         if(error){
             return res.status(404).json(error.details[0].message)
         }
    
        const hashedPassword = await bcrypt.hash(Password,10)

        await DatabaseHelper.exec('insertUsers',{User_Id,Username,Email,Password:hashedPassword})
        
        return res.status(201).json({message:"user added"})


    } catch (err:any) {
       return res.status(500).json(err.message)
    }
}


export const loginUser = async (req: Request<{ Email: string; Password: string }>, res: Response) => {
    try {
      const { Email, Password } = req.body;
  
      const result = await DatabaseHelper.exec('GetEmail',{Email})
    
      const user = result.recordset[0];
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isValidPassword = await bcrypt.compare(Password, user.Password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const { resetSuccess, Username, isDeleted,User_Id,...rest } = user;
      console.log(user)
      const payload = rest;
      console.log(payload)
      const token = jwt.sign(payload,'ttttweywastring' as string,{expiresIn:'360000s'})
      return res.json({mesage:"Login Successfull!!",token, role:user.isAdmin,username:user.username})
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
  


  export const resetPassword = async(req:Request<{Email:string,newPassword:string}>,res:Response)=>{
    try {
    const {Email,newPassword}= req.body
    const {error} = resetPasswordSchema.validate(req.body)
    if(error){
     return res.status(404).json(error.details[0].message)
 }
     const hashedPassword =  await bcrypt.hash(newPassword,10)
      let result = await DatabaseHelper.exec('ResetsPassword',{Email,newPassword:hashedPassword})
  
    if(result.rowsAffected[0]>0){
     let response = result.rowsAffected[0]
     return res.status(200).json({message:"password reset successfully"})
     console.log(response); 
     
    }else{
     return res.status(404).json({message:"user does not exist"})
    }
    } catch (error:any) {
      return res.status(500).json(error.message)
    }
  }