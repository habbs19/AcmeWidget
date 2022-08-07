import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcmeWidgetInterceptorService implements HttpInterceptor {

  baseURL : string = 'https://localhost:7292/api'
  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const api = req.clone({ url: `${this.baseURL}/${req.url}` });
    return next.handle(api);
  }
}
