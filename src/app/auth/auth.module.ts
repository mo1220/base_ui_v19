import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';

import { FindPasswordComponent } from './find-password/find-password.component'; // 패스워드 찾기
import { LoginComponent } from './login/login.component'; // 로그인 페이지
import { SessionOutComponent } from './session-out/session-out.component'; // 세션 아웃 페이지

@NgModule({
  declarations: [
    FindPasswordComponent,
    LoginComponent,
    SessionOutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule {}
