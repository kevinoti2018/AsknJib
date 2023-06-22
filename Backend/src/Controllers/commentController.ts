import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../Helpers';

interface ExtendedRequest extends Request {
  body: {
    CommentId: string;
    Comment: string;
    User_Id: string;
    AnswerId: string;
  };
}

export const addComment = async (req: ExtendedRequest, res: Response): Promise<void> => {
    const { User_Id, AnswerId } = req.params;
    const { Comment } = req.body;
  
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
  
