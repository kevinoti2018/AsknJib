import { createAction,props } from "@ngrx/store";
import { Login, Register, ResetEmail, ResetPassword, User, User1 } from "src/app/interface/user";



export const LoginUser=createAction('[Login] user Login', props<{ user:Login}>())
export const LoginUserSuccess = createAction('[Login] user Login Success')
export const LoginUserFailure = createAction('[Login] user Login Failure',props<{error:string}>())


export const RegisterUser = createAction('[Register] user Register',props<{newUser:Register}>())
export const RegisterUserSuccess = createAction('[Register] user Register success',props<{message:string}>())
export const RegisterUserFailure = createAction('[Register] user Register Failure',props<{error:string}>())

export const ResetUser= createAction('[Reset] user Reset', props<{Email:string}>())
export const ResetUserSuccess= createAction('[Reset] user Reset Success', props<{message:string}>())
export const ResetUserFailure= createAction('[Reset] user Reset Failure', props<{error:string}>())

export const ForgotUser =createAction('[ForgotComponent] Forgot password',props<{newPassword:string}>())
export const ForgotUserSuccess =createAction('[ForgotComponent] Forgot password',props<{message:string}>())
export const ForgotUserFailure =createAction('[ForgotComponent] Forgot password',props<{error:string}>())

export const getUsers=createAction('[Home] Getusers')
export const getUsersSuccess = createAction('[Home] Get users success', props<{ users: User[] }>());
export const getUsersFailure=createAction('[Home] Getusers failure,,props<{message:string}>()')

export const getUser = createAction('[Home] Getusers');
export const getUserSuccess = createAction('[Home] Get users success', props<{ user1: User }>());
export const getUserFailure = createAction('[Home] Getusers failure', props<{ error: string }>());




export const DeleteUser=createAction('[User] user delete', props<{ User_Id:string}>())
export const DeleteUserSuccess = createAction('[User] user delete Success',props<{message:string}>())
export const DeleteUserFailure = createAction('[User] user delete Failure',props<{error:string}>())


