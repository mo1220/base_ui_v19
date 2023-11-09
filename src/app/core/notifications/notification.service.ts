import { Component, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { actionAuthClear } from '../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { LocalStorageService } from "../local-storage/local-storage.service";
import { Location } from "@angular/common";
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
const AUTH_KEY = 'AUTH';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  interval$: Subject<any> = new Subject<any>();

  // store:any;
  constructor(
    // private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone,
    private injector: Injector,
    private location: Location,
    private translate: TranslateService
  ) {
    // super(injector);
    // this.store = injector.get(Store);
    this.interval$
      .pipe(debounceTime(500))
      .subscribe( () => {
        // console.log(res);
        // this.errorMsg(res.message, res.err);
      });
  }

  get router(): Router {
    return this.injector.get(Router);
  }

  get store(): Store<AppState> {
    return this.injector.get(Store);
  }

  default(message: string) {
    this.show(message, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string) {
    let path = this.location.path();
    // TODO SK-login 빼기
    const is_login_page = ['/logindataportal', '/ssoLoginError', '/logout', '/sk-login'].includes(path);
    let classes = is_login_page ? ['info-notification-overlay', 'panel-top-mg'] : 'info-notification-overlay';
    this.show(message, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: classes
    });
  }

  success(message: string) {
    let path = this.location.path();
    // TODO SK-login 빼기
    const is_login_page = ['/logindataportal', '/ssoLoginError', '/logout', '/sk-login'].includes(path);
    let classes = is_login_page ? ['success-notification-overlay', 'panel-top-mg'] : 'success-notification-overlay';
    this.show(message, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: classes//'success-notification-overlay'
    });
  }

  warn(message: string, classStr?: any) {
    let path = this.location.path();
    const is_login_page = ['/logindataportal', '/ssoLoginError', '/logout'].includes(path);
    let classes = is_login_page ? ['warning-notification-overlay', 'panel-top-mg'] : 'warning-notification-overlay';
    this.show(message, {
      duration: 2500,
      verticalPosition: 'top',
      panelClass: classStr ? classStr : classes//'warning-notification-overlay'
    });
  }

  warning(message: string, classStr?: any) {
    let path = this.location.path();
    const is_login_page = ['/logindataportal', '/ssoLoginError', '/logout'].includes(path);
    let classes = is_login_page ? ['warning-notification-overlay', 'panel-top-mg'] : 'warning-notification-overlay';
    this.show(message, {
      duration: 2500,
      verticalPosition: 'top',
      panelClass: classStr ? classStr : classes//'warning-notification-overlay'
    });
  }
  msgInvertal: any;
  error(message: string, err?: any) {
    let isAuthErr:boolean = false;
    console.info(err);
    if(this.msgInvertal) return;
    // 시스템 점검
    if(err && err.error && err.error.code && err.error.code === 'SYSTEM_CHECK') {
      this.zone.run(() => this.router.navigate(['/system-check-info']));
      return;
    }


    // if(err.status === 401){
    //   setTimeout(() => {
    //     this.show('세션이 종료되어 로그인 화면으로 이동합니다.', {
    //       duration: 3000,
    //       verticalPosition: 'top',
    //       panelClass: ['error-notification-overlay', 'panel-top-mg']
    //     });
    //   }, 1)
    // }

    const is401 = err && err.status === 403 && err.error.message.indexOf('401') > -1;
    if (err && (err.status === 401 || is401)) { //
      this.zone.run(() => {
        this.localStorageService.removeItem(AUTH_KEY)
          this.store.dispatch(actionAuthClear())
      });
      this.zone.run(() => this.router.navigate(['/ssoLoginError']));//['/logindataportal'])); // 서브원 login page
      // this.zone.run(() => this.router.navigate(['/sk-login'])); // sk login page
      // let translateMessage = this.translate.instant('errors.err03');
      // if(err.status === 403){
      //   translateMessage = this.translate.instant('errors.err04');
        this.msgInvertal = true;
        setTimeout(() => {
          this.msgInvertal = false;
        }, 3000);
      // }
      return;
    }
    let msg:any = message;
    if(err && err.error) {
      msg = err.error.message;
    }

    if(typeof msg === 'object') {
      if (err && (err.status === 401 || err.status === 403)) {
        if(err.status === 401){
          msg = this.translate.instant('errors.err03');
        }else{
          msg = this.translate.instant('errors.err04');
        }
      }else {
        msg = msg.error ? msg.error.message : this.translate.instant('errors.err01')
      }
    }

    let path = this.location.path();
    const is_login_page = ['/logindataportal', '/ssoLoginError', '/logout', '/sk-login'].includes(path);
    let classes = is_login_page ? ['error-notification-overlay', 'panel-top-mg'] : 'error-notification-overlay';
    if(isAuthErr) classes = 'error-notification-overlay';

    if(msg && msg !== '') {
      this.show(msg, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: classes
      });
    }
    if(err && err.status === 500) {
     //  console.log(err.error.error.message, 'err.error.error.message=========================')
      let msg ='';
      if(err.error && err.error.error && err.error.error.message){
        if (err.error.error.message === 'LOGIN_ERR_01') {
          msg = this.translate.instant('noti.login_err_01');
        }
        if (err.error.error.message === 'LOGIN_ERR_02') {
          msg = this.translate.instant('noti.login_err_02');
        }
        if (err.error.error.message === 'LOGIN_ERR_03') {
          msg = this.translate.instant('noti.login_err_03');
        }
        this.show(msg, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-notification-overlay', 'panel-top-mg']  //'panel-top-mg'
        });
      }

    } else {
      if(err) {
        if (err && (err.status === 401 || err.status === 403 || err.status === 400)) {
          if(err.status === 401){ // 세션 만료
            msg = this.translate.instant('errors.err03');
          } else if(err.status === 400) { // 사용자계정(비밀번호) 일치하지 않을 때 초기화 화면 이동
            msg = _.clone(msg); //this.translate.instant('errors.err03');
          } else { // 권한에러
            msg = this.translate.instant('errors.err04');
          }
          this.show(msg, {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-notification-overlay', 'panel-top-mg']
          });
        } else {
          msg = err.error ? err.error.error? err.error.error.name + ': ' + err.error.error.message : err.name + ': ' + err.statusText : err.name + ': ' + err.statusText;
          this.show(msg, {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: classes
          });
        }
      }
    }
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() => this.snackBar.open(message, 'x', configuration));
  }
  // private errShow(configuration: MatSnackBarConfig) {
  //   this.zone.run(() => this.snackBar.openFromComponent(ErrNotificationComponent, configuration));
  // }
}


@Component({
  selector: 'err-notification',
  templateUrl: 'err-notification.template.html',
  styles: [    `
      .err-noti-wrap { padding-top: 2px; justify-content: center; font-size: 12px; text-align: center }
      .err-noti-title { }
      .err-noti-exit { position: absolute; top: 0; right: 10px; }
      /*.err-noti-wrap-bg { position: fixed; top:0; bottom: 0; left:0; right:0; z-index: 999; background-color: rgba(0,0,0,0.05);}*/
  `,
  ],
})
export class ErrNotificationComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ErrNotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
  /* errOpen = false; */
}
