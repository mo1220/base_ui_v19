import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { menuType } from "../style-guide.models";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-key-filter',
  templateUrl: './KeyFilter.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideKeyFilterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  menus: Array<menuType> = [
    {
      title: '기본 Presets(사전설정)',
      desc: `KeyFilter는 <code>keyFilter</code> 속성으로 구성된 다양한 사전 설정을 제공합니다.`,
      anchor: 'presets',
    },
    {
      title: 'Regex(정규식)',
      desc: `사전 설정 외에도 사용자 정의를 위해 입력받지 않을 패턴을 정규식으로 구성할 수 있습니다.`,
      anchor: 'regex',
    }
  ];

  value: string | undefined;

  invalid = '';
  blockSpace: RegExp = /[^\s]/;
  blockChars: RegExp = /^[^<>*!]+$/;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
