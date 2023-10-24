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
import {menuType} from "../style-guide.models";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-typography',
  templateUrl: './typography.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideTypographyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  typoMenu: Array<menuType> = [
    {
      title: '제목 스타일',
      anchor: 'titleStyle',
      desc: '제목 스타일',
    },
    {
      title: '설명 스타일',
      anchor: 'descStyle',
      desc: '설명/리스트 스타일 가이드',
    },
    {
      title: '가이드 스타일',
      anchor: 'guideStyle',
      desc: '기능 가이드/알림 스타일 설명'
    },
    {
      title: '알림 스타일',
      anchor: 'alramStyle',
      desc: '알림 스타일 설명'
    }
  ]
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
