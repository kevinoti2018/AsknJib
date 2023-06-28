
export interface User {
    User_Id?: string;
    Username: string;
    Email: string;
    Password:string
    IsAdmin?: boolean;
    isDeleted?: boolean;
  }
  export interface User1 {
    User_Id: string;
    Username: string;
    Email: string;
    IsAdmin: boolean;
    isDeleted: boolean;
  }
  
  
  export interface Register{
    Username: string;
    Email: string;
    Password:string
  }
export interface Login{
    Email:string
    Password:string
}
export interface LoginSuccess{
    token:string
    role:string
    message:string
    username:string
}
export interface ResetEmail{
    Email:string
}
export interface ResetPassword{
    newPassword:string
}

export interface RegisterSuccess{
    message:string
}
