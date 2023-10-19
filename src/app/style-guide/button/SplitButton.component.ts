import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy, QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {NotificationService} from "../../core/notifications/notification.service";

export interface splitBtnMenuType {
  title: string;
  anchor?: string;
  desc: string;
  id :string;
}

/**
 * @class StyleGuideSplitButtonComponent *
 * */
@Component({
  selector: 'style-guide-split-button',
  templateUrl: './SplitButton.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSplitButtonComponent implements AfterViewInit, OnDestroy {
  // MenuS
  splitMenu: Array<splitBtnMenuType> = [
    {
      id: 'basic',
      title: 'Basic',
      desc: '기본 split 버튼'
    },
    {
      id: 'position',
      title: 'Position',
      desc: '위치별 split 버튼'
    },
    {
      id: 'colorType',
      title: 'Color Type',
      desc: '컬러별 split 버튼'
    },
    {
      id: 'colorOutlineType',
      title: 'Color Outline Type',
      desc: '컬러별 라인 split 버튼'
    },
    {
      id: 'size',
      title: 'Size',
      desc: '사이즈별 split 버튼'
    },
    {
      id: 'disable',
      title: 'Disabled State',
      desc: 'disable 상태 split 버튼'
    }
  ];

  scrolling: boolean = false;
  activeNum = 0;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private notifiService: NotificationService
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

  onClick(msg?: string){
    let message = msg ? `Button ${msg} Click!!` : 'DropDown Menu3 Click!';
    this.notifiService.default(message);
  }

  onAnchor(activeIdx: number){
    this.scrolling = true;
    this.activeNum = activeIdx;
    const targetY = this.anchors.get(activeIdx)?.nativeElement?.offsetTop;
    window.scrollTo({left: 0, top: targetY, behavior: 'smooth'});
  }

  contentScroll(scrollTop: number): void{
    if (!this.scrolling) {
      for(let i=0; i<this.splitMenu.length-1; i++){
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
}
