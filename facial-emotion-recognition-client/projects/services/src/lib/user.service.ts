import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Md5 } from 'ts-md5'
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
  ) { }

  login(username: string, password: string) {
    return this.http.post<RestResult<string>>('api/public/user/login', { username, password: this.encodePassword(password) }).pipe(
      shareReplay(),
    )
  }

  register(username: string, password: string, role?: string) {
    return this.http.post<RestResult<string>>('api/public/user/register', { username, password: this.encodePassword(password), role }).pipe(
      shareReplay(),
    )
  }

  getUser() {
    return this.http.get<any>('api/user').pipe(
      shareReplay(),
    )
  }

  isLogin$ = this.ls.authorization$.pipe(map(authorization => !!authorization))

  private encodePassword(password: string) {
    return Md5.hashStr(password)
  }

}

interface RestResult<T = any> {
  result: T
}
