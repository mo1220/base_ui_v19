import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {MENU} from "../../shared/menu.arr";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-lnb',
  templateUrl: './lnb.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideLnbComponent implements AfterViewInit, OnDestroy {
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
  constructor(
    private translate: TranslateService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
