import { Component, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { setTheme } from 'ngx-bootstrap/utils';
import { MENU } from '../shared/menu.arr';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import {
  ActivationEnd,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { environment as env } from '../../environments/environment';
import { AppState } from '../core/core.state';
import { Store } from '@ngrx/store';
import { selectSettings } from '../core/settings/settings.selectors';
import { SettingActions } from '../core/settings/settings.actions';
import { Language, SettingsState } from '../core/settings/settings.model';

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

  settings: SettingsState;

  lang: Language = 'kr';
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
  isNoFrame = true;
  isMainPage = false;
  isSearchPage = false;
  isAdminPage = false;
  isSystemPage = false; // 시스템 점검
  isActivationPath: boolean | undefined; // 404페이지 구분 용

  isFirst: boolean = true; // 처음 로딩시
  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    setTheme('bs5');
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof ActivationEnd: {
          // @ts-ignore
          this.isActivationPath = event.snapshot.routeConfig.path === '**';
          break;
        }
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
            this.isNoFrame = this.isActivationPath ? this.isActivationPath : this.noFramePages.includes(url[1]); // 상하단 프레인이 없는 페이지
            this.isMainPage = url[1].includes('main'); // 메인 페이지
            this.isAdminPage = url[1].includes('admin'); // 관리자 페이지
            this.isSearchPage = ['data-catalog', 'glossary'].includes(url[1]); // 카탈로그 검색 페이지
            this.isSystemPage = ['system-check-info'].includes(url[1]); // 시스템 점검 페이지
          }
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 10);
          break;
        }
        default: {
          break;
        }
      }
    });

    this.store.select(selectSettings)
      .pipe()
      .subscribe(res => {
        this.settings = { ...res };
        // 처음 언어 셋팅
        if(this.isFirst) {
          if(this.lang != this.settings.language) {
            this.lang = this.settings.language;
            translate.setDefaultLang(this.lang); // kr 먼저 추가 시켜준다.
            this.store.dispatch(SettingActions.language({ language: this.lang }));
            this.translate.use(this.lang);
            this.isFirst = false;
          }
        }
      });
  }

  changeLang(d: any) {
    this.lang = d.key;
    this.translate.use(d.key);
    this.store.dispatch(SettingActions.language({ language: d.key }))
  }

  removeTab(e: any, tab: any, i: number) {
    console.log(e, tab, i);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.routingTabs, event.previousIndex, event.currentIndex);
    if (event.previousIndex === this.activeNum) this.activeNum = event.currentIndex;
  }
}
