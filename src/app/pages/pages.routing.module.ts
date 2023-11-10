import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankComponent } from './blank/blank.component'; // 빈 페이지
import { ErrorComponent } from './error/error.component'; // ETC Error Page
const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    data: {
      title: 'Blank'
    }
  },
  {
    path: 'blank',
    component: BlankComponent,
    data: {
      title: 'Blank'
    }
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      title: 'Error'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
