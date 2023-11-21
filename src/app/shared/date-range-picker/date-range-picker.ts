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
    withTimepicker: false,
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

  constructor(
    private cd: ChangeDetectorRef,
    private localeService: BsLocaleService
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {

  }

  changeDate(e:any): void {
    // changeDate 이벤트는 bs-datepicker가 열릴 때마다 호출됨
    // time-picker가 없을 경우 날짜 선택 시 닫힘
    console.log(e, '---------',this.selectDate);
    if(!this.selectDate) { this.open = false; }
    else {
      if(moment(e[0]).isSame(this.selectDate[0]) && moment(e[1]).isSame(this.selectDate[1])) return;

    }

    this.selectDate = e;
    this.selectDateChange.emit(this.selectDate);
    if(!this._bsConfig.withTimepicker) this.open = false;
    this.cd.detectChanges();
  }
  deleteDate(): void {
    this.selectDateChange.emit('');
  }
  closePopup() {
    console.log(this.selectDate);
    this.open = false;
  }
}

