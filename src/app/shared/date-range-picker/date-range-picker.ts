import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation} from "@angular/core";
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

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.template.html',
  styleUrls: ['./date-range-picker.style.scss'],
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
  @Input() selectDate: any // 선택한 날짜 value 전달용
  @Output() selectDateChange: EventEmitter<any> = new EventEmitter<any>();
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
    dateTooltipTexts: [
      { date: this.today, tooltipText: '오늘'},
      // { date: this.yesterday, tooltipText: '어제'},
      // { date: this.tomorrow, tooltipText: '내일'},
    ],
    ranges: [
      {
        value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
        label: '최근 일주일'
      }, {
        value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
        label: '최근 1개월'
      }, {
        value: [new Date(new Date().setDate(new Date().getDate() - 61)), new Date()],
        label: '최근 3개월'
      }, {
        value: [new Date(new Date().setDate(new Date().getDate() - 183)), new Date()],
        label: '최근 6개월'
      }, {
        value: [new Date(new Date().setDate(new Date().getDate() - 365)), new Date()],
        label: '최근 1년'
      }, {
        value: [new Date(new Date().setDate(new Date().getDate() - 1095)), new Date()],
        label: '최근 3년'
      }
    ]
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
  @Input()
  get returnFocusToInput() {
    return this._bsConfig.returnFocusToInput;
  }
  set returnFocusToInput(value) {
    this._bsConfig = {
      ...this._bsConfig,
      returnFocusToInput: value || false
    }
  }
  @Input()
  get ranges() {
    return this._bsConfig.ranges;
  }
  set ranges(value) {
    this._bsConfig = {
      ...this._bsConfig,
      ranges: value || undefined
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


  constructor(
    private localeService: BsLocaleService
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {

  }

  changeDateFormat(value:any): string {
    // html에서 date pipe 사용 시 DD => dd로 포맷 변환 필요
    return value.replace(/(DD)/,"dd");
  }

  changeDate(e:any): void {
    // time-picker가 없을 경우 날짜 선택 시 닫힘
    if(!this._bsConfig.withTimepicker) this.open = false;

    this.calendarDate = e;
    this.selectDate = e;// moment(e).format(this._bsConfig.dateInputFormat);
    this.selectDateChange.emit(this.selectDate);
  }
  deleteDate(): void {
    this.selectDateChange.emit('');
  }
}

