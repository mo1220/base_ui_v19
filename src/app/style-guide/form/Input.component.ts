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
import {menuType} from "../style-guide.models";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-input',
  templateUrl: './Input.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideInputComponent implements AfterViewInit, OnDestroy {

  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  inputMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Reactive',
      anchor: 'reactive',
    }
  ]

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
