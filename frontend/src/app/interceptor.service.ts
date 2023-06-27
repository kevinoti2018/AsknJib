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
   if(req.url !==''&& req.url!==''){
    let modifiedReq= req.clone({headers:new HttpHeaders().append('token',token)})
    return next.handle(modifiedReq)
   }

   return next.handle(req)
  }
}
