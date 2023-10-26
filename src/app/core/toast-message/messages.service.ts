import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CustomToastComponent } from '../../shared/toast-message/toast-message.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  success(d: { message?: string; title: string; }): void {
    // console.log(d);
    const message = d.message;
    const title = d.title;
    this.toastr.success(message, title);
  }

  warning(d: { message?: string; title: string; } ): void {
    const message = d.message;
    const title = d.title;
    this.toastr.warning(message, title,{
      timeOut: 3000
    });
  }
  info(d: { message?: string; title: string; }): void {
    const message = d.message;
    const title = d.title;
    this.toastr.info(message, title);
  }

  error(d: any): void {
    if (d.status === 0) { return; }
    if (typeof d === 'string') { d = JSON.parse(d); }
    // Error Status Code 별 Message
    // Auth Error
    let message = d.message;
    let title = d.title;
    let traceId = null;
    if(title === 'EmptyError') return; // 취소 된 API는 메세지 출력 안함

    if (d.error) {
      if (d.error.error) {
        message = d.error.error.message ? d.error.error.message : message;
        title = d.error.error.name ? d.error.error.name : title;
        traceId = d.error.error.traceId ? d.error.error.traceId : null;
      } else {
        message = d.error.message ? d.error.message : message;
        title = d.error.name ? d.error.name : title;
      }
    }

    if (d.status === 401) {
      this.router.navigate(['/session-out']);
      this.localStorageService.removeItem('AUTH');
      message = '잘못된 접근 입니다.';
      title = '사용자 권한 에러';
    }

    if (d.status === 400) {
      // 서버 에러
      message = d.error.error.message;
      title = d.error.error.code ? d.error.error.code : d.error.error.name;
    }

    if (d.status === 500) {
      // 서버 에러
      message = d.error.error.message;
      title = d.error.error.code ? d.error.error.code : d.error.error.name;
    }

    if(traceId !== null) {
      if(d.status === 500) {
        title = '[오류] ' + title;
        this.toastr.error(message, title, {
          toastComponent: CustomToastComponent,
          messageClass: traceId,
          enableHtml: true,
          extendedTimeOut: 5000,
          timeOut: 5000
        });
      } else {
        this.toastr.error(message, title, {
          toastComponent: CustomToastComponent,
          messageClass: traceId,
          enableHtml: true,
          extendedTimeOut: 5000,
          timeOut: 5000
        });
      }

    } else {
      message = '처리중 오류가 발생하였습니다.';
      this.toastr.error(message, title, {
        timeOut: 5000
      });
    }
  }
}
