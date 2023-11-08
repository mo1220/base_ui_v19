import { Component, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { setTheme } from 'ngx-bootstrap/utils';
import { MENU } from "../shared/menu.arr";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "../core/local-storage/local-storage.service";
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  env = env;
  menus: any = [ ...MENU ];

  rippleColor = 'rgba(0,123,255,0.05)';
  title = 'Data Tree Studio';
  activeNum = -1;
  routingTabs = new Array(30).fill(0).map((_, index) => {
    return {
      label: `Tab ${index}`,
      link: 'aaaa'
    }
  });
  lang = 'kr';

  languages: any = {
    kr: {
      name: '한국어',
      value: 'kr'
    },
    en: {
      name: 'English',
      value: 'en'
    },
    cn: {
      name: '中國語',
      value: 'cn'
    }
  };
  loading = false;
  url = '';
  noFramePages = ['auth', 'logindataportal', 'logout', 'ssoLoginError', 'noexist', 'init-login', 'system-check-info', 'expire-info', 'sk-login'];
  isNoFrame = false;
  isMainPage = false;
  isSearchPage = false;
  isAdminPage = false;
  isSystemPage = false; // 시스템 점검
  constructor(
    private storageService: LocalStorageService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    setTheme('bs5');
    this.lang = storageService.getItem('APPS.LANG') ? storageService.getItem('APPS.LANG') : 'kr';
    translate.setDefaultLang(this.lang); // kr 먼저 추가 시켜준다.
    storageService.setItem('APPS.LANG', this.lang);
    translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.dialog.closeAll(); // 열려있는 다이얼로그 창 닫기
          this.loading = true;
          snackBar.dismiss(); // 열려있는 snackBar 창 닫기
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          let e: any = event;
          // Tab 구조 변화로 인한 초기화 삭제
          let url = e.url.split('/');
          this.url = e.url;
          if (url[1]) {
            this.isNoFrame = this.noFramePages.includes(url[1]); // 로그인 페이지
            this.isMainPage = url[1].includes('main'); // 메인 페이지
            this.isAdminPage = url[1].includes('admin'); // 관리자 페이지
            this.isSearchPage = ['data-catalog', 'glossary'].includes(url[1]); // 카탈로그 검색 페이지
            this.isSystemPage = ['system-check-info'].includes(url[1]); // 시스템 점검 페이지
          }
          // if (url[1].indexOf('main') === -1) { // Main 이 아닐때
          //   this.gotoTop();
          //   this.currentUrl = e.url.split('?')[0];
          //   this.setLayout(e.url.split('?')[0]);
          // } else { // Main Page
          //   this.menuTitle = '';
          //   this.menuSummary = '';
          //   this.menuIndex = -1;
          // }
          setTimeout(() => {
            // console.log('scrollTo');
            window.scrollTo(0, 0);
          }, 10);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  changeLang(d: any) {
    this.lang = d.key;
    this.storageService.setItem('APPS.LANG', d.key);
    this.translate.use(d.key);
  }

  removeTab(e: any, tab: any, i: number) {
    console.log(e, tab, i);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.routingTabs, event.previousIndex, event.currentIndex);
    if (event.previousIndex === this.activeNum) this.activeNum = event.currentIndex;
  }
}
