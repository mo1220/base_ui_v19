import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {default_colors} from '../../core/settings/settings.model';
import * as _ from 'lodash';
import {select, Store} from '@ngrx/store';
import {filter, first, map} from 'rxjs/operators';
import {AppState} from '../../core/core.state';

@Component({
  selector: 'letter-avatar',
  templateUrl: './letter-avatar.template.html',
  styleUrls: ['./letter-avatar.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LetterAvatarComponent implements OnInit, AfterViewInit, OnDestroy {
  length:number = 0;
  title:string = '';
  _title:string = '';
  color:any;
  index:number;
  list:Array<any>;

  @Input()
  get name() {
    return this.title;
  };
  set name(value) {
    var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크

    if(check_kor.test(value)) {
      this.title = value? value : '';
    }else {
      this.title = value? value.toUpperCase() : '';
    }
    this._title = _.clone(this.title);

    if(value && value.length >= this.txLength) this._title = value.slice(0,this.txLength);
    // if(this._title.length === 4) {
    //   this._title = value.slice(0, 2) + '<br/>' + value.slice(2, 4);
    // }

    this.length = value? value.length : 0;
  }

  txLength:number = 1;
  @Input()
  get textLength() {
    return this.txLength;
  };
  set textLength(value) {
    this.txLength = value;
    if(value && this.title.length >= value) this._title = this.title.slice(0,value);
  }
  @Input() size:number;
  @Input() radius: number;
  @Input() idx:number;
  @Input() class: string;

  constructor(
    public store: Store<AppState>
  ) {

  }

  ngOnInit(): void {

    // const colorGet = d3.scaleOrdinal()
    //   .domain(alphabet)
    //   .range([])
    // this.color = colorGet(this.title.slice(0,1));
    const colors = [
      'blue',
      'indigo',
      'purple',
      'pink',
      'red',
      'yellow',
      'green',
      'teal',
      'cyan',
      // 'pastel-magenta',
      // 'coral-dust',
      // 'yucatan',
      // 'baby-frog',
      // 'be-spontaneous',
      // 'spring-bouquet',
      // 'jade-mountain',
      // 'dark-turquoise',
      // 'malibu',
      // 'sail-to-sea',
      // 'light-wisteria',
      // 'candy-floss'
    ]
    // if(this.index > colors.length-1) this.index = this.index % colors.length;
    this.color = colors[this.idx%9];
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }


}
