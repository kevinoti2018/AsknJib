import {deleteUser, getUsers, loginUser, registerController, resetPassword} from '../Controllers/userControllers'
import { Router } from "express";
import { verifyAdmin, verifyEmail, verifyLogin } from '../middleware/verifyLogin';

 export const router=Router()

 router.post('/register',registerController)
 router.post('/login',loginUser)

 router.post('/reset/:token',verifyEmail,resetPassword)
 router.get('/allusers',verifyLogin,getUsers)
 router.put('/deleteuser/:User_Id',verifyAdmin,deleteUser)
