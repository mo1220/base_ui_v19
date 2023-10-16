import { Component, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { setTheme } from 'ngx-bootstrap/utils';
import {MENU} from "../shared/menu.arr";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "../core/local-storage/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

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
  constructor(
    private storageService: LocalStorageService,
    private translate: TranslateService
  ) {
    setTheme('bs5');
    translate.setDefaultLang('kr'); // kr 먼저 추가 시켜준다.

    this.lang = storageService.getItem('APPS.LANG') ? storageService.getItem('APPS.LANG') : 'kr';
    storageService.setItem('APPS.LANG', this.lang);
    translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
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
