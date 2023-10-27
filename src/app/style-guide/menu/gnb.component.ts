import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, OnInit, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import {MENU} from "../../shared/menu.arr";
import {LocalStorageService} from "../../core/local-storage/local-storage.service";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-gnb',
  templateUrl: './gnb.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideGnbComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;

  buttonMenu: any = [
    {
      title: '기본',
      anchor: 'basicGnb',
      desc: '여러단계 레벨을 제공합니다.',
    }
  ];
  menus: any = [ ...MENU ];
  lang = 'kr';
  rippleColor = 'rgba(0,123,255,0.05)';
  loaded = false;
  constructor(
    private storageService: LocalStorageService,
    private translate: TranslateService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.lang = storageService.getItem('APPS.LANG') ? storageService.getItem('APPS.LANG') : 'kr';
    storageService.setItem('APPS.LANG', this.lang);
    translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }


  ngAfterViewInit(): void {
    this.loaded = true;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
