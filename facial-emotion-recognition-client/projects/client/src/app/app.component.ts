import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLogin$ = this.ls.isLogin$
  routeData$ = this.router.events.pipe(
    filter(e => e instanceof RoutesRecognized),
    map(e => e instanceof RoutesRecognized ? e?.state?.root?.firstChild?.data : {})
  )

  constructor(
    private ls: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  logout() {
    this.ls.setIsLogin(false)
    this.router.navigateByUrl('')
  }

}
