import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindPasswordComponent } from './find-password/find-password.component'; // 패스워드 찾기
import { LoginComponent } from './login/login.component'; // 로그인 페이지
import { SessionOutComponent } from './session-out/session-out.component'; // 세션 아웃 페이지

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: '로그인'
    }
  },
  {
    path: 'find-pw',
    component: FindPasswordComponent,
    data: {
      title: '패스워드 찾기'
    }
  },
  {
    path: 'session-out',
    component: SessionOutComponent,
    data: {
      title: '세션 종료'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
