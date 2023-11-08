import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
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
  menus: any = [ ...STYLE_GUIDE_MENU ];
  title = '';
  desc = ''; // 설명
  currentUrls = [];
  breadcrumb: any = [];
  left: number = 200;
  menuActiveIndex: number[] =[];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    // Menu Depth length 값을 구함
    function getDepth(array: any) {
      return 1 + Math.max(0, ...array.map(({ children = [] }) => getDepth(children)));
    }
    const depthLength = getDepth(this.menus) - 1;
    // Menu Length를 기반으로 Active Index 관리
    this.menuActiveIndex = new Array(depthLength).fill(-1);

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
    const fi = _.findIndex(this.menus, (d:any) => d.link === ('/' + this.currentUrls[1]));
    if(fi !== -1) {
      this.menus[fi].active = true;
    }
    this.cd.detectChanges();
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
      const crumb: any = _.find(menus, (d:any) => d.link === names);
      const index: number = _.findIndex(menus, (d:any) => d.link === names);

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

  onResize(e:any) {
    this.left = e.size.width;
  }
  ngOnDestroy(): void { }
}
