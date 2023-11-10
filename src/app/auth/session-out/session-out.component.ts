import { Component, ViewEncapsulation } from '@angular/core';
import {
  ROUTE_ANIMATIONS_ELEMENTS
} from '../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'session-out',
  templateUrl: './session-out.template.html',
  styleUrls: ['./session-out.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SessionOutComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  env = env;

  constructor(
    private translate: TranslateService
  ) {

  }
}
