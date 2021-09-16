import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public username$ = this.ls.authorization$.pipe(
    map(token => {
      const tokenBody = token?.split('.')[1]
      return tokenBody ? JSON.parse(atob(tokenBody)).sub : ''
    })
  )

  constructor(public ls: LocalStorageService) { }

  ngOnInit(): void {
  }

}
