import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'session-out',
  templateUrl: './session-out.template.html',
  styleUrls: ['./session-out.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SessionOutComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
