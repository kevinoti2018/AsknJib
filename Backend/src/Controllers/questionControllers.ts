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
interface Quiz{
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
}
interface ExtendedRequest extends Request {
  info?: {
    User_Id: string;
  };

  body: {
    QuestionId: string;
    Title: string;
    Details: string;
    Try: string;
    Expect: string;
    CreateDate: Date;
    UpdateDate: Date;
    VoteCount: number;
    isDeleted: boolean;
    answerCount: number;
    Tags: string;
  };
}

export const insertQuestions = async (req: ExtendedRequest, res: Response) => {
  const { Title, Details, Try, Expect, Tags } = req.body;

  const User_Id = req.info?.User_Id; // Extract User_Id from the decoded token
  if (!User_Id) {
    res.status(400).json({ message: 'Invalid token' });
    return;
  }
  console.log(User_Id);
  

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

  
  export const updateQuestions = async (req: ExtendedRequest, res: Response) => {
    try {
      const {
        Title,
        Details,
        Try,
        Expect,
        Tags
      } = req.body;
      const User_Id = req.info?.User_Id; // Extract User_Id from the decoded token
      if (!User_Id) {
        res.status(400).json({ message: 'Invalid token' });
        return;
      }
      const { QuestionId} = req.params;
      const UpdateDate = new Date().toISOString();
      console.log(req.params)
      const data = {
        QuestionId,
        Title,
        Details,
        Try,
        Expect,
        UpdateDate,
        User_Id,
        Tags
      };
  
      const result = await DatabaseHelper.exec('updateQuiz', data);
  
      const questionId = result.recordset[0].QuestionId;
      const tags = result.recordset.map((row) => row.TagName);
      const questionWithTags = {
        QuestionId: questionId,
        Title: result.recordset[0].Title,
        Details: result.recordset[0].Details,
        Try: result.recordset[0].Try,
        Expect: result.recordset[0].Expect,
        UpdateDate: result.recordset[0].UpdateDate,
        VoteCount: result.recordset[0].VoteCount,
        Tags: tags,
      };
  
      res.status(200).json(questionWithTags);
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ error: 'Failed to update question' });
    }
  };
  
  export const SearchQuestion = async (req: Request<{ QuestionId: string }>, res: Response) => {
    const { QuestionId } = req.params;
    console.log(req.params);
  
    try {
      const result = await DatabaseHelper.exec('GetQuestionById', { QuestionId });
      
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'Question not found' });
      }
      
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
  };
  

 
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

export const getQuestionsByTag = async (req: Request<{ TagName: string }>, res: Response) => {
  const { TagName } = req.params;

  try {
    const result = await DatabaseHelper.exec('GetQuestionsByTag', { TagName });

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


interface extRq extends Request  {
  info?: {
    User_Id:string
  }
  
}


export const getQuestionsByUserWithTags = async (req: extRq, res: Response) => {

  const User_Id = req.info?.User_Id; // Extract User_Id from the decoded token
  if (!User_Id) {
    res.status(400).json({ message: 'Invalid token' });
    return;
  }
  try {
    const result = await DatabaseHelper.exec('GetQuestionsByUserWithTags', { User_Id });

    if (result.recordset.length === 0) {
      // User question not found
      return res.status(404).json({ message: 'User question not found' });
    }

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



export const getTopQuiz = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseHelper.exec('GetQuestionWithMostAnswers', {});

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'No question found' });
    }

    const questionId = result.recordset[0].QuestionId;
    const tags = result.recordset.map((row: any) => row.TagName);
    const questionWithTags = {
      QuestionId: questionId,
      Title: result.recordset[0].Title,
      Details: result.recordset[0].Details,
      Try: result.recordset[0].Try,
      Expect: result.recordset[0].Expect,
      UpdateDate: result.recordset[0].UpdateDate,
      VoteCount: result.recordset[0].VoteCount,
      Tags: tags,
    };

    res.status(200).json(questionWithTags);
  } catch (error) {
    console.error('Error retrieving question:', error);
    res.status(500).json({ error: 'Failed to retrieve question' });
  }
};


