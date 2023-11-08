import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'login-component',
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  constructor(
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
