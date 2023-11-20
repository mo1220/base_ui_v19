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
import {menuType} from "../style-guide.models";
import {CheckList} from "./Checkbox.component";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-radio',
  templateUrl: './RadioButton.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideRadioButtonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  radioMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Size',
      anchor: 'size',
    },
    {
      title: 'Disabled State',
      anchor: 'disabled',
    }
  ];

  radioItems: string[] = ['default', 'primary', 'success', 'info', 'warning', 'danger']
  radioValue: string = 'default';
  sublist = [
    { name: 'Default', value: 'default' },
    { name: 'Primary', value: 'primary' },
    { name: 'Success', value: 'success' },
    { name: 'Info',    value: 'info' },
    { name: 'Warning', value: 'warning' },
    { name: 'Danger',  value: 'danger' }
  ];


  sizeValue: string = '';
  sizeList = [
    { name: 'X Small', value: 'xs' },
    { name: 'Small',   value: 'sm' },
    { name: 'Default', value: '' },
    { name: 'Large',   value: 'lg' },
    { name: 'X Large', value: 'xl' }
  ]

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  changeRadioValue(e: any) {
    // console.log(e.target.value);
    this.radioValue = e.target.value;
  }

  changeRadioSizeValue(e: any) {
    console.log(e);
  }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
