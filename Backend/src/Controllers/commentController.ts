import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../Helpers';

interface ExtendedRequest extends Request {
  info?: {
    User_Id: string;
  };
  body: {
    CommentId: string;
    Comment: string;
    AnswerId: string;
  };
}

export const addComment = async (req: ExtendedRequest, res: Response): Promise<void> => {
    const { AnswerId } = req.params;
    const { Comment } = req.body;
    const User_Id = req.info?.User_Id; // Extract User_Id from the decoded token
    if (!User_Id) {
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
    try {
      const CommentId = uid();
      const CreationDate = new Date().toISOString();
      const data = {
        CommentId,
        Comment,
        CreationDate,
        User_Id,
        AnswerId,
      };
  
       await DatabaseHelper.exec('AddComment', data);
  
      // Retrieve the inserted recordset by calling GetCommentsByCommentId stored procedure
      const commentResult = await DatabaseHelper.exec('GetCommentsById', { CommentId });
  
      const insertedComment = commentResult.recordset[0];
  
      res.json({ message: 'Comment added successfully', comment: insertedComment });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
