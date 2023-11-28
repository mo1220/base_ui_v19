import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {DatepickerDateTooltipText} from "ngx-bootstrap/datepicker";
import {menuType} from "../style-guide.models";

interface IRange {
  value: Date[];
  label: string;
}
/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-calendar',
  templateUrl: './Calendar.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideCalendarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  calendarMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Range Datepicker',
      anchor: 'rangepicker',
    },
    {
      title: 'Time Picker',
      anchor: 'timepicker',
    },
  ]

  minDate: Date = new Date();
  maxDate: Date = new Date();

  selectedDate: Date = new Date();
  selectedRange: any = [new Date(), new Date(new Date().setDate(new Date().getDate() +1))];
  selectedTime: Date = new Date();

  tooltipDates: DatepickerDateTooltipText[] = [
    { date: new Date(), tooltipText: 'today'},
    { date: new Date(new Date().setDate(new Date().getDate() -1)), tooltipText: 'yesterday'},
    { date: new Date(new Date().setDate(new Date().getDate() +1)), tooltipText: 'tomorrow'},
  ];

  hourStep:number = 1;
  minStep:number = 15;

  showMeridian: boolean = true;
  customMeridian: Array<string> = ['오전', '오후'];
  showMin:boolean = true;
  showSec:boolean = true;

  minTime: Date = new Date();
  maxTime: Date = new Date();

  ranges : any[] = [{
    value: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date()],
    label: '최근 1일'
  }, {
    value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
    label: '최근 일주일'
  }];
  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 30);

    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(23);
    this.maxTime.setMinutes(55);

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }

}
