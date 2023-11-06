import {
  AfterViewInit, ChangeDetectorRef,
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
      value: 4000000,
      color: '#420761'
    },
    {
      value: 8000000,
      color: '#932266'
    },
    {
      value: 12000000,
      color: '#dd5130'
    },
    {
      value: 16000000,
      color: '#fba709'
    },
    {
      value: 20000000,
      color: '#f9fd9a'
    }
  ];
  color = '#932266';
  categoryColors:any = [];
  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

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
