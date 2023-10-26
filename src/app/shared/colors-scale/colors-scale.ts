import {
  Component,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  Input, ViewChild, ElementRef
} from '@angular/core';
import * as chroma from 'chroma-js';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'colors-scale',
  templateUrl: 'colors-scale.template.html',
  styleUrls: ['colors-scale.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorsScaleComponent implements OnInit {
  activeIndex = 0;
  _type: string;
  backgrounds = '';
  positions = [];
  valueType: any;
  @Input()
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value ? value : '';
  }
  _gradient: any;
  @Output() gradientChange: EventEmitter<string[]> = new EventEmitter();
  @Input() // colors: string[] = [];
  get gradient() {
    return this._gradient;
  }
  set gradient(value) {
    this._gradient = value ? typeof value[0] === 'string' ? value.map((d:any) => { return { color: d }}) : value : [];
    this.valueType = typeof value[0];
    this.getBackgrounds();
  }

  _stepped = false;
  @Input() // colors: string[] = [];
  get stepped() {
    return this._stepped;
  }
  set stepped(value) {
    this._stepped = value ? value : false;
    // this.gradientChange.emit(this._gradient);
  }
  @Output() steppedChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('colorBar') colorBar: ElementRef;
  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

  }

  /**
  * @function addCritical 컬러 추가
  * */
  addCritical() {
    const colors = _.map(this._gradient, d => d.color );
    const threshold = _.cloneDeep(this._gradient);
    const scale = chroma.scale(colors).mode('lch').colors(threshold.length + 1);
    const len = threshold.length;
    // 이전값의 Interval 계산하여 추가 이전색보다 어둡게
    this._gradient.push({
      value: threshold[len-1].value + (threshold[len-1].value - threshold[len-2].value),
      color: threshold ? chroma(scale[len]).darken().hex() : '#fff'
    });
    this.activeIndex = this._gradient.length - 1;
    this.nextForm();
  }

  /**
   * @function changeColor 컬러 변경
   * @param e: Color Picker Event
   * */
  changeColor(e: any) {
    this._gradient[this.activeIndex].color = e.color.hex;
    this.nextForm();
  }

  /**
   * @function colorReverse 컬러 순서 뒤집기
   * */
  colorReverse() {
    let colors = this._gradient.map((d: any) => d.color);
    colors = colors.reverse();
    _.forEach(colors, (v, k) => {
      this._gradient[k].color = v;
    });
    this.nextForm();
  }

  /**
   * @function addColor 컬러바를 클릭하였을때 추가 이벤트
   * @param e: Mouse Event
   * */
  addColor(e: any) {
    console.log(e);
    // const tx = e.layerX; // 클릭한 위치
    // const pw = this.colorBar.nativeElement.clientWidth; // 바 길이
    // const per = (tx / pw) * 100; // 위치 퍼센트
  }

  /**
   * @function nextForm 변경된 결과를 부모에게 넘기고 배경과 위치를 다시 계산
   * */
  nextForm() {
    this.steppedChange.emit(this._stepped);
    const val = this.valueType === 'string' ? this._gradient.map((d:any) => d.color) : this._gradient;
    this.gradientChange.emit(val);
    this.getBackgrounds();
  }

  /**
   * @function removeColor 컬러 삭제
   * @param i: Index
   * */
  removeColor(i: number) {
    if(i === this.activeIndex) this.activeIndex = i === 0 ? 0 : this.activeIndex - 1;
    this._gradient.splice(i, 1);
    this.nextForm();
  }

  /**
   * @function scaleBackground 컬러 바의 배경색 이전버전 2022-12-07
   * @param val: _gradient
   * */
  // scaleBackground(val) {
  //   const value = [];
  //   const vl = _.cloneDeep(val);
  //   if(this._type === 'threshold' && this._stepped) {
  //     const add = {
  //       ...vl[vl.length - 1],
  //       value: vl[vl.length - 1].value + (vl[vl.length - 1].value - vl[vl.length - 2].value)
  //     };
  //     vl.push(add);
  //   }
  //   const max = this._type === 'threshold' ? _.maxBy(vl, 'value').value : vl.length - 1;
  //   const min = this._type === 'threshold' ? _.minBy(vl, 'value').value : 0;
  //   _.forEach(vl, (v, k) => {
  //     const vv = this._type === 'threshold' ? v.value : k;
  //     const per = ((vv - min) * 100) / (max - min);
  //     if(this._type === 'threshold' && this._stepped && k > 0) {
  //       value.push(vl[k - 1].color + ' ' + per + '%');
  //       value.push(v.color + ' ' + per + '%');
  //     } else {
  //       value.push(v.color + ' ' + per + '%');
  //     }
  //   });
  //   return value.join(', ');
  // }

  /**
   * @function getBackgrounds
   * 컬러바의 배경색과 위치값을 한번에 변경
   * */
  getBackgrounds() {
    this.positions = [];
    const value: any = [];
    const vl = _.cloneDeep(this._gradient);
    if(this._type === 'threshold' && this._stepped) {
      const add = {
        ...vl[vl.length - 1],
        value: vl[vl.length - 1].value + (vl[vl.length - 1].value - vl[vl.length - 2].value)
      };
      vl.push(add);
    }
    // @ts-ignore
    const max = this._type === 'threshold' ? _.maxBy(vl, 'value').value : vl.length - 1;
    // @ts-ignore
    const min = this._type === 'threshold' ? _.minBy(vl, 'value').value : 0;
    _.forEach(vl, (v, k) => {
      const vv = this._type === 'threshold' ? v.value : k;
      const per = ((vv - min) * 100) / (max - min);
      // @ts-ignore
      this.positions.push(per);
      // @ts-ignore
      if(this._type === 'threshold' && this._stepped && k > 0) {
        // @ts-ignore
        value.push(vl[k - 1].color + ' ' + per + '%');
        value.push(v.color + ' ' + per + '%');
      } else {
        value.push(v.color + ' ' + per + '%');
      }
    });
    if(this._type === 'threshold' && this._stepped) this.positions.shift();
    this.backgrounds = value.join(', ');
  }

  /**
   * @function thresholdPosition 임계값 포지션 구하기 이전 버전 2022-12-07
   * @param val: Value 값
   * */
  // thresholdPosition(val) {
  //   const vl = _.cloneDeep(this._gradient);
  //   if(this._type === 'threshold' && this._stepped) {
  //     const add = {
  //       ...vl[vl.length - 1],
  //       value: vl[vl.length - 1].value + (vl[vl.length - 1].value - vl[vl.length - 2].value)
  //     };
  //     vl.push(add);
  //   }
  //   const max = _.maxBy(vl, 'value').value;
  //   const min = _.minBy(vl, 'value').value;
  //   const value = ((val - min) * 100) / (max - min);
  //   return value;
  // }

/*  setColorDialog() {
    const dialogRef = this.dialog.open(ColorDialog, {
      width: '450px',
      data: {
        currentColor: this._colors[this.active]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._colors[this.active] = result;
        this.changeColors.emit(this._colors);
        this.active = -1;
      }
    });
  }*/

/*  removeColor(i) {
    this.colors.splice(i, 1);
    this.toggle.splice(i, 1);
    this.changeColors.emit(this._colors);
  }*/
}
