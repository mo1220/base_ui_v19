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

interface SliderDetails {
  value: number;
  highValue: number;
  floor: number;
  ceil: number;
}
/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-slider',
  templateUrl: './Slider.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSliderComponent implements AfterViewInit, OnDestroy {
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
      desc: 'Slider 날짜',
    }
  ];
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  sliders: SliderDetails[] = [
    {
      value: -1,
      highValue: 2,
      floor: -5,
      ceil: 5
    },
    {
      value: 1,
      highValue: 2,
      floor: 0,
      ceil: 5
    },
    {
      value: 30,
      highValue: 60,
      floor: 0,
      ceil: 100
    },
    {
      value: 30,
      highValue: 60,
      floor: 0,
      ceil: 100
    },
    {
      value: 30,
      highValue: 60,
      floor: 0,
      ceil: 100
    },
    {
      value: 30,
      highValue: 60,
      floor: 0,
      ceil: 100
    }
  ];
  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  sliderOptions(slider: SliderDetails): Options {
    return {
      floor: slider.floor,
      ceil: slider.ceil
    };
  }
  ngOnDestroy(): void { }
}
