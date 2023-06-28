import {Response,Request} from "express";
import bcrypt from 'bcrypt';
import {v4 as uid} from 'uuid'
import jwt from 'jsonwebtoken'
import { DatabaseHelper } from "../Helpers";
import { forgotPasswordSchema, registrationSchema, resetPasswordSchema } from "../Helpers/joiauth";

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
interface User {
  User_Id: string;
  Username: string;
  Email: string;
  IsAdmin: boolean;
  isDeleted: boolean;
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
      return res.status(200).json({mesage:"Login Successfull!!",token, role:user.IsAdmin,username:user.Username})
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }; 
  

 

export const forgotPassword = async (req: Request<{ Email: string }>, res: Response) => {
  try {
    const { Email } = req.body;
    const { error } = forgotPasswordSchema.validate(req.body);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }

    const result = await DatabaseHelper.exec('UpdateForgotStatus', { Email });
    const rowsAffected = result.rowsAffected[0];

    if (rowsAffected === 0) {
      res.status(404).json({ error: 'Email not found' });
      return;
    }

    res.status(200).json({ message: 'An email has been sent' });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}


interface extRq2 extends Request  {
  info?:{
    User_Id:string
  }
}


interface extRq extends Request  {
  info?:{
    Email:string
  }
  body: {
    newPassword:string
  }
}
export const resetPassword = async (req: extRq, res: Response) => {
  try {
    const { newPassword } = req.body;
    const { error } = resetPasswordSchema.validate(req.body);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }
    const { Email } = req.info || {}; // Extract email from the decoded token
    console.log(Email);
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
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const result = await DatabaseHelper.exec('GetUsers', {
      PageNumber: pageNumber,
      PageSize: pageSize
    });

    const users: User[] = result.recordset;
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
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


  export const getUserById = async (req: extRq2, res: Response) => {
    const User_Id = req.info?.User_Id; 
  
    if (!User_Id) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
  
    try {
      let result = await DatabaseHelper.exec('GetUserById', { User_Id });
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = result.recordset[0];
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  

