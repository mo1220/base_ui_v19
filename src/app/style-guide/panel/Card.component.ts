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
  selector: 'style-guide-card',
  templateUrl: './Card.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideCardComponent implements AfterViewInit, OnDestroy {
  menus: menuType[] = [
    {
      title: 'Basic',
      desc: '기본 Card component',
      anchor: 'basic'
    },
    {
      title: 'Card with Button',
      desc: 'DP 장바구니에서 사용되는 Card component',
      anchor: 'button'
    },
    {
      title: 'Image Card',
      desc: '이미지가 포함된 Card component',
      anchor: 'image'
    },
    {
      title: 'Skeleton Loading',
      desc: 'Skeleton Loading Card component',
      anchor: 'loading'
    },
  ];

  loading: boolean = true;
  loadingContent = Array.from({ length: 5}, (d, i) => (i));
  basicItems = ['Item 1', 'Item 2'];
  basicItems1 = ['Item 1', 'Item 2'];
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];

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

  addCard(menuIdx: number) {
    // button card
    if(menuIdx === 1) this.basicItems1.push(`Item ${this.basicItems.length-1}`)
  }

  removeCard(menuIdx: number, idx: number) {
    // button card
    if(menuIdx === 1) this.basicItems1.splice(idx, 1);
  }
}
