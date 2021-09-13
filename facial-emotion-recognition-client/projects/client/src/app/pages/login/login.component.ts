import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public sourceUrl?: string

  public loginForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private ls: LocalStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.ls.sourceUrl$.subscribe(v => this.sourceUrl = v)
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      const { name } = this.loginForm.value
      this.ls.setUser({ name })
      this.ls.setIsLogin(true)
      this.router.navigateByUrl(this.sourceUrl || '')
    }
  }

}
