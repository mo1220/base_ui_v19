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
  _selectDate: any;
  @Output() selectDateChange: EventEmitter<any> = new EventEmitter<any>();
  @Input()// selectDate:any;
  get selectDate() {
    return this._selectDate;
  }
  set selectDate(value) {
    this._selectDate = value;
  }

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
    console.log(this.open);
    // this.cd.detectChanges();
  }
  changeDate(e:any): void {
    // e : 클릭한 날짜 , _selectDate : 클릭전부터 갖고있던 날짜
    // _selectDate값을 갖고 들어오는 경우 calendar open시 이벤트가 호출되어 예외처리 필수
    // time-picker가 없을 경우 날짜 선택 시 닫힘
    if(!moment(e).isSame(this._selectDate) && !this._bsConfig.withTimepicker) {
      this.open = false;
    }

    this._selectDate = e;
    this.selectDateChange.emit(e);
    this.cd.detectChanges();
  }
  deleteDate(): void {
    this.open = false;
    this.selectDateChange.emit(undefined);
    this.cd.detectChanges();
  }
}

