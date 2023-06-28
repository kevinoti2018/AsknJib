import {deleteUser, forgotPassword, getUserById, getUsers, loginUser, registerController, resetPassword} from '../Controllers/userControllers'
import { Router } from "express";
import { verifyAdmin, verifyEmail, verifyLogin } from '../middleware/verifyLogin';

 export const router=Router()

 router.post('/register',registerController)
 router.post('/login',loginUser)
 router.post('/forgot',forgotPassword)
 router.post('/reset/:token',verifyEmail,resetPassword)
 router.get('/user',verifyLogin,getUserById)
 router.get('/allusers',verifyLogin,getUsers)
 router.put('/deleteuser/:User_Id',verifyAdmin,deleteUser)
