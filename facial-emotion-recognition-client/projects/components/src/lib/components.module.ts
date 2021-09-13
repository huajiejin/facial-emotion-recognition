import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FixedNavComponent } from './fixed-nav/fixed-nav.component';



@NgModule({
  declarations: [
    FixedNavComponent
  ],
  imports: [
    FlexLayoutModule
  ],
  exports: [
    FixedNavComponent
  ]
})
export class ComponentsModule { }
