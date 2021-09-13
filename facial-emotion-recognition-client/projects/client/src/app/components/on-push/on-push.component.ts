import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';

@Component({
  selector: 'app-on-push',
  templateUrl: './on-push.component.html',
  styleUrls: ['./on-push.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent implements OnInit {

  @Input() i1?: number = 0
  @Input() i2?: {v: number}
  @Input() i3?: {v?: number}

  s1: {v?: number} = {}

  isLogin$ = this.ls.isLogin$

  constructor(private ls: LocalStorageService) { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.s1.v = Math.random()
  }

}
