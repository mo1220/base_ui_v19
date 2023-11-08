import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'login-component',
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  env = env;
  form = {
    id: '',
    password: ''
  }

  messages = {
    id: '',
    pw: ''
  };
  loading = false;
  constructor(
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void { }

  login() {
    this.messages = { id: '', pw: '' };
    if(this.form.id === '') {
      this.messages.id = '아이디는 필수 입력입니다.';
      return;
    }
    if(this.form.password === '') {
      this.messages.pw = '비밀번호는 필수 입력입니다.';
      return;
    }
    this.loading = true;
  }
  ngOnDestroy(): void { }
}
