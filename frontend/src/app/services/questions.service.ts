import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, Questions, Questions1 } from '../interface/questions';
import { Asks } from '../interface/ask';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient:HttpClient) { }
  private baseUrl ='http://localhost:4000/questions'

  getAllQuestions() {
    return this.httpClient.get<Questions[]>('http://localhost:4000/questions/allquestions');
  }
  getTopQuestion(){
    return this.httpClient.get('http://localhost:4000/questions/topquiz')
  }
  askQuestion(formData:Asks){
    return this.httpClient.post('http://localhost:4000/questions/ask',formData)
  }
  updateQuestion(formData:Asks, QuestionId:string){
    return this.httpClient.put(`http://localhost:4000/questions/update/:QuestionId`,formData)
  }
  userQuestions(){
    return this.httpClient.get<Questions[]>(`http://localhost:4000/questions/userquestions`)
  }
  deleteQuestion(QuestionId:string){
    return this.httpClient.delete(`${this.baseUrl}/deletequestion/${QuestionId}`)
  }

  tagQuestions(){
    return this.httpClient.get<Questions[]>(`${this.baseUrl}/tagquestion`)
  }
  questionDetail(QuestionId:string){
    return this.httpClient.get<Questions1>(`http://localhost:4000/questions/allquestions/${QuestionId}`)
  }

  
}  
