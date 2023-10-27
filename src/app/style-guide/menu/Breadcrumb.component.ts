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
import {BREADCRUMB_SAMPLE} from "../style-guide.models";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-breadcrumb',
  templateUrl: './Breadcrumb.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideBreadcrumbComponent implements AfterViewInit, OnDestroy {

  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;

  buttonMenu: any = [
    {
      title: '기본',
      anchor: 'basicBreadCrumb',
      desc: '이동 경로는 페이지 계층 구조에 대한 상황별 정보를 제공합니다.',
    }
  ];
  breadcrumb: any = [ ...BREADCRUMB_SAMPLE ];
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
