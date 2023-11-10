import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy, QueryList,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {ThemePalette} from "@angular/material/core";
import {menuType} from "../style-guide.models";

export interface CheckList {
  name: string;
  checked: boolean;
  color?: string;
  sublist?: CheckList[];
}

/**
 * @class StyleGuideCheckboxComponent *
 * */
@Component({
  selector: 'style-guide-checkbox',
  templateUrl: './Checkbox.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideCheckboxComponent implements AfterViewInit, OnDestroy {

  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  checkboxMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Size',
      anchor: 'size',
    },
    {
      title: 'Rounded',
      anchor: 'round',
    },
    {
      title: 'Group',
      anchor: 'group',
    },
    {
      title: 'Disabled State',
      anchor: 'disabled',
    },
    {
      title: 'Switch',
      anchor: 'switch',
    }
  ]

  allCheck: boolean = false;
  checkList: CheckList = {
    name: 'All Checked',
    color: '',
    checked: true,
    sublist: [
      {name: 'Default', checked: true},
      {name: 'Primary', color: 'primary', checked: true},
      {name: 'Success', color: 'success', checked: true},
      {name: 'Info', color: 'info', checked: true},
      {name: 'Warning', color: 'warning', checked: true},
      {name: 'Danger', color: 'danger', checked: true},
    ]
  }

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }

  someComplete(): boolean {
    if (this.checkList.sublist == null) {
      return false;
    }
    return this.checkList.sublist.filter(t => t.checked).length > 0 && !this.allCheck;
  }

  updateAllComplete() {
    this.allCheck = this.checkList.sublist != null && this.checkList.sublist.every(t => t.checked);
  }

  setAll(ck: boolean) {
    this.allCheck = ck;
    if (this.checkList.sublist == null) {
      return;
    }
    this.checkList.sublist.forEach(t => (t.checked = ck));
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
