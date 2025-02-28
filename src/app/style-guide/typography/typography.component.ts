import {
  AfterViewInit, ChangeDetectorRef,
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
    },
    {
      title: 'Text Or Background Color',
      anchor: 'textColor',
      desc: '텍스트나 백그라운드 컬러 스타일'
    }
  ];

  colorsPalette: string[] = [
    'blue',
    'indigo',
    'purple',
    'pink',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'cyan',
    'white',
    'gray',
    'gray-dark',
    'gray-light',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark'
  ];
  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
