import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-dropdown',
  templateUrl: './Dropdown.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideDropdownComponent implements AfterViewInit, OnDestroy {
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
