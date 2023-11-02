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
  selector: 'style-guide-accordion',
  templateUrl: './Accordion.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideAccordionComponent implements AfterViewInit, OnDestroy {
  menus: menuType[] = [
    {
      title: 'Basic',
      desc: '기본 Accordion component',
      anchor: 'basic'
    },
    {
      title: 'Skeleton Loading',
      desc: 'Skeleton Loading Accordion component',
      anchor: 'loading'
    },
  ];

  loading: boolean = true;
  loadingContent = Array.from({ length: 5}, (d, i) => (i));
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

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
