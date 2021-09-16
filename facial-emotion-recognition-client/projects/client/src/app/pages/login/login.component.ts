import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private ls: LocalStorageService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value
      this.loginService.login(username, password).subscribe(
        res => this.postLogin(res.result),
        _ => this.openSnackBar('账号或密码错误'),
      )
    }
  }

  register() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value
      this.loginService.register(username, password).subscribe(
        res => this.postLogin(res.result),
        _ => this.openSnackBar('注册失败'),
      )
    }
  }

  private postLogin(token: string) {
    this.ls.setAuthorization(token)
    this.router.navigateByUrl('')
  }

  private openSnackBar(msg: string) {
    return this.snackBar.open(msg, '关闭', {
      duration: 5000,
    })
  }

}
