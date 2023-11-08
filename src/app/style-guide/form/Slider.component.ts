import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Options } from 'ngx-slider-v2';
import * as moment from 'moment';
import * as numeral from 'numeral';
import * as _ from 'lodash';
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-slider',
  templateUrl: './Slider.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSliderComponent implements AfterViewInit, OnDestroy {
  linkValue$: Subject<any> = new Subject<any>();
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  buttonMenu: any = [
    {
      title: 'Slider 기본',
      anchor: 'basicSlider',
      desc: 'Basic Slider',
    },
    {
      title: 'Slider Range',
      anchor: 'sliderRange',
      desc: 'Slider Range',
    },
    {
      title: 'Slider Step',
      anchor: 'sliderStep',
      desc: 'Slider Step',
    },
    {
      title: 'Slider 이하',
      anchor: 'sliderLess',
      desc: 'Slider 이하',
    },
    {
      title: 'Slider 이상',
      anchor: 'sliderGreater',
      desc: 'Slider 이상',
    },
    {
      title: 'Slider 포맷',
      anchor: 'sliderFormat',
      desc: 'Slider 포맷',
    },
    {
      title: 'Slider 날짜',
      anchor: 'sliderDate',
      desc: 'Slider 날짜 Tick이 많아지면 느려지는 현상이 있음 사용시 주의',
    }
  ];
  singleValue = ['basicSlider', 'sliderStep', 'sliderLess', 'sliderGreater'];
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  sliders: any[] = [
    { // 기본
      value: 10,
      floor: 0,
      ceil: 50
    },
    { // 범위
      value: 10,
      highValue: 20,
      floor: 0,
      ceil: 100
    },
    { // 스텝
      value: 30,
      highValue: 60,
      floor: 0,
      step: 5,
      ceil: 100
    },
    { // 이하
      value: 30,
      highValue: 60,
      floor: 0,
      ceil: 100,
      showSelectionBar: true
    },
    { // 이상
      value: 30,
      highValue: 60,
      floor: 0,
      ceil: 100,
      showSelectionBarEnd: true
    },
    { // Format
      value: -3000,
      highValue: 6000,
      floor: -10000,
      ceil: 10000,
      step: 100,
      translate: (value: number): string => {
        return numeral(value).format('0.0a');
      }
    },
    { // 날짜
      value: Number(moment().subtract(1, 'months').format('x')),
      highValue: Number(moment().format('x')),
      floor: Number(moment().subtract(1, 'months').format('x')),
      ceil: Number(moment().format('x')),
      step: 1000 * 60 * 60, // 한달 기준 최소 시간 기준
      translate: (value: number): string => {
        return moment(value).format('YYYY.MM.DD hh:mm');
      }
    }
  ];
  margins: any = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  };

  values = {
    less: 5,
    matLess: 5,
    range: {
      from: 5,
      to: 50
    },
    matRange: {
      from: 5,
      to: 50
    }
  }

  link = false;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
    // this.linkValue$.pipe(
    //   debounceTime(200)
    // ).subscribe(res => {
    //   this.margins.
    // })
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  formatLabel(value: number): string {
    return moment(value).format('YY.MM.DD hh:mm');
  }

  sliderOptions(slider: any): Options {
    const option = _.cloneDeep(slider);
    delete option.value;
    delete option.highValue;
    return {
      ...option
    };
  }

  /**
  * @function changeLinkValue 링크 벨류
  * */
  changeLinkValue(e: any, key: string) {
    if(this.link) {
      const arr = _.filter(['top', 'bottom', 'left', 'right'], d => d !== key);
      _.forEach(arr, (v: any, k) => {
        this.margins[v] =e;
      });
    }
  }

  changeLink() {
    this.link = !this.link;
    if(this.link) {
      const max = _.max(_.values(this.margins));
      const arr = ['top', 'bottom', 'left', 'right'];
      _.forEach(arr, (v: any, k) => {
        this.margins[v] = max;
      });
    }
  }
  ngOnDestroy(): void { }
}
