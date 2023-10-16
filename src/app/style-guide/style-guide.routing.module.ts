import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleGuideComponent } from './component/style-guide.component';

const routes: Routes = [
  {
    path: '',
    component: StyleGuideComponent,
    data: { title: 'Style Guide' },
    // children: [
    //   {
    //     path: '',
    //     component: StyleGuideComponent,
    //     data: {title: 'Style Guide'}
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleGuideRoutingModule {}
