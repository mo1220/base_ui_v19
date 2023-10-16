import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
* @class MainComponent 메인 페이지 *
* */
@Component({
  selector: 'app-main',
  templateUrl: './main.template.html',
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
