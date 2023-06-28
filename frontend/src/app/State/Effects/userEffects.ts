import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import * as UserActions from '../Actions/userActions'
import { mergeMap, tap, map, catchError, of } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects{
    constructor(private action$:Actions, private userService:UserService , private authService:AuthService, private router:Router){}
    
    loginUser$= createEffect(()=>{
        return this.action$.pipe(
            ofType(UserActions.LoginUser),
            mergeMap(action=>{
                return this.userService.loginUser(action.user).pipe(
                    tap((ms)=>{
                        this.authService.login(ms)
                        this.router.navigate(['/questions'])
                        
                    }),
                    map(ms=>UserActions.LoginUserSuccess()),
                    
                    catchError(error=>of(UserActions.LoginUserFailure({error:error})))
                )
            })
        )
      })
      
      registerUser$= createEffect(()=>{
        return this.action$.pipe(
            ofType(UserActions.RegisterUser),
            mergeMap(action=>{
                return this.userService.registerUser(action.newUser).pipe(
                    map(ms=>UserActions.RegisterUserSuccess({message:ms.message})),
                    catchError(error=>of(UserActions.RegisterUserFailure({error:error})))
                )
            })
        )
      })
      forgotUser$= createEffect(()=>{
        return this.action$.pipe(
            ofType(UserActions.ForgotUser),
            mergeMap(action=>{
                return this.userService.resetPassword(action.newPassword).pipe(
                    map((response: any) => UserActions.ForgotUserSuccess({ message: response.message })),
                    catchError(error=>of(UserActions.ForgotUserFailure({error:error})))
                )
            })
        )
      })

      resetUser$ = createEffect(() => {
        return this.action$.pipe(
          ofType(UserActions.ResetUser),
          mergeMap(action => {
            return this.userService.forgotUser(action.Email).pipe(
              map((response: any) => UserActions.ResetUserSuccess({ message: response.message })),
              catchError(error => of(UserActions.ResetUserFailure({ error: error.message })))
            );
          })
        );
      });


      getUser$ = createEffect(() => {
        return this.action$.pipe(
          ofType(UserActions.getUsers),
          mergeMap((action) => {
            return this.userService.getUsers().pipe(
              map((users) => UserActions.getUsersSuccess({users})),
              catchError((error) => of(UserActions.getUsersFailure()))
            );
          })
        );
      });

      deletUser$ = createEffect(() => {
        return this.action$.pipe(
          ofType(UserActions.DeleteUser),
          mergeMap((action) => {
            return this.userService.deleteUser(action.User_Id).pipe(
              map((response: any) => UserActions.DeleteUserSuccess({ message: response.message })),
              catchError((error) => of(UserActions.DeleteUserFailure({ error: error.message })))
            );
          })
        );
      });
      
}