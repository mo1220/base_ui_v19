import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-toast',
  templateUrl: './Toast.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideToastComponent implements AfterViewInit, OnDestroy {
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
