import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {AceComponent} from "ngx-ace-wrapper";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-color-picker',
  templateUrl: './ColorPicker.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideColorPickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  buttonMenu: any = [
    {
      title: 'Basic Color Picker(Single)',
      anchor: 'basicColorInput',
      desc: 'Basic Color Picker',
    },
    {
      title: 'Category Color',
      anchor: 'categoryColor',
      desc: 'Category Color',
    },
    {
      title: 'Scale Color',
      anchor: 'scaleColor',
      desc: 'Scale Color',
    }
  ];

  scaleColors = [
    {
      value: 0,
      color: '#000004'
    },
    {
      value: 20,
      color: '#420761'
    },
    {
      value: 40,
      color: '#932266'
    },
    {
      value: 60,
      color: '#dd5130'
    },
    {
      value: 80,
      color: '#fba709'
    },
    {
      value: 100,
      color: '#f9fd9a'
    }
  ];
  color = '#932266';
  categoryColors:any = [];
  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  changeScaleColor(e: any) {
    console.log(e);
  }

  colorChange(e: any) {
    console.log(e);
  }

  changeCategoryColors(e: any) {

  }

  ngOnDestroy(): void { }
}
