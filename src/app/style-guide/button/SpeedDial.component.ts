import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

export interface splitBtnMenuType {
  title: string;
  anchor?: string;
  desc: string;
}


/**
 * @class StyleGuideSpeedDialComponent *
 * */
@Component({
  selector: 'style-guide-speed-dial',
  templateUrl: './SpeedDial.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSpeedDialComponent implements AfterViewInit, OnDestroy {
  splitMenu: Array<splitBtnMenuType> = [
    {
      title: 'Basic',
      desc: '컬러별 Split 버튼'
    }
  ]
  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
