 export  interface User {
    User_Id: string;
    Username: string;
    Email: string;
    Password: string;
    IsAdmin: number;
    isDeleted: number;
  }

  export interface Login{
    Username: string;
    Email: string;
  }
  

  export interface Register{
    User_Id: string;
    Username: string;
    Email: string;
    Password: string;
  }