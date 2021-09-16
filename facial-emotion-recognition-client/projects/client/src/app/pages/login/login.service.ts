import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { Md5 } from 'ts-md5'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<RestResult>('api/public/user/login', { username, password: this.encodeParrword(password) }).pipe(
      shareReplay(),
    )
  }

  register(username: string, password: string, role?: string) {
    return this.http.post<RestResult>('api/public/user/register', { username, password: this.encodeParrword(password), role }).pipe(
      shareReplay(),
    )
  }

  encodeParrword(password: string) {
    return Md5.hashStr(password)
  }

}

interface RestResult<T = any> {
  result: T
}
