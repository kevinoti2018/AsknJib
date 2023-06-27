export interface Question {
    QuestionId: number;
    UserId: number;
    Title: string;
    Details: string;
    Try: string;
    Expect: string;
    CreatedDate: Date;
    UpdatedDate: Date;
    VoteCount: number;
  }
  

  export interface Questions {
    QuestionId: string
    Title: string
    Details: string
    Try: string
    Expect: string
    Tags: string[]
    VoteCount: number
    AnswerCount: number
    CreateDate: string
    TimeElapsed?: string;
  }




  export interface Root {
    QuestionId: string
    Title: string
    Details: string
    Try: string
    Expect: string
    CreateDate: string
    UpdateDate: any
    User_Id: string
    VoteCount: number
    isDeleted: boolean
    AnswerCount: number
    Comments: Comment[]
    Answers: Answer[]
  }
  
  export interface Comment {
    CommentId: string
    Comment: string
    CreationDate: string
    User_Id: string
  }
  
  export interface Answer {
    AnswerId: string
    Answer: string
    VoteCount: number
    QuestionId: string
    CreatedDate: string
    User_Id: string
    accepted: boolean
  }
  