import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { STYLE_GUIDE_MENU } from "../style-guide.models";
import { routeAnimations } from "../../core/core.module";
import * as _ from 'lodash';
import {ruLocale} from "ngx-bootstrap/chronos";
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
  minimize:boolean = false; // Aside Menu 최소화 여부
  constructor(
    private translate: TranslateService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    // Menu Depth length 값을 구함
    this.getDpeth();
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

  getDpeth() {
    function getDepth(array: any) {
      return 1 + Math.max(0, ...array.map(({ children = [] }) => getDepth(children)));
    }
    const depthLength = getDepth(this.menus) - 1;
    // Menu Depth Length 를 기반으로 Active Index 관리
    this.menuActiveIndex = new Array(depthLength).fill(-1);
  }

  ngAfterViewInit(): void {

    let url: string[] = _.clone(this.currentUrls);
    url[0] = ''; // style-guide 를 빈문자열로
    // style-guide 를 뺀 현재 URL 'link' 값을 기준으로 메뉴 구조에서 찾기 위한 값
    const currentUrl = url.join('/');

    const urls: any = {}; // 부모와 자식 Mapping
    const index: any = {}; // Link 값별 index
    function buildUrl(value:string | boolean, children: any[], key:string) {
      for(let i in children) {
        urls[children[i][key]] = value;
        buildUrl(children[i][key], children[i].children, key);
      }
    }
    function buildIndex(value:string | boolean, children: any[], key:string) {
      for(let i in children) {
        index[children[i][key]] = i;
        buildIndex(children[i][key], children[i].children, key);
      }
    }
    buildUrl(false, this.menus, 'link');
    buildIndex(false, this.menus, 'link');
    function getPath(value: string): any {
      return urls[value] ? getPath(urls[value]).concat([value]) : [value];
    }
    const depth = getPath(currentUrl);
    depth.map((d: string, i:number) => {
      this.menuActiveIndex[i] = Number(index[d]);
      return Number(index[d]);
    });
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

  toggleMinimize() {
    this.minimize = !this.minimize;
    this.left = this.minimize ? 50 : 200;
  }
  onResize(e:any) {
    if(this.minimize) return; // 최소화 되었을 경우는 아무것도 안함
    if(e.size.width < 90) {
      // 최소값이하 일 경우 minimize
      this.minimize = true;
      this.left = 50;
      return;
    }
    const width = e.size.width > 400 ? 400 : e.size.width < 90 ? 90 : e.size.width;
    this.left = width;
  }
  ngOnDestroy(): void { }
}
