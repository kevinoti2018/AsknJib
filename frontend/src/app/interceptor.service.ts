import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let token = localStorage.getItem('token') as string
   if(req.url !=='http://localhost:4000/usersroutes/login'&& req.url!=='http://localhost:4000/usersroutes/register'){
    let modifiedReq= req.clone({headers:new HttpHeaders().append('token',token)})
    return next.handle(modifiedReq)
   }

   return next.handle(req)
  }
}
