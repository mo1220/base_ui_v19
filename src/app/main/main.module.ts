import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
    imports: [
      CommonModule,
      SharedModule,
      MainRoutingModule,
    ],
  exports: [],
  providers: []
})
export class MainModule {}
