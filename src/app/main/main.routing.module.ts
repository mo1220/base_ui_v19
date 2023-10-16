import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './component/main.component';
// import {MainDeactivateGuard} from './deactivateGuard/main-deactivateGuard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canDeactivate: [MainDeactivateGuard],
    data: { title: 'nav.menu1' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
