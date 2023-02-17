import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private ls: LocalStorageService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: {Authorization: this.ls.getAuthorization() || ''}
    })
    return next.handle(newRequest);
  }
}
