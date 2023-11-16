import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import {ChangeContext, Options} from 'ngx-slider-v2';
import * as moment from "moment/moment";
import * as numeral from "numeral";

@Component({
  selector: 'dtk-mat-slider',
  templateUrl: './dtk-mat-slider.template.html',
  styleUrls: ['./dtk-mat-slider.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DtkMatSliderComponent implements OnInit, AfterViewInit, OnDestroy {

  options: Options = {}; // 슬라이더 옵션
  unsubscribe$: Subject<void> = new Subject<void>();
  @Input() labelClass: string = '';
  @Input() format: any;
  _mode = 'less'; // 'less' || 'greater' || 'range'
  @Input()
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value ? value : 'less';
  }

  @Input() label = 'name';
  @Input() unit = '';

  _step = 1;
  @Input()
  get step() {
    return this._step;
  }
  set step(value) {
    this._step = value ? value : 1;
  }

  _min = 0;
  @Input()
  get min() {
    return this._min;
  }
  set min(value) {
    // TODO 다룬곳에서 받아오는지 확인 필요
    // this._min = value ? this._min < value ? this._min : value : 0;
    this._min = value ? value: 0;
  }

  _max = 0;
  @Input()
  get max() {
    return this._max;
  }
  set max(value) {
    // TODO 다른곳에서 받아오는지 확인 필요
    // this._max = value ? this._max < value ? value : this._max : 1;
    this._max = value ? value : 1;
  }

  _value = 0;
  @Input()
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value ? value : 0;
    setTimeout(() => {
      // 최소 보다 작을때 옵션 변경
      if(this._min > value) this._min = value;
      // 시작값이 최대보다 컸을때
      if(this._max < value) this._max = value;
    }, 1);
  }
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  _highValue = 1;
  @Input()
  get highValue() {
    return this._highValue;
  }
  set highValue(value) {
    this._highValue = value ? value : 1;
  }

  @Output() highValueChange: EventEmitter<number> = new EventEmitter<number>();
  _disabled = false;
  @Input()
  get disabled(){
    return this._disabled;
  }
  set disabled(value){
    this._disabled = value ? value : false;
    this.options = {
      ...this.options,
      readOnly: this._disabled,
    }
  }

  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  checkNumber(e: any, key?: string) {
    const vm: any = this;
    // Enter
    if(e.key === 'Enter') { // 한글 기타 문자열
      const txt = e.target.innerText;
      // this.input$.next({txt: txt, key: key });
      this.changeValue(e, key)
    }
    // 한글
    if(e.key === 'Process') { // 한글 기타 문자열
      const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      // @ts-ignore
      vm[key] = e.target.innerText.replace(koreanExp, '');
      e.preventDefault();
    }
    // 허용키
    const keys = ['End', 'Home', 'ArrowUp','ArrowDown','ArrowLeft','ArrowRight', 'Backspace', 'Delete', '-'];
    if(keys.indexOf(e.key) === -1) {
      if (e.key !== '.' && isNaN(e.key)) {
        // e.stopPropagation();
        e.preventDefault();
        return;
      } else {
        const txt = e.target.innerText;
        if(e.key === '.' && txt.indexOf('.') > -1) {
          e.preventDefault();
          return;
        }
      }
    }
  }

  changeValue(e: any, key?: string) {
    const vm: any = this;
    const txt = e.target.innerText;
    const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g; // 한글 정규식
    const txt2 = txt.replace(koreanExp, ''); // 한글 제외
    const value = Number(txt2); // 숫자로 변환
    const last = txt2.charAt(txt2.length - 1); //
    if(txt2.indexOf('.') > -1) {
      const txtArr = txt2.split('.');
      const tx = txtArr[1].replace(/[0-9]/g, '0');
      const step = Number('0.' + tx.replace(/0$/, '1'));
      this.options = {
        ...this.options,
        step: step
      };
    }
    // 최소 보다 작을때 옵션 변경
    if(this._min > value) this._min = value;
    // 시작값이 최대보다 컸을때
    if(this._max < value) this._max = value;

    if(['.', '-'].indexOf(last) === -1) {
      // @ts-ignore
      vm[key] = value;
      vm[key + 'Change'].emit(vm['_' + key]);
    }
  }

  valueChanged() {
    this.valueChange.emit(this._value);
  }

  highValueChanged() {
    this.highValueChange.emit(this._highValue);
  }

  formatLabel(value: number): string {
    return this.format ? numeral(value).format(this.format) : value + '';
  }

  ngOnDestroy() {

  }

  onUserChangeEnd(e: ChangeContext) {
    const { value, highValue, pointerType } = e;
    pointerType === 0 ? this.valueChange.emit(value) : this.highValueChange.emit(highValue);
  }
}
