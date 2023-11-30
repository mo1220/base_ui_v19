import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from "@angular/core";
import {BsLocaleService, DatepickerDateTooltipText} from "ngx-bootstrap/datepicker";
import {defineLocale, enGbLocale, zhCnLocale} from 'ngx-bootstrap/chronos';
import { koLocale } from 'ngx-bootstrap/locale';
import * as moment from 'moment';

defineLocale('kr', koLocale);
defineLocale('en', enGbLocale);
defineLocale('cn', zhCnLocale);

interface IRange {
  value: Date[];
  label: string;
}

const RANGES_INIT: IRange[] = [
  {
    value: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date()],
    label: '최근 1일'
  }, {
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: '최근 일주일'
  }, {
    value: [new Date(new Date().setDate(new Date().getMonth() - 1)), new Date()],
    label: '최근 1개월'
  }, {
    value: [new Date(new Date().setDate(new Date().getMonth() - 3)), new Date()],
    label: '최근 3개월'
  }, {
    value: [new Date(new Date().setDate(new Date().getMonth() - 6)), new Date()],
    label: '최근 6개월'
  }, {
    value: [new Date(new Date().setDate(new Date().getMonth() - 12)), new Date()],
    label: '최근 1년'
  }
];
@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.template.html',
  styleUrls: ['../date-picker/date-picker.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateRangePickerComponent implements OnInit {
  open: boolean = false;
  today: Date = new Date();
  yesterday: Date =  new Date(new Date().setDate(new Date().getDate() -1));
  tomorrow: Date =  new Date(new Date().setDate(new Date().getDate() +1));

  @Input() size: string = 'sm' // input.form-control size
  @Input() locale: string = 'kr'; // en cn kr 캘린더 언어

  @Input() placeholder:string;
  _selectDate: any;
  @Output() selectDateChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() //selectDate: any
  get selectDate() {
    return this._selectDate;
  }
  set selectDate(value) {
    this._selectDate = value;
  }
  calendarDate: any; // calendar에 설정된 실제 날짜
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() outsideClick:boolean = true;
  _placement: string;
  @Input()
  get placement() {
    return this._placement;
  };
  set placement(value) {
    this._placement = value;
    this._bsConfig.adaptivePosition = false;
  }

  _bsConfig: any = {
    containerClass: '', // Theme 'theme-default' | 'theme-primary'
    rangeInputFormat: 'YYYY-MM-DD', // 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'MMMM Do YYYYY, h:mm:ss a'
    showWeekNumbers: false,
    returnFocusToInput: false,
    adaptivePosition: true,
    customTodayClass: 'ngx-today',
    withTimepicker: false,
    dateTooltipTexts: [
      { date: this.today, tooltipText: '오늘'},
      // { date: this.yesterday, tooltipText: '어제'},
      // { date: this.tomorrow, tooltipText: '내일'},
    ],
    ranges: false
  }

  @Input()
  get rangeInputFormat() {
    return this._bsConfig.rangeInputFormat;
  }
  set rangeInputFormat(value) {
    this._bsConfig = {
      ...this._bsConfig,
      rangeInputFormat: value
    };
  }
  @Input()
  get showWeekNumbers() {
    return this._bsConfig.showWeekNumbers;
  }
  set showWeekNumbers(value) {
    this._bsConfig = {
      ...this._bsConfig,
      showWeekNumbers: value || false
    }
  }
  // _ranges: any[] | boolean | undefined = false;
  @Input()
  get ranges() {
    return this._bsConfig.ranges;
  }
  set ranges(value) {
    this._bsConfig = {
      ...this._bsConfig,
      ranges: value ? value === true ? RANGES_INIT : value : []
    }
  }
  @Input()
  get dateTooltipTexts() {
    return this._bsConfig.dateTooltipTexts;
  }
  set dateTooltipTexts(value) {
    this._bsConfig = {
      ...this._bsConfig,
      dateTooltipTexts: value
    }
  }
  @Input()
  get withTimepicker() {
    return this._bsConfig.withTimepicker;
  }
  set withTimepicker(value) {
    this._bsConfig = {
      ...this._bsConfig,
      withTimepicker: value,
    }
  }

  @Input() preNext:boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private localeService: BsLocaleService
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {

  }

  moveToRange(type: string) { //preNext === true일 때 이동하는 함수
    const start = this._selectDate[0];
    const end = this._selectDate[1];
    if(start && end) {
      const format = this._bsConfig.withTimepicker ? 'YYYY-MM-DD[T]HH:mm:ss' : 'YYYY-MM-DD';
      let diff = Number(moment(end).format('x')) - Number(moment(start).format('x'));
      let eDiff = type === 'pre' ? moment(end).subtract(diff, 'ms').format(format) :
        moment(end).add(diff, 'ms').format(format);
      let sDiff = type === 'pre' ? moment(start).subtract(diff, 'ms').format(format) :
        moment(start).add(diff, 'ms').format(format);

      // 달 단위 체크
      if(moment(start).format('YYYY-MM-DD') == moment(start).startOf('months').format('YYYY-MM-DD')
        && moment(end).format('YYYY-MM-DD') == moment(end).endOf('months').format('YYYY-MM-DD')){
        eDiff = type === 'pre' ? moment(end).subtract(1, 'months').endOf('months').format(format) :
          moment(end).add(1, 'months').endOf('months').format(format);
        sDiff = type === 'pre' ? moment(start).subtract(1, 'months').startOf('months').format(format) :
          moment(start).add(1, 'months').startOf('months').format(format);
      }

      this._selectDate = [ new Date(sDiff), new Date(eDiff) ];
      this.selectDateChange.emit(this._selectDate);
      this.cd.detectChanges();
    }
  }

  changeDate(e:any): void {

    // changeDate 이벤트는 bs-datepicker가 열릴 때마다 호출됨
    // time-picker가 없을 경우 날짜 선택 시 닫힘
    if(this._selectDate && this._selectDate.length === 2) {
      //값을 갖고 들어온 경우 return;
      if(moment(e[0]).isSame(this._selectDate[0]) && moment(e[1]).isSame(this._selectDate[1])) return;

    }
    this._selectDate = [...e];
    this.selectDateChange.emit(e);
    this.cd.detectChanges();

    if(!this._bsConfig.withTimepicker) {
      this.open = false;
    }
  }
  deleteDate(): void {
    this.open = false;
    this.selectDateChange.emit(undefined);
    this.cd.detectChanges();
  }
}

