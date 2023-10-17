import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { STYLE_GUIDE_MENU } from "../style-guide.models";
import { routeAnimations } from "../../core/core.module";
import * as _ from 'lodash';
/**
 * @class StyleGuideComponent UI 스타일 가이드 *
 * */
@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.template.html',
  host: { class:'page-content' },
  styleUrls: ['./style-guide.style.scss'],
  animations: [routeAnimations],
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideComponent implements AfterViewInit, OnDestroy {
  menus = [ ...STYLE_GUIDE_MENU ];
  title = '';
  desc = ''; // 설명
  currentUrls = [];
  breadcrumb: any = [];
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          const e: any = event;
          // style-guide 부터 URL
          this.currentUrls = e.url.substring(1, e.url.length).split('/');
          this.setTitle();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngAfterViewInit(): void {

  }

  routeNav(e: any) {
    this.title = e.name;
    this.desc = e.desc ? e.desc : '설명';
    const link: Array<string> = e.link.split('/');
    link.shift();
    this.router.navigate([ 'style-guide', ...link ]);
  }

  setTitle() {
    const urls = _.clone(this.currentUrls);
    urls.shift();
    let menus = _.cloneDeep(this.menus);
    let names = '';
    this.breadcrumb = _.reduce(urls, (r:any[], v: string, k:number) => {

      names = names + '/' + v;
      const crumb: any = _.find(menus, d => d.link === names);
      const index: number = _.findIndex(menus, d => d.link === names);

      r.push({ name: crumb.name, menu: [ ...menus ], index });
      menus = crumb.children;

      if(k === urls.length - 1) {
        if(this.title === '' && this.desc === '') {
          this.title = crumb.name;
          this.desc = crumb.desc ? crumb.desc : '';
        }
      }
      return r;
    }, []);
  }
  ngOnDestroy(): void { }
}
