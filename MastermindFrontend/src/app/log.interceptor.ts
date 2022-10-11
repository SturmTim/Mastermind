import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {NotifierService} from "./log/NotifierService";

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor(
    private notifierService: NotifierService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.notifierService.notify(`${request.method} ${request.urlWithParams}</br>${JSON.stringify(request.body)}`);
    return next.handle(request);
  }
}
