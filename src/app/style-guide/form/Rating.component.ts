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

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-rating',
  templateUrl: './Rating.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideRatingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  menus: Array<menuType> = [
    {
      title: 'Basic',
      desc: 'basic Tree Component',
      anchor: 'basic',
    },
    {
      title: 'Color',
      desc: 'basic Tree Component',
      anchor: 'color',
    },
    {
      title: 'Size',
      desc: 'basic Tree Component',
      anchor: 'size',
    },
    {
      title: 'Custom Icon',
      desc: 'basic Tree Component',
      anchor: 'customIcon',
    }
  ];
  rate = 5;
  max: number = 10;

  colorlist = [
    { name: 'Default', value: 'default' },
    { name: 'Primary', value: 'primary' },
    { name: 'Success', value: 'success' },
    { name: 'Info',    value: 'info' },
    { name: 'Warning', value: 'warning' },
    { name: 'Danger',  value: 'danger' }
  ];

  sizeList = [
    { name: 'X Small', value: 'xs' },
    { name: 'Small',   value: 'sm' },
    { name: 'Default', value: '' },
    { name: 'Large',   value: 'lg' },
    { name: 'X Large', value: 'xl' }
  ];

  iconList = [
    { name: 'Favorite', value: 'favorite' },
    { name: 'Person',   value: 'person' },
    { name: 'Circle', value: 'circle' }
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
