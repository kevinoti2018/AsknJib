import { Request, Response } from 'express';
import {v4 as uid} from 'uuid'
import { DatabaseHelper } from '../Helpers';

interface ExtendedRequest extends Request {
    body:{
        AnswerId:string,
        Answer:string,
        QuestionId:string,
        CreatedDate: Date,
        User_Id:string

    }
}

export const insertAnswer = async (req:ExtendedRequest, res:Response) => {
    const { QuestionId, User_Id } = req.params;
    const { Answer } = req.body;
  
    try {
      const AnswerId = uid();
      const CreatedDate = new Date().toISOString();
      const data = {
        AnswerId,
        Answer,
        QuestionId,
        CreatedDate,
        User_Id,
      };
      console.log(data)
      await DatabaseHelper.exec('InsertAnswer', data);
  
      res.json({ message: 'Answer inserted successfully' });
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  