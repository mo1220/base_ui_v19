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
import {menuType} from "../style-guide.models";
import {CheckList} from "./Checkbox.component";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-input-mask',
  templateUrl: './InputMask.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideInputMaskComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;
  menus: Array<menuType> = [
    {
      title: 'Basic',
      desc: `Input-Mask는 <code>ngModel</code> 속성과 함께 제어된 입력으로 사용됩니다.`,
      anchor: 'basic',
    },
    {
      title: 'Size',
      desc: `Input-Mask 크기는 <code>[size]="'xs' | 'sm' | 'lg'"</code> 속성과 함께 제어된 입력으로 사용됩니다.`,
      anchor: 'size',
    },
    {
      title: 'Mask',
      desc: `마스크 형식<code>[mask]</code>은 다음 정의의 조합일 수 있습니다. <code>a</code>는 알파벳, <code>9</code>는 숫자, <code>*</code>는 영숫자입니다. 또한 <code>(</code> , <code>)</code> , <code>-</code> 등의 서식 지정 문자도 허용됩니다.`,
      anchor: 'mask',
    },
    {
      title: 'Slot Char',
      desc: `마스크의 기본 자리 표시자는 밑줄이며, <code>[slotChar]</code> 속성을 사용하여 사용자 정의할 수 있습니다.`,
      anchor: 'slotChar',
    },
    {
      title: 'Optional',
      desc: `입력이 마스크 정의를 완료하지 않으면 기본적으로 지워집니다. 이 동작을 제어하려면 <code>[autoClear]</code> 속성을 사용하십시오. 게다가, <code>?</code> 물음표 뒤의 항목을 선택 사항으로 표시하는 데 사용됩니다.`,
      anchor: 'optional',
    },
    {
      title: 'Disabled & ReadOnly',
      desc: `비활성화된 경우 요소를 편집하고 집중할 수 없습니다.`,
      anchor: 'disabled',
    },
    {
      title: 'Invalid',
      desc: `실패한 유효성 검사를 나타내기 위해 <code>[styleClass]="'is-invalid'"</code> 클래스를 사용하여 잘못된 상태 스타일이 추가됩니다.`,
      anchor: 'invalid',
    },
  ];

  value: string | undefined;
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;

  invalid = '';

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  changeValue(e: any) {
    console.log(e);
    this.invalid = e !== '' ? 'invalid' : '';
  }
  ngOnDestroy(): void { }
}
