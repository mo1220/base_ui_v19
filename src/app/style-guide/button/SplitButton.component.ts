import {
  AfterViewInit, ChangeDetectorRef,
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
import {menuType} from "../style-guide.models";


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
  colors = [
    {
      color: 'primary',
      label: 'Primary'
    },
    {
      color: 'secondary',
      label: 'Secondary'
    },
    {
      color: 'success',
      label: 'Success'
    },
    {
      color: 'info',
      label: 'Info'
    },
    {
      color: 'danger',
      label: 'Danger'
    },
    {
      color: 'light',
      label: 'Light'
    },
    {
      color: 'dark',
      label: 'Dark'
    }
  ]
  splitMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
      desc: '기본 split 버튼 <br/>' +
        '<span class="msg info">화살표 버튼 클릭 참고 : 아이콘 버튼 cursor default 주기 위해 <b>label.btn.btn-split > span</b></span>'
    },
    {
      title: 'Position',
      anchor: 'position',
      desc: '위치별 split 버튼 <br/>' +
        '<span class="msg info"><b>yPosition</b>에 above, below 입력 <b>xPosition</b>에 before, after 입력</span>'
    },
    {
      title: 'Color Type',
      anchor: 'colorType',
      desc: '컬러별 split 버튼'
    },
    {
      title: 'Color Outline Type',
      anchor: 'colorOutlineType',
      desc: '컬러별 라인 split 버튼'
    },
    {
      title: 'Divider',
      anchor: 'divider',
      desc: '아이콘 버튼에 구분선 추가'
    },
    {
      title: 'Size',
      anchor: 'size',
      desc: '사이즈별 split 버튼'
    },
    {
      title: 'Rounded',
      anchor: 'rounded',
      desc: '라운드  split 버튼'
    },
    {
      title: 'Disabled State',
      anchor: 'disable',
      desc: 'disable 상태 split 버튼'
    },
  ];

  scrolling: boolean = false;
  activeNum = 0;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private notifiService: NotificationService
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }

  onClick(msg?: string){
    let message = msg ? `Button ${msg} Click!!` : 'DropDown Menu3 Click!';
    this.notifiService.default(message);
  }

  // onAnchor(activeIdx: number){
  //   this.scrolling = true;
  //   this.activeNum = activeIdx;
  //   const targetY = this.anchors.get(activeIdx)?.nativeElement?.offsetTop;
  //   window.scrollTo({left: 0, top: targetY, behavior: 'smooth'});
  // }
  //
  // contentScroll(scrollTop: number): void{
  //   if (!this.scrolling) {
  //     for(let i=0; i<this.splitMenu.length-1; i++){
  //       const from = this.anchors.get(i)?.nativeElement.offsetTop - 50;
  //       const to = this.anchors.get(i+1)?.nativeElement.offsetTop - 50;
  //       if(scrollTop < to && scrollTop > from){
  //         this.activeNum = i;
  //         break;
  //       }
  //     }
  //   }
  // }
  //
  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onWindowScroll(event: any) {
  //   event.stopPropagation();
  //   this.contentScroll(window.scrollY);
  // }
  // @HostListener('window:scrollend', ['$event']) // for window scroll events
  // onWindowScrollEnd(event: any) {
  //   event.stopPropagation();
  //   this.scrolling = false;
  // }
}
