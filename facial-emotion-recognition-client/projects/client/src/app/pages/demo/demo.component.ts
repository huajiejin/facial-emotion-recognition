import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'projects/services/src/lib/local-storage.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public n1?: number

  public n2?: {v: number}

  public n3: {v?: number} = {}

  constructor(public ls: LocalStorageService) { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.n1 = Math.random()
    this.n2 = {v: Math.random()}
  }

  onUpdateDirectly() {
    this.n3.v = Math.random()
  }

}
