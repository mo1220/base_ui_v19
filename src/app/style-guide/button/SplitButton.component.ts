import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * @class StyleGuideSplitButtonComponent *
 * */
@Component({
  selector: 'style-guide-split-button',
  templateUrl: './SplitButton.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSplitButtonComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
