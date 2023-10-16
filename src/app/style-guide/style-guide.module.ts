import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StyleGuideComponent } from './component/style-guide.component';
import { StyleGuideRoutingModule } from './style-guide.routing.module';

@NgModule({
  declarations: [
    StyleGuideComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StyleGuideRoutingModule,
  ],
  exports: [],
  providers: []
})
export class StyleGuideModule {}
