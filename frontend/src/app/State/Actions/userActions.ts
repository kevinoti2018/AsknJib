import { createAction,props } from "@ngrx/store";

export const Login =createAction('[Login Component] Login', props<{ Email: string, Password: string }>())

export const Register = createAction('[Register Component] Register',props<{Email:string,Password:String,UserName:string}>())

export const Reset= createAction('[Reset Component] Reset', props<{Email:string}>())

export const Forgot =createAction('[ForgotComponent] Forgot',props<{newPassword:string}>())

export const getUsers=createAction('[Home Component] Getusers')


