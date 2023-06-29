import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }
  commentAnswer(Comment:string,AnswerId:string){
    return this.httpClient.post(`http://localhost:4000/comments/comment/${AnswerId}`,{Comment})
  }
}
