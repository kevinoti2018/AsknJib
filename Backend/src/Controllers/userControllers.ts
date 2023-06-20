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
        
        //gets users data from the body
        const {Username,Email,Password} = req.body
       

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
      const {  Username, isDeleted,User_Id,...rest } = user;
      console.log(user)
      const payload = rest;
      console.log(payload)
      const token = jwt.sign(payload,'ttttweywastring' as string,{expiresIn:'360000s'})
      return res.json({mesage:"Login Successfull!!",token, role:user.isAdmin,username:user.username})
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
  


  export const resetPassword = async (req: Request<{ Email: string, newPassword: string }>, res: Response): Promise<void> => {
    try {
      const { Email, newPassword } = req.body;
      const { error } = resetPasswordSchema.validate(req.body);
  
      if (error) {
        res.status(404).json(error.details[0].message);
        return;
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const result = await DatabaseHelper.exec('ResetsPassword', { Email, newPassword: hashedPassword });
  
      if (result.rowsAffected[0] > 0) {
        res.status(200).json({ message: "Password reset successfully" });
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
  


  export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await DatabaseHelper.exec('GetUsers', {});
      res.status(201).json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const deletUser = async(req:Request<{User_Id:string}>,res:Response)=>{
    const {User_Id}= req.params
    try{
      const result = await DatabaseHelper.exec('DeleteUser', {User_Id});
      res.status(201).json({message:"user deleted"});
    }
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }