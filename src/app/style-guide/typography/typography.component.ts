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
import { btnMenuType } from "../button/button.component";

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
  scrolling = false;
  activeNum = 0;
  buttonMenu: Array<btnMenuType> = [
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
  ) { }

  ngAfterViewInit(): void { }

  onAnchor(activeIdx: number){
    this.scrolling = true;
    this.activeNum = activeIdx;
    const targetY = this.anchors.get(activeIdx)?.nativeElement?.offsetTop;
    window.scrollTo({left: 0, top: targetY, behavior: 'smooth'});
  }

  contentScroll(scrollTop: number): void{
    if (!this.scrolling) {
      for(let i=0; i<this.buttonMenu.length-1; i++){
        const from = this.anchors.get(i)?.nativeElement.offsetTop - 50;
        const to = this.anchors.get(i+1)?.nativeElement.offsetTop - 50;
        if(scrollTop < to && scrollTop > from){
          this.activeNum = i;
          break;
        }
      }
    }
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onWindowScroll(event: any) {
    event.stopPropagation();
    this.contentScroll(window.scrollY);
  }
  @HostListener('window:scrollend', ['$event']) // for window scroll events
  onWindowScrollEnd(event: any) {
    event.stopPropagation();
    this.scrolling = false;
  }
  ngOnDestroy(): void { }
}
