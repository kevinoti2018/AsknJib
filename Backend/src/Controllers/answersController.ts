import { Request, Response } from 'express';
import {v4 as uid} from 'uuid'
import { DatabaseHelper } from '../Helpers';
export interface Answer {
  AnswerId: string;
  Answer: string;
  VoteCount: number;
  QuestionId: string;
  CreatedDate: Date;
  User_Id: string;
  accepted: boolean;
}


interface ExtendedRequest extends Request {
  info?: {
    User_Id: string;
  };
    body:{
        AnswerId:string,
        Answer:string,
        QuestionId:string,
        CreatedDate: Date,
      

    }
}
interface ExtendedRequest1 extends Request {
  info?: {
    User_Id: string;
  };
    body:{
        AnswerId:string,     
    }
}

export const insertAnswer = async (req: ExtendedRequest, res: Response) => {
  const { QuestionId } = req.params;
  const { Answer } = req.body;
  const User_Id = req.info?.User_Id; 
  if (!User_Id) {
    res.status(400).json({ message: 'Invalid token' });
    return;
  }
  try {
    const AnswerId = uid();
    const CreatedDate = new Date().toISOString();

    // Execute the stored procedure to insert the answer
    await DatabaseHelper.exec('InsertAnswer', {
      AnswerId,
      Answer,
      QuestionId,
      CreatedDate,
      User_Id,
    });

    // Fetch the inserted answer from the database
    const result = await DatabaseHelper.exec('GetAnswerById', { AnswerId });

    if (result.recordset.length === 0) {
      res.status(404).json({ error: 'Answer not found' });
    } else {
      res.json({ answer: result.recordset[0] });
    }
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const updateAnswerAcceptedStatus = async (req: ExtendedRequest1, res: Response): Promise<void> => {
  const User_Id = req.info?.User_Id as string;
  const { AnswerId } = req.body;

  try {
    // Get the question's user ID
    const result = await DatabaseHelper.exec('GetQuestionUser', { AnswerId });
    const questionUser = result.recordset[0]?.User_Id;

    if (questionUser !== User_Id) {
      res.status(403).json({ error: 'Unauthorized: User does not have permission to accept this answer' });
      return;
    }
    await DatabaseHelper.exec('UpdateAnswerAcceptedStatus', { AnswerId, User_Id });
    res.status(201).json({ message: 'Answer accepted status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export const getAnswersByQuestionId = async (req: Request<{QuestionId:string}>, res: Response) => {
  try {
    const {QuestionId} = req.params;
    console.log(req.params)

    const result = await DatabaseHelper.exec('GetAnswersByQuestionId', {
      QuestionId
    });
    const response = result.recordset
  

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getAnswersByUserId = async (req: Request<{User_Id:string}>, res: Response) => {
  try {
    const {User_Id} = req.params;
    console.log(req.params)

    const result = await DatabaseHelper.exec('GetAnswersByUserId', {
      User_Id
    });

    const response = result.recordset;

    console.log(response)
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const upvoteAnswer = async (req: ExtendedRequest1 , res: Response) => {
  try {
    const User_Id = req.info?.User_Id as string;  
    const { AnswerId } = req.body;

    const result = await DatabaseHelper.exec('upvoteAnswers', {
      User_Id,
      AnswerId
    });

    const message = result.recordset[0].Result;

    if (message === 'User has already upvoted this answer.' || message === 'You cannot vote on your own answer.') {
      res.status(400).json({ message });
    } else if (message === 'Upvote recorded successfully.') {
      res.status(200).json({ message: 'Vote cast successfully.' });
    } else {
      res.status(400).json({ message: 'No vote cast.' });
    }
   
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const downvoteAnswer = async (req:ExtendedRequest1 , res: Response) => {
  try {
    const User_Id = req.info?.User_Id as string; 
    const { AnswerId } = req.body;

    const result = await DatabaseHelper.exec('DownvoteAnswers1', {
      AnswerId,
      User_Id
    });

    const message = result.recordset[0].Result;

    if (message === 'User has already voted for this answer.' || message === 'You cannot vote on your own answer.') {
      res.status(400).json({ message });
    } else if (message === 'Downvote recorded successfully.') {
      res.status(200).json({ message: 'Vote cast successfully.' });
    } else {
      res.status(400).json({ message: 'No vote cast.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getAnswerById = async (req: Request<{AnswerId:string}>, res: Response) => {
  const { AnswerId } = req.params;

  try {
    const data = {
      AnswerId
    };

    const result = await DatabaseHelper.exec('GetAnswerById', data);
    const answer = result.recordset[0];
    res.status(200).json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve answer by ID' });
  }
};


