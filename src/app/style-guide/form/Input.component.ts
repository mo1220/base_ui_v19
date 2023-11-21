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
import {menuType} from "../style-guide.models";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-input',
  templateUrl: './Input.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideInputComponent implements AfterViewInit, OnDestroy {

  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  inputMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Size',
      anchor: 'size',
    },
    {
      title: 'Clearable',
      anchor: 'clear',
    },
    {
      title: 'Icon',
      anchor: 'icon',
    },
    {
      title: 'Validation',
      anchor: 'validation',
    },
    {
      title: 'Group',
      anchor: 'group',
    }
  ]

  keyword:string = '';
  valid:string = '';
  invalid:string = '';
  clearable:Array<string> = ['xsmall','small','default','large'];
  submitMsg:string = '';

  sizeList = [ // 사이즈별 반복용
    {
      label: 'Xsmall',
      class: 'form-control-xs',
      buttonClass: 'btn-xs'
    },
    {
      label: 'Small',
      class: 'form-control-sm',
      buttonClass: 'btn-sm'
    },
    {
      label: 'Base',
      class: '',
      buttonClass: ''
    },
    {
      label: 'Large',
      class: 'form-control-lg',
      buttonClass: 'btn-lg'
    },
  ]

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  submit(value:string): void {
    if(value === '') {
      this.submitMsg = '키워드를 입력해주세요';
    }
  }

  ngOnDestroy(): void { }
}
