import { Request, Response } from 'express';
import {v4 as uid} from 'uuid'
import { DatabaseHelper } from '../Helpers';


interface Question {
  QuestionId: string;
  Title: string;
  Details: string;
  Try: string;
  Expect: string;
  AnswerCount:number,
  VoteCount:number
  Tags: string[];
  CreateDate: Date
  UpdateDate: Date
  User_Id:string,
  Username:string
  isDeleted?:boolean

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

  try {
    const QuestionId = uid();
    const CreateDate = new Date().toISOString();

    // Preprocess the Tags data
    const preprocessedTags = Tags
      .split(',')
      .map((tag: string) => tag.trim()) // Trim whitespace
      .filter((tag: string) => tag !== ''); // Remove empty tags

    const data = {
      QuestionId,
      Title,
      Details,
      Try,
      Expect,
      CreateDate,
      User_Id,
      VoteCount: 0, // Assuming the initial vote count is 0
      Tags: preprocessedTags.join(','),
    };

    const result = await DatabaseHelper.exec('insertQuestion', data);
    
    res.status(200).json({"message":"question sent successfully"});
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
      const result = await DatabaseHelper.exec('GetQuestionByIdWithAnswersAndComments', { QuestionId });
  
      if (result.recordsets.length === 0) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      const [questionRecordset, answerRecordset] = result.recordsets;

      const questionWithAnswersAndComments = {
        QuestionId: questionRecordset[0].QuestionId,
        Title: questionRecordset[0].Title,
        Details: questionRecordset[0].Details,
        Try: questionRecordset[0].Try,
        Expect: questionRecordset[0].Expect,
        CreateDate: questionRecordset[0].CreateDate,
        UpdateDate: questionRecordset[0].UpdateDate,
        User_Id: questionRecordset[0].User_Id,
        Username: questionRecordset[0].Username,
        VoteCount: questionRecordset[0].VoteCount,
        isDeleted: questionRecordset[0].isDeleted,
        AnswerCount: questionRecordset[0].AnswerCount,
        Answers: answerRecordset.map((row: any) => ({
          AnswerId: row.AnswerId,
          Answer: row.Answer,
          VoteCount: row.VoteCount,
          QuestionId: row.QuestionId,
          CreatedDate: row.CreatedDate,
          User_Id: row.User_Id,
          Username: row.AnswerUsername,
          accepted: row.accepted,
          Comments: [],
        })),
      };
  
      answerRecordset.forEach((row: any) => {
        const answerId = row.AnswerId;
        const answerIndex = questionWithAnswersAndComments.Answers.findIndex((answer: any) => answer.AnswerId === answerId);
        if (answerIndex !== -1) {
          questionWithAnswersAndComments.Answers[answerIndex].Comments.push({
            CommentId: row.CommentId,
            Comment: row.Comment,
            CreationDate: row.CreationDate,
            User_Id: row.CommentUser_Id,
            Username: row.CommentUsername,
          });
        }
      });
  
      res.status(200).json(questionWithAnswersAndComments);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  
  export const getQuestions = async (req: Request, res: Response) => {
    try {
      const pageNumber: number = Number(req.query.pageNumber) || 1;
      const pageSize: number = Number(req.query.pageSize) || 10;
  
      const result = await DatabaseHelper.exec('GetAllQuestions', {
        PageNumber: pageNumber,
        PageSize: pageSize,
      });
  
      const questions: Question[] = [];
      const questionMap: Map<string, Question> = new Map();
  
      result.recordset.forEach((row: any) => {
        const questionId: string = row.questionId;
  
        if (questionMap.has(questionId)) {
          const existingQuestion = questionMap.get(questionId) as Question;
          existingQuestion.Tags.push(row.TagName);
        } else {
          const question: Question = {
            QuestionId: questionId,
            Title: row.Title,
            Details: row.Details,
            Try: row.Try,
            Expect: row.Expect,
            Tags: [row.TagName],
            VoteCount: row.VoteCount,
            AnswerCount: row.AnswerCount,
            UpdateDate: row.UpdateDate,
            CreateDate: row.CreateDate,
            User_Id: row.User_Id,
            Username: row.Username,
          };
  
          questions.push(question);
          questionMap.set(questionId, question);
        }
      });
  
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

export const getQuestionsByTag = async (req: Request<{ TagName: string }>, res: Response) => {
  const { TagName } = req.body;

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
    const result = await DatabaseHelper.exec('GetQuestionsByUserWithTags2', { User_Id });

    if (result.recordset.length === 0) {
      // User question not found
      return res.status(404).json({ message: 'User question not found' });
    }

    const questions: Question[] = [];

    result.recordset.forEach((row: any) => {
      const questionId: string = row.questionId;

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
          AnswerCount: row.AnswerCount,
          Tags: [row.TagName],
          VoteCount: row.VoteCount,
          CreateDate: row.CreateDate,
          UpdateDate: row.UpdateDate,
          User_Id: row.User_Id,
          Username: row.Username,
          isDeleted: row.isDeleted
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


interface extRq1 extends Request  {
  info?: {
    User_Id:string
  }
  body:{
    QuestionId:string
  }
  
}
export const downvoteQuestion = async (req: extRq1, res: Response) => {
  try {
    const { QuestionId } = req.body;
    const User_Id = req.info?.User_Id; // Extract User_Id from the decoded token
    console.log(User_Id, QuestionId);
    if (!User_Id) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }

    // Call the stored procedure and pass the parameters
    const result = await DatabaseHelper.exec('DownvoteQuestion3', {
      User_Id,
      QuestionId,
    });

    // Check the result from the stored procedure
    const message = result.recordset[0].Message;

    if (message === 'Downvote successful') {
      res.status(200).json({ message: 'Vote cast successfully.' });
    } else {
      res.status(400).json({ message });
    }
  } catch (error: any) {
    if (error.number === 50001 || error.number === 50002) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export const upvoteQuestion = async (req: extRq1, res: Response) => {
  try {
    const { QuestionId } = req.body;
    const User_Id = req.info?.User_Id; // Extract User_Id from the decoded token
    console.log(User_Id, QuestionId);
    
    if (!User_Id) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }

    const result = await DatabaseHelper.exec('UpvoteQuestion3', {
      User_Id,
      QuestionId,
    });

    const message = result.recordset[0].Message;

    if (message === 'Upvote successful') {
      res.status(200).json({ message: 'Vote cast successfully.' });
    } else {
      res.status(400).json({ message });
    }
  } catch (error: any) {
    if (error.number === 50001 || error.number === 50002) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};




