import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing.module';
import { BlankComponent } from './blank/blank.component'; // 빈 페이지
import { ErrorComponent } from './error/error.component'; // ETC Error Page

@NgModule({
  declarations: [
    BlankComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ],
  providers: []
})
export class PagesModule {}
