import { Router } from "express";
import { addComment } from "../Controllers/commentController";

export const commentRoutes = Router()

commentRoutes.post('/comment/:AnswerId/:User_Id',addComment)