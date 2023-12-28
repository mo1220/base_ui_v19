import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {TabDirective} from "ngx-bootstrap/tabs";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-tab-menu',
  templateUrl: './TabMenu.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideTabMenuComponent implements AfterViewInit, OnDestroy {

  matSelectedIndex:number;
  ngxSelectTab:string;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }

  changeTabIndex(e: number) {
    console.log(e);
    this.matSelectedIndex = e;
  }

  onSelectTab(data: TabDirective) {
    console.log(data);
    this.ngxSelectTab = data.id+'';
  }
}
