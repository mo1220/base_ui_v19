import {
  AfterViewInit,
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
import {menuType} from "./AutoComplete.component";

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
  scrolling = false;
  activeNum = 0;
  menu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Clear',
      anchor: 'clear',
    },
    {
      title: 'Range Datepicker',
      anchor: 'rangepicker',
    },
    {
      title: 'Date Time picker',
      anchor: 'timepicker',
    },
    {
      title: 'Picker Position',
      anchor: 'placement',
    },
    {
      title: 'Custom Today',
      anchor: 'today',
    },
    {
      title: 'Tooltip For Date',
      anchor: 'tooltip',
    }
  ]

  minDate: Date;
  maxDate: Date;

  today: Date = new Date();
  yesterday: Date =  new Date(new Date().setDate(new Date().getDate() -1));
  tomorrow: Date =  new Date(new Date().setDate(new Date().getDate() +1));

  ranges: IRange[] = [
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
      label: 'Last 7 Days'
    }, {
      value: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
      label: 'Next 7 Days'
    }, {
      value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
      label: 'Last 1 Month'
    }, {
      value: [new Date(new Date().setDate(new Date().getDate() - 365)), new Date()],
      label: 'Last 1 Year'
    }
  ];

  tooltipDates: DatepickerDateTooltipText[] = [
    { date: this.today, tooltipText: 'today'},
    { date: this.yesterday, tooltipText: 'yesterday'},
    { date: this.tomorrow, tooltipText: 'tomorrow'},
  ];


  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

  onAnchor(activeIdx: number){
    this.scrolling = true;
    this.activeNum = activeIdx;
    const targetY = this.anchors.get(activeIdx)?.nativeElement?.offsetTop;
    window.scrollTo({left: 0, top: targetY, behavior: 'smooth'});
  }

  contentScroll(scrollTop: number): void{
    if (!this.scrolling) {
      for(let i=0; i<this.menu.length-1; i++){
        const from = this.anchors.get(i)?.nativeElement.offsetTop - 50;
        const to = this.anchors.get(i+1)?.nativeElement.offsetTop - 50;
        if(scrollTop < to && scrollTop > from){
          this.activeNum = i;
          break;
        }
      }
    }
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onWindowScroll(event: any) {
    event.stopPropagation();
    this.contentScroll(window.scrollY);
  }
  @HostListener('window:scrollend', ['$event']) // for window scroll events
  onWindowScrollEnd(event: any) {
    event.stopPropagation();
    this.scrolling = false;
  }
}
