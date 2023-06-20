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

export const insertAnswer = async (req: ExtendedRequest, res: Response) => {
  const { QuestionId, User_Id } = req.params;
  const { Answer } = req.body;

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
      res.json({ message: 'Answer inserted successfully', answer: result.recordset[0] });
    }
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





// export const updateAnswerAcceptedStatus = async (req: Request<{AnswerId:string,User_Id:string}>, res: Response): Promise<void> => {
//   const { AnswerId,User_Id} = req.params;
  

//   try {
//     await DatabaseHelper.exec('UpdateAnswerAcceptedStatus', { AnswerId, User_Id });
//     res.json({ message: 'Answer accepted status updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



export const updateAnswerAcceptedStatus = async (req: Request<{ AnswerId: string, User_Id: string }>, res: Response): Promise<void> => {
  const { AnswerId,User_Id } = req.params;


  try {
    // Get the question's user ID
    const result = await DatabaseHelper.exec('GetQuestionUser', { AnswerId });
    const questionUser = result.recordset[0]?.User_Id;
    

    if (questionUser !== User_Id) {
      res.status(403).json({ error: 'Unauthorized: User does not have permission to accept this answer' });
      return;
    }

    // Update the answer's accepted status
    await DatabaseHelper.exec('UpdateAnswerAcceptedStatus', { AnswerId, User_Id });
    res.status(201).json({ message: 'Answer accepted status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





  