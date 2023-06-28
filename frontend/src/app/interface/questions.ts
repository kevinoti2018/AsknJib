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
    Username:string
    TimeElapsed?: string;
  }



    export interface Questions1 {
    Title: string
    Details: string
    Try: string
    QuestionId:string
    Expect: string
    CreateDate: string
    UpdateDate: any
    User_Id: string
    Username: string
    VoteCount: number
    isDeleted: boolean
    AnswerCount: number
    Answers: Answer[]
  }
  
  export interface Answer {
    AnswerId: string
    Answer: string
    VoteCount: number
    QuestionId: string
    CreatedDate: string
    User_Id: string
    Username: string
    accepted: boolean
    Comments: Comment[]
  }
  
  export interface Comment {
    CommentId: string
    Comment: string
    CreationDate: string
    User_Id: string
    Username: string
  }
  