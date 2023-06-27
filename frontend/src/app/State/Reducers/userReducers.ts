
import { createReducer ,on} from "@ngrx/store";
import * as UserActions from '../Actions/userActions'

export interface LoggedIn{
    Login:[],
    error:''
}
export const userReducer = createReducer(
    on(UserActions.Login,(state,action)=>{
        return{
            

        }
    })
)