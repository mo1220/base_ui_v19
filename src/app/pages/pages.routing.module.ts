import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankComponent } from './blank/blank.component'; // 빈 페이지
import { PageNotFoundComponent } from './404/404.component'; // 404 Page Not Found
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
    path: '404',
    component: PageNotFoundComponent,
    data: {
      title: 'Page not found'
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
