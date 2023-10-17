import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-infomation',
  templateUrl: './style-guide-infomation.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideInfomationComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
