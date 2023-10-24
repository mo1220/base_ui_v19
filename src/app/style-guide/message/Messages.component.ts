import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupMessage } from '../../shared/popup-message/popup-message';
import { NotificationService } from "../../core/notifications/notification.service";
import {MessagesService} from "../../core/toast-message/messages.service";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-messages',
  templateUrl: './Messages.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideMessagesComponent implements AfterViewInit, OnDestroy {

  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;

  buttonMenu: any = [
    {
      title: 'Alert Message',
      anchor: 'alertMessage',
      desc: 'Alert Form 값 Validation Check 시 메세지 등',
    },
    {
      title: 'Popup Message',
      anchor: 'popupMessage',
      desc: 'Popup Message 는 창을 덮어 메세지를 먼저 보여줘야 할때 표시',
    },
    {
      title: 'Header Toast Message',
      anchor: 'headerToastMessage',
      desc: '상단 알림 메세지'
    },
    {
      title: 'Toast Message',
      anchor: 'toastMessage',
      desc: 'API 결과 등 상태 알림 메세지'
    }
  ];

  messageTypes: any = {
    success: {
      title: '성공 메세지',
      message: 'Success Message 성공 메세지'
    },
    info: {
      title: '정보 메세지',
      message: 'Info Message 정보 메세지'
    },
    warning: {
      title: '주의 메세지',
      message: 'Warning Message 주의 메세지'
    },
    error: {
      title: '에러 메세지',
      message: 'Error Message 에러 메세지'
    },
  }
  alertActive = true;
  constructor(
    private translate: TranslateService,
    private notiService: NotificationService,
    private msgs: MessagesService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  openPopup(type: string) {
    // 'success' | 'info' | 'warning' | 'error'
    const dialogRef = this.dialog.open(PopupMessage, {
      width: '300px',
      data: {
        title: this.messageTypes[type].title, // this.translate.instant('admin.download_title1'), //
        txt: this.messageTypes[type].message, //this.translate.instant('admin.download_msg1') // ,
        type
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.notiService.success('확인 눌렀음');
      } else {
        this.notiService.info('취소 눌렀음');
      }
    });
  }

  msgBox(type:string): void {
    // this.notiService[type](this.messageTypes[type].message);
    if (type === 'success') {
      this.notiService.success('Success Message 성공 메세지');
    } else if (type === 'info') {
      this.notiService.info('Info Message 정보 메세지');
    } else if (type === 'warning') {
      this.notiService.warn('Warning Message 주의 메세지');
    } else if (type === 'error') {
      this.notiService.error('Error Message 에러 메세지');
    }
  }

  toastMsgBox(d:string) {
    const title = d.toUpperCase();
    // @ts-ignore
    this.msgs[d]({ title: title + ' 제목', message: title + ' Message 메세지 설명' });
  }
  ngOnDestroy(): void { }
}
