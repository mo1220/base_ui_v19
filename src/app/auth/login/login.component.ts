import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment';
import {LocalStorageService} from "../../core/local-storage/local-storage.service";

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

  emailRemember = false;
  loading = false;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  ngAfterViewInit(): void { }

  /**
   * @function emailUsed 이메일 기억하기
   * @param event: boolean
   * */
  emailUsed(e: any) {
    this.localStorageService.setItem('AUTH.EMAILUSED', e);
  }

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
