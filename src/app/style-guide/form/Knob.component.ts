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
  selector: 'style-guide-knob',
  templateUrl: './Knob.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideKnobComponent implements AfterViewInit, OnDestroy {

  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  radioMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Min/Max',
      anchor: 'minMax',
    },
    {
      title: 'Step',
      anchor: 'step',
    },
    {
      title: 'Value Template',
      anchor: 'valueTemplate',
    },
    {
      title: 'Stroke Width',
      anchor: 'strokeWidth',
    },
    {
      title: 'Size',
      anchor: 'size',
    },
    {
      title: 'Color',
      anchor: 'color',
    },
    {
      title: 'ReadOnly',
      anchor: 'readonly',
    },
    {
      title: 'Disabled',
      anchor: 'disabled',
    }
  ];
  value: number = 50;
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
