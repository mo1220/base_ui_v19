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

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-contextmenu',
  templateUrl: './ContextMenu.template.html',
  styleUrls: ['./ContextMenu.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideContextMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;

  buttonMenu: any = [
    {
      title: '기본',
      anchor: 'basicContextMenu',
      desc: '중첩된 상황에 맞는 메뉴.',
    }
  ];
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
