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

  minDate: Date;
  maxDate: Date;

  selectedDate: Date;
  selectedRange: Date;

  tooltipDates: DatepickerDateTooltipText[] = [
    { date: new Date(), tooltipText: 'today'},
    { date: new Date(new Date().setDate(new Date().getDate() -1)), tooltipText: 'yesterday'},
    { date: new Date(new Date().setDate(new Date().getDate() +1)), tooltipText: 'tomorrow'},
  ];


  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 30);

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }

}
