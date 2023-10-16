import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {STYLE_GUIDE_MENU} from "../style-guide.models";

/**
 * @class StyleGuideComponent UI 스타일 가이드 *
 * */
@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.template.html',
  host: { class:'page-content' },
  styleUrls: ['./style-guide.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideComponent implements AfterViewInit, OnDestroy {
  menus = [ ...STYLE_GUIDE_MENU ];
  title = 'Style Guide';
  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void { }

  routeNav(e: any) {
    console.log(e);
  }
  ngOnDestroy(): void { }
}
