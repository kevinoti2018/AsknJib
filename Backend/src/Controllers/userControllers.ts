import {Response,Request} from "express";
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
    IsAdmin: boolean;
    isDeleted: number;
    }
}



export const registerController = async (req: ExtendedRequest, res: Response) => {
  try {
    // user id
    let User_Id = uid();
    // Get user data from the request body
    const { Username, Email, Password } = req.body;

    // Validate the request body
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(404).json(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    await DatabaseHelper.exec('insertUser', {
      User_Id: User_Id,
      Username: Username,
      Email: Email,
      Password: hashedPassword,
    });

    return res.status(201).json({ message: 'User added' });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};



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
      const {  Username, isDeleted,...rest } = user;
      console.log(user)
      const payload = rest;
      console.log(payload)
      const token = jwt.sign(payload,'ttttweywastring' as string,{expiresIn:'3d'})
      return res.status(200).json({mesage:"Login Successfull!!",token, role:user.isAdmin,username:user.username})
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }; 
  

 
interface extRq extends Request  {
    info?: {
      email:string
    }
    body: {
      newPassword:string
    }
}
  
  export const resetPassword = async (req: extRq, res: Response): Promise<void> => {
    try {
      const { newPassword } = req.body;
      const { error } = resetPasswordSchema.validate(req.body);
  
      if (error) {
        res.status(400).json(error.details[0].message);
        return;
      }
  
      const Email = req.info?.email; // Extract email from the decoded token
      if (!Email) {
        res.status(400).json({ message: 'Invalid token' });
        return;
      }
      console.log(Email);
      
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const result = await DatabaseHelper.exec('ResetsPassword', { Email, newPassword: hashedPassword });
  
      if (result.rowsAffected[0] > 0) {
        res.status(200).json({ message: 'Password reset successfully' });
      } else {
        res.status(404).json({ message: 'User does not exist' });
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
  


  export const getUsers = async (req: Request, res: Response) => {
    try {
      const result = await DatabaseHelper.exec('GetUsers', {});
      res.status(201).json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const deleteUser = async (req: Request<{ User_Id: string }>, res: Response): Promise<void> => {
    const { User_Id } = req.params;
  
    try {
      const getUserResult = await DatabaseHelper.exec('GetUserById', { User_Id });
      const user = getUserResult.recordset[0];
  
      if (!user) {
        res.status(404).json({ message: 'User does not exist' });
        return;
      }
  
      const isDeleted = user.isDeleted;
  
      if (isDeleted === 1) {
        res.status(404).json({ message: 'User does not exist' });
        return;
      }
  
      await DatabaseHelper.exec('DeleteUser', { User_Id });
  
      res.status(201).json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  

