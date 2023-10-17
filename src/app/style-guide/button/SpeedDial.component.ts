import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * @class StyleGuideSpeedDialComponent *
 * */
@Component({
  selector: 'style-guide-speed-dial',
  templateUrl: './SpeedDial.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSpeedDialComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
