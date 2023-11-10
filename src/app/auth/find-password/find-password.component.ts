import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'find-password',
  templateUrl: './find-password.template.html',
  styleUrls: ['./find-password.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FindPasswordComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
