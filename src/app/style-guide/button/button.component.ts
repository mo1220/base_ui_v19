import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

export interface btnMenuType {
  title: string;
  anchor: string;
  desc: string;
}

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-button',
  templateUrl: './button.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideButtonComponent implements AfterViewInit, OnDestroy {
  loading = false;
  checked = false;
  singleModel = 'No';
  radioModel = 'Left';
  radioActive = [1, 2, 3];
  activeRadio = 0;
  activeNum = 0;

  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  scrolling = false;

  buttonMenu: Array<btnMenuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
      desc: '컬러별 기본 버튼',
    },
    {
      title: 'Outline',
      anchor: 'outline',
      desc: '컬러별 라인 버튼',
    },
    {
      title: 'Size',
      anchor: 'size',
      desc: '사이즈별 버튼',
    },
    {
      title: 'Block',
      anchor: 'block',
      desc: 'Block 버튼',
    }
    ,{
      title: 'Disabled State',
      anchor: 'disabled',
      desc: '컬러별 disabled 버튼',
    },
    {
      title: 'Icon Label',
      anchor: 'iconLabel',
      desc: 'Icon Label 버튼',
    },
    {
      title: 'Icon Only',
      anchor: 'iconOnly',
      desc: 'Icon만 있는 버튼',
    },
    {
      title: 'Progress Button',
      anchor: 'progress',
      desc: '전송 중 버튼',
    },
    {
      title: 'Toggle Button',
      anchor: 'toggle',
      desc: '토글 버튼',
    },
    {
      title: 'Radio Buttons',
      anchor: 'radio',
      desc: '라디오 형태 버튼',
    }
  ]

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

  onClick() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000)
  }

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
}
