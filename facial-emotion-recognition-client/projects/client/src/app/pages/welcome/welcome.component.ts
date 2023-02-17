import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';
import { UserService } from 'projects/services/src/lib/user.service';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  isLogin$ = this.userService.isLogin$

  welcomeMsg$ = this.isLogin$.pipe(
    switchMap(() => this.user$ || of()),
    map(user => `${user?.username || ''}你好，欢迎来到上课系统！`),
  )

  user$?: Observable<any>

  constructor(
    private ls: LocalStorageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.isLogin$.pipe(
      filter(isLogin => isLogin),
      switchMap(() => this.userService.getUser())
    )
  }

}
