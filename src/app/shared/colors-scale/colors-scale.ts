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
import * as d3 from 'd3';
import { MatDialog } from '@angular/material/dialog';

export interface colorScaleType {
  value: number; // 값
  color:string; // Color Hex 값
  percent:number; // 위치 Percent는 Scale Bar에서 필요함
  left: number; // 위치값
}
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
  positions: Array<colorScaleType> = [];
  valueType: any;
  min:number = 0;
  max:number = 100;
  loaded: boolean = false;
  isInteger: boolean = true; // 정수인지 실수인지 체크
  isOpen: number = -1;

  toggleDetail: boolean = false;
  @Input()
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value ? value : '';
  }
  _gradient: any = [];
  scale: any = d3.scaleLinear(); // 그라이언트 위치 값 Scale
  colorScale: any = d3.scaleLinear(); // 그라이언트 컬러값 Scale
  @Output() gradientChange: EventEmitter<string[]> = new EventEmitter();
  @Input() // colors: string[] = [];
  get gradient() {
    return this._gradient;
  }
  set gradient(value) {
    if(value && value.length > 0) {
      this.valueType = typeof value[0];
      // 최소 최대값만 확인하여 정수와 실수 구분
      this.isInteger = value[0] % 1 === 0 && value[value.length - 1] % 1 === 0;
      this._gradient = this.valueType === 'string' ? value.map((d:any) => { return { color: d }}) : value;
      // 값 배열에 넣고 최소/최대값 구한다.
      this.getMinMax();
    }
  }

  getMinMax() {
    // 타입이 없으면 구해 올때까지
    if(!this._type || this._type === '') {
      setTimeout(() => {
        this.getMinMax();
      }, 1);
      return;
    }
    if(this._type === 'threshold' && this._stepped) {
      const add = {
        ...this._gradient[this._gradient.length - 1],
        value: this._gradient[this._gradient.length - 1].value + (this._gradient[this._gradient.length - 1].value - this._gradient[this._gradient.length - 2].value)
      };
      this._gradient.push(add);
    }
    console.log(this._gradient);
    // @ts-ignore
    this.max = this._type === 'threshold' ? _.maxBy(this._gradient, 'value').value : this._gradient.length - 1;
    // @ts-ignore
    this.min = this._type === 'threshold' ? _.minBy(this._gradient, 'value').value : 0;
    this.scale.domain([this.min, this.max]);
    this.colorScale.domain(this._gradient.map((d:any) => d.value));
    this.colorScale.range(this._gradient.map((d:any) => d.color));
    // 최소/최대값 구하고 그라디언트 정의.
    this.setPosition();
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
  elementWidth: number = 0;
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
    const left = e.offsetX + 8; // 클릭한 위치
    const pw = this.elementWidth; // 바 길이
    const percent = (left / pw) * 100; // 위치 퍼센트
    const value = Math.round(this.scale.invert(left)); // 값
    const color = this.colorScale(value); // 값 기준 컬러
    const positions = _.cloneDeep(this.positions);
    const val = { value, percent, left, color };
    positions.push(val);
    this.positions = _.sortBy(positions, 'value');
    this.setBackgrounds();
  }

  toggleOpen(i:number) {
    this.activeIndex = this.activeIndex === i ? -1 : i;
    this.isOpen = this.isOpen === i ? -1 : this.toggleDetail ? -1 : i;
  }

  /**
   * @function nextForm 변경된 결과를 부모에게 넘기고 배경과 위치를 다시 계산
   * */
  nextForm() {
    this.steppedChange.emit(this._stepped);
    const val = this.valueType === 'string' ? this._gradient.map((d:any) => d.color) : this._gradient;
    this.gradientChange.emit(val);
    this.setBackgrounds();
  }

  /**
   * @function removeColor 컬러 삭제
   * @param i: Index
   * */
  removeColor(i: number) {
    if(i === this.activeIndex) this.activeIndex = i === 0 ? 0 : this.activeIndex - 1;
    this._gradient.splice(i, 1);
    this.positions.splice(i, 1);
    this.getMinMax();
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
  setPosition() {
    if(this.elementWidth == 0) {
      setTimeout(() => {
        this.setPosition();
      }, 10);
      return;
    }
    this.positions = [];
    const vl = _.cloneDeep(this._gradient);
    this.positions = _.map(this._gradient, (d:any, i:number) => {
      const { color } = d;
      const value = this._type === 'threshold' ? d.value : i;
      const percent = ((value - this.min) * 100) / (this.max - this.min);
      const val = {
        color, percent, value,
        left: (this.elementWidth * (percent / 100)) + 8
      }
      return { ...val }
    });
    this.setBackgrounds();
  }

  setBackgrounds() {
    const pos = _.sortBy(this.positions, 'value');
    const backgrounds: any = _.map(pos, (d:any, i:number) => {
      let val = '';
      if(this._type === 'threshold' && this._stepped && i > 0) {
        val = this.positions[i - 1].color + ' ' + d.percent + '%';
        val = d.color + ' ' + d.percent + '%';
      } else {
        val = d.color + ' ' + d.percent + '%';
      }
      return val;
    });
    if(this._type === 'threshold' && this._stepped) this.positions.shift();
    this.backgrounds = backgrounds.join(', ');
    this.loaded = true;
  }

  mouseEntered = false;
  lineX = 0;
  mouseMove(e:any) {
    // console.log(e.offsetX);
    this.lineX = e.offsetX + 8;
  }
  mouseEnter(e:any) {
    this.mouseEntered = true;
  }

  mouseLeave(e:any) {
    this.mouseEntered = false;
  }

  checkNumber(e:any) {
    // Enter
    if(e.key === 'Enter') { // 한글 기타 문자열
      const txt = e.target.innerText;
      // this.changeValue(e);
    }
    // 한글
    if(e.key === 'Process') { // 한글 기타 문자열
      const koreanExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      // this[key] = e.target.innerText.replace(koreanExp, '');
      e.preventDefault();
    }
    // 허용키
    const keys = ['End', 'Home', 'ArrowUp','ArrowDown','ArrowLeft','ArrowRight', 'Backspace', 'Delete', '-'];
    if(keys.indexOf(e.key) === -1) {
      if (e.key !== '.' && isNaN(e.key)) {
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

  dragEnded(e:any, i:number) {
    console.log(e);
    // 8은 Margin 값
    const x = e.event.layerX;
    const per = (x / this.elementWidth) * 100;
    if(this._type === 'threshold') {

    } else {
      this._gradient[i].value = Math.round(per > 100 ? 100 : per);
    }
    console.log(this._type);
    this.setBackgrounds();
  }

  dragMoved(e:any, i:number) {
    // 8은 Margin 값
    const { layerX } = e.event;
    // layerX가 0보다 작을땐 0, ElementWidth 보다 클땐 ElementWidth
    const x = layerX < 0 ? 0 : layerX > this.elementWidth ? this.elementWidth : layerX;
    console.log(x, this.scale.invert(x), this.scale(x));
    this.positions[i].value = Math.round(this.scale.invert(x));
    this.positions[i].left = x;
    this.positions[i].percent = (x / this.elementWidth) * 100;
    this.setBackgrounds();
    // console.log('Drag Moved Offset', x < 0 ? 0 : x);
    // console.log('Drag Moved Offset', e.source.element.nativeElement.offsetLeft + 8);
  }

  onResized(e: any) {
    this.elementWidth = e.newWidth ? e.newWidth - 16 : this.elementWidth;
    this.scale.range([0, this.elementWidth]);
    this.setPosition();
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
