import {
  AfterViewInit, ChangeDetectorRef,
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
import {menuType} from "../style-guide.models";

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
  buttonMenu: Array<menuType> = [
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
    },
    {
      title: 'Close Buttons',
      anchor: 'closeButtons',
      desc: 'Bootstrap 기본 닫기 버튼 <code>class="btn-close"</code>',
    }
  ]

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }

  onClick() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000)
  }

}
