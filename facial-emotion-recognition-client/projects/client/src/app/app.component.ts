import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';
import { UserService } from 'projects/services/src/public-api';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogin$ = this.userService.isLogin$

  routeData$ = this.router.events.pipe(
    filter(e => e instanceof RoutesRecognized),
    map(e => e instanceof RoutesRecognized ? e?.state?.root?.firstChild?.data : {})
  )

  constructor(
    private ls: LocalStorageService,
    private router: Router,
    private userService: UserService,
  ) {
  }

  logout() {
    this.ls.setAuthorization('')
    this.router.navigateByUrl('')
  }

}
