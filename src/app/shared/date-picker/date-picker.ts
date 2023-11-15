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
  selector: 'date-picker',
  templateUrl: './date-picker.template.html',
  styleUrls: ['./date-picker.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements OnInit {
  today: Date = new Date();
  yesterday: Date =  new Date(new Date().setDate(new Date().getDate() -1));
  tomorrow: Date =  new Date(new Date().setDate(new Date().getDate() +1));

  @Input() locale: string = 'kr'; // en cn kr 캘린더 언어

  @Input() placeholder:string;
  @Input() selectDate: any // 선택한 날짜 value
  @Output() selectDateChange: EventEmitter<any> = new EventEmitter<any>();

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
    isAnimated: true,
    dateInputFormat: 'YYYY-MM-DD', // 'YYYY.MM.DD' 'YYYY/MM/DD' 'YYYY MM DD h:mm:ss a'
    showWeekNumbers: false,
    returnFocusToInput: false,
    adaptivePosition: true,
    customTodayClass: 'ngx-today',
    dateTooltipTexts: [
      { date: this.today, tooltipText: '오늘'},
      // { date: this.yesterday, tooltipText: '어제'},
      // { date: this.tomorrow, tooltipText: '내일'},
    ],
    rangeInputFormat: undefined, // 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'MMMM Do YYYYY, h:mm:ss a'
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
  get dateInputFormat() {
    return this._bsConfig.dateInputFormat;
  }
  set dateInputFormat(value) {
    this._bsConfig = {
      ...this._bsConfig,
      dateInputFormat: value,
      rangeInputFormat: undefined
    };
  }
  @Input()
  get rangeInputFormat() {
    return this._bsConfig.rangeInputFormat;
  }
  set rangeInputFormat(value) {
    this._bsConfig = {
      ...this._bsConfig,
      dateInputFormat: undefined,
      rangeInputFormat: value
    };
    console.log(this._bsConfig);
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


  // @Input() ranges: IRange[] = [
  //   {
  //     value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
  //     label: 'Last 7 Days'
  //   }, {
  //     value: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
  //     label: 'Next 7 Days'
  //   }, {
  //     value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
  //     label: 'Last 1 Month'
  //   }, {
  //     value: [new Date(new Date().setDate(new Date().getDate() - 365)), new Date()],
  //     label: 'Last 1 Year'
  //   }
  // ];


  constructor(
    private localeService: BsLocaleService
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {

  }

  changeDate(): void {
    console.log(this.selectDate);
    this.selectDateChange.emit(this.selectDate);
  }
}

