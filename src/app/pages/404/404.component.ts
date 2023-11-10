import { Component, ViewEncapsulation} from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'page-not-found',
  templateUrl: './404.template.html',
  styleUrls: ['./404.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent {
  env = env;
}
