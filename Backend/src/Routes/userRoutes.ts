import {deletUser, getUsers, loginUser, registerController, resetPassword} from '../Controllers/userControllers'
import { Router } from "express";

 export const router=Router()

 router.post('/register',registerController)
 router.post('/login',loginUser)
 router.post('/reset',resetPassword)
 router.get('/allusers',getUsers)
 router.put('/deleteuser/:User_Id',deletUser)
