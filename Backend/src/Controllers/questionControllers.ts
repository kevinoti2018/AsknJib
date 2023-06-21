import { Request, Response } from 'express';
import {v4 as uid} from 'uuid'
import { DatabaseHelper } from '../Helpers';


interface Question {
  QuestionId: string;
  Title: string;
  Details: string;
  Try: string;
  Expect: string;
  Tags: string[];
}

interface ExtendedRequest extends Request {
    body: {
      QuestionId: string;
      Title: string;
      Details: string;
      Try: string;
      Expect: string;
      CreateDate: Date;
      UpdateDate: Date;
      User_Id: string;
      VoteCount: number;
      isDeleted: boolean;
      answerCount: number;
      Tags: string;
    };
  }
  
  export const insertQuestions = async (req: ExtendedRequest, res: Response): Promise<void> => {
    const { Title, Details, Try, Expect, Tags } = req.body;
    const { User_Id } = req.params;
  
    try {
      const QuestionId = uid();
      const CreateDate = new Date().toISOString();
      const data = {
        QuestionId,
        Title,
        Details,
        Try,
        Expect,
        CreateDate,
        User_Id,
        Tags,
      };
      const result = await DatabaseHelper.exec('insertQuestion', data);
      const questionId = result.recordset[0].QuestionId;
      const tags = result.recordset.map((row: any) => row.TagName);
      const questionWithTags = {
        QuestionId: questionId,
        Title: result.recordset[0].Title,
        Details: result.recordset[0].Details,
        Try: result.recordset[0].Try,
        Expect: result.recordset[0].Expect,
        CreateDate: result.recordset[0].CreateDate, 
        VoteCount: result.recordset[0].VoteCount,
        Tags: tags,
      };
  
      res.status(200).json(questionWithTags);
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

  export const SearchQuestion = async(req:Request<{QuestionId:string}>,res:Response)=>{
  const { QuestionId } = req.params;
  console.log(req.params)

  try {
    const result = await DatabaseHelper.exec('GetQuestionById', {QuestionId});
    const questionId = result.recordset[0].QuestionId;
    const tags = result.recordset.map((row: any) => row.TagName);
    const questionWithTags = {
      QuestionId: questionId,
      Title: result.recordset[0].Title,
      Details: result.recordset[0].Details,
      Try: result.recordset[0].Try,
      Expect: result.recordset[0].Expect,
      CreateDate: result.recordset[0].CreateDate, 
      VoteCount: result.recordset[0].VoteCount,
      Tags: tags,
    };

    res.status(200).json(questionWithTags);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }

 
  export const getQuestions = async (req: Request, res: Response) => {
    try {
        const pageNumber: number = Number(req.query.pageNumber) || 1;
        const pageSize: number = Number(req.query.pageSize) || 10;

        const result = await DatabaseHelper.exec('GetAllQuestionsWithTags', {
            PageNumber: pageNumber,
            PageSize: pageSize,
        });

        const questions: Question[] = [];

        result.recordset.forEach((row: any) => {
            const questionId: string = row.QuestionId;

            const existingQuestion = questions.find((q) => q.QuestionId === questionId);

            if (existingQuestion) {
                existingQuestion.Tags.push(row.TagName);
            } else {
                const question: Question = {
                    QuestionId: questionId,
                    Title: row.Title,
                    Details: row.Details,
                    Try: row.Try,
                    Expect: row.Expect,
                    Tags: [row.TagName],
                };

                questions.push(question);
            }
        });

        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getQuestionsByTag = async (req:Request<{TagName:string}>, res:Response) => {
  const { TagName } = req.params;

  try {
    const result = await DatabaseHelper.exec('GetQuestionsByTag', { TagName });
    res.json(result.recordset);
  } catch (error) {
   
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getQuestionsByUserWithTags = async (req: Request<{ User_Id: string }>, res: Response) => {
  const { User_Id } = req.params;

  try {
    const result = await DatabaseHelper.exec('GetQuestionsByUserWithTags', { User_Id });

    const questions: Question[] = [];

    result.recordset.forEach((row: any) => {
      const questionId: string = row.QuestionId;

      const existingQuestion = questions.find((q) => q.QuestionId === questionId);

      if (existingQuestion) {
        existingQuestion.Tags.push(row.TagName);
      } else {
        const question: Question = {
          QuestionId: questionId,
          Title: row.Title,
          Details: row.Details,
          Try: row.Try,
          Expect: row.Expect,
          Tags: [row.TagName],
        };

        questions.push(question);
      }
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteQuestion = async (req: Request<{ QuestionId: string }>, res: Response) => {
  const { QuestionId } = req.params;

  try {
    // Check if the question exists before deleting
    const checkResult = await DatabaseHelper.exec('GetQuestionById', { QuestionId });
    const questionExists = checkResult.recordset.length > 0;

    if (!questionExists) {
      res.status(404).json({ error: 'Question does not exist' });
      return;
    }

    // Delete the question
    const deleteResult = await DatabaseHelper.exec('DeleteQuestion', { QuestionId });
    const rowsAffected = deleteResult.rowsAffected[0];

    if (rowsAffected === 0) {
      res.status(404).json({ error: 'Question does not exist' });
    } else {
      res.json({ message: 'Question deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


