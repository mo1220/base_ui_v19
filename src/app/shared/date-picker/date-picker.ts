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
import * as _ from 'lodash';

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
  open: boolean = false;
  today: Date = new Date();
  yesterday: Date =  new Date(new Date().setDate(new Date().getDate() -1));
  tomorrow: Date =  new Date(new Date().setDate(new Date().getDate() +1));

  @Input() size: string = 'sm' // input.form-control size
  @Input() locale: string = 'kr'; // en cn kr 캘린더 언어

  @Input() placeholder:string;
  @Input() selectDate:any;
  // get selectDate() {
  //   return this._selectDate;
  // } // 선택한 날짜 value 전달용
  // set selectDate(value) {
  //   this._selectDate = value;
  // }
  // _selectDate;
  @Output() selectDateChange: EventEmitter<any> = new EventEmitter<any>();
  calendarDate: any; // calendar에 설정된 실제 날짜

  @Input() minDate: Date;
  @Input() maxDate: Date;

  _bsConfig: any = {
    containerClass: '', // Theme 'theme-default' | 'theme-primary'
    dateInputFormat: 'YYYY-MM-DD', // 'YYYY.MM.DD' 'YYYY/MM/DD' 'YYYY MM DD h:mm:ss a'
    showWeekNumbers: false,
    customTodayClass: 'ngx-today',
    dateTooltipTexts: [
      { date: this.today, tooltipText: '오늘'},
      // { date: this.yesterday, tooltipText: '어제'},
      // { date: this.tomorrow, tooltipText: '내일'},
    ],
    withTimepicker: false,
  }

  @Input()
  get dateInputFormat() {
    return this._bsConfig.dateInputFormat;
  }
  set dateInputFormat(value) {
    this._bsConfig = {
      ...this._bsConfig,
      dateInputFormat: value,
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

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  changeDateFormat(value:any): string {
    // html에서 date pipe 사용 시 DD => dd로 포맷 변환 필요
    return value.replace(/(DD)/,"dd");
  }

  toggleOpen() {
    this.open = true;
    this.cd.detectChanges();
  }
  changeDate(e:any): void {
    console.log(e, '---------',this.selectDate);
    if(!this.selectDate) { this.open = false; }
    // changeDate 이벤트는 bs-datepicker가 열릴 때마다 호출됨
    // time-picker가 없을 경우 날짜 선택 시 닫힘
    if(!moment(e).isSame(this.selectDate) && !this._bsConfig.withTimepicker) this.open = false;
    this.selectDate = e;
    this.selectDateChange.emit(this.selectDate);
    this.cd.detectChanges();
  }
  deleteDate(): void {
    this.selectDateChange.emit('');
  }
}

