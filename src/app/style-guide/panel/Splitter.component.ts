import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  OnDestroy,
  QueryList,
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
  selector: 'style-guide-splitter',
  templateUrl: './Splitter.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSplitterComponent implements AfterViewInit, OnDestroy {
  menus: menuType[] = [
    {
      title: '좌우 분리',
      desc: `우측 핸들은 <code>[rzHandles]="'e'"</code>, 좌측 핸들은 <code>[rzHandles]="'w'"</code><br /> 좌측 핸들시 스타일은 <code>left: 0;</code> 으로 처리해야 오류가 안생김`,
      anchor: 'leftRight'
    },
    {
      title: '상하 분리',
      desc: `하단 핸들은 <code>[rzHandles]="'s'"</code>, 상단 핸들은 <code>[rzHandles]="'n'"</code>`,
      anchor: 'topBottom'
    },
    {
      title: 'Layout 샘플',
      desc: `레이아웃 샘플 코드`,
      anchor: 'layout'
    }
  ];

  loading: boolean = true;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;
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
