import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public isLogin$ = this.ls.isLogin$
  public user$ = this.ls.user$

  constructor(public ls: LocalStorageService) { }

  ngOnInit(): void {
  }

}
