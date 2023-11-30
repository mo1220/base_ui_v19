import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { menuType } from "../style-guide.models";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-input-number',
  templateUrl: './inputNumber.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideInputNumberComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;
  menus: Array<menuType> = [
    {
      title: 'Numeral',
      desc: `InputNumber는 <code>[(ngModel)]</code> 속성을 사용하여 제어된 입력으로 사용됩니다.`,
      anchor: 'numeral',
    },
    {
      title: 'Locale',
      desc: `그룹화 및 소수 기호와 같은 지역화 정보는 사용자 로케일을 기본값으로 하는 <code>[locale]</code> 속성을 사용하여 정의됩니다.`,
      anchor: 'locale',
    },
    {
      title: 'Currency',
      desc: `통화 형식은 통화 및 통화 속성에 대한 <code>[mode]</code> 옵션을 설정하여 지정됩니다. 또한 <code>[currency]</code> 표시 옵션을 사용하면 <code>[currencyDisplay]</code> 통화가 표시 되는 방식을 사용할 수 있으며 유효한 값은 "symbol"(기본값) 또는 "code"입니다.`,
      anchor: 'currency',
    },
    {
      title: 'Prefix & Suffix',
      desc: `사용자 정의 텍스트(예: 단위는 <code>prefix</code> 및 <code>suffix</code> 속성을 사용하여 입력 섹션 앞이나 뒤에 배치할 수 있습니다.`,
      anchor: 'prefixSuffix',
    },
    {
      title: 'Buttons',
      desc: `스피너 버튼은 <code>[showButtons]</code> 옵션을 사용하여 활성화되며 레이아웃은 버튼 레이아웃으로 정의됩니다. 기본값은 "스택"이고 "수평"과 "스택"은 대안입니다. 버튼이 없더라도 위쪽 및 아래쪽 화살표 키를 사용하여 키보드로 값을 회전할 수 있습니다.`,
      anchor: 'buttons',
    },
    {
      title: 'Vertical',
      desc: `버튼 레이아웃<code>[buttonLayout]="'vertical'"</code>을 수직으로 설정하여 버튼을 수직으로 배치할 수도 있습니다.`,
      anchor: 'vertical',
    },
    {
      title: 'Invalid',
      desc: `실패한 유효성 검사를 나타내기 위해 <code>[styleClass]="'is-invalid'"</code> 클래스를 사용하여 잘못된 상태 스타일이 추가됩니다.`,
      anchor: 'invalid',
    },
    {
      title: 'Disabled & ReadOnly',
      desc: `비활성화된 경우 요소를 편집하고 집중할 수 없습니다. <code>[disabled]="boolean" [readonly]="boolean"</code>`,
      anchor: 'disabled',
    }
  ];

  basic = {
    value1: 42723,
    value2: 58151,
    value3: 2351.35,
    value4: 50
  }

  locale = {
    value1: 151351,
    value2: 115744,
    value3: 635524,
    value4: 732762
  }

  currency = {
    value1: 1500,
    value2: 2500,
    value3: 4250,
    value4: 5002
  }

  prefixSuffix = {
    value1: 20,
    value2: 50,
    value3: 10,
    value4: 20
  }

  buttons = {
    value1: 20,
    value2: 10.5,
    value3: 25
  }
  value = 20;
  invalid = '';
  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  changeRadioSizeValue(e: any) {
    console.log(e);
  }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  changeValue(e: any) {
    this.invalid = e !== null ? 'invalid' : '';
  }

  ngOnDestroy(): void { }
}
