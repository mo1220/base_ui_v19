import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy, QueryList,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {menuType} from "./AutoComplete.component";
import {ThemePalette} from "@angular/material/core";

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
  scrolling = false;
  activeNum = 0;
  menu: Array<menuType> = [
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

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }


  onAnchor(activeIdx: number){
    this.scrolling = true;
    this.activeNum = activeIdx;
    const targetY = this.anchors.get(activeIdx)?.nativeElement?.offsetTop;
    window.scrollTo({left: 0, top: targetY, behavior: 'smooth'});
  }

  contentScroll(scrollTop: number): void{
    if (!this.scrolling) {
      for(let i=0; i<this.menu.length-1; i++){
        const from = this.anchors.get(i)?.nativeElement.offsetTop - 50;
        const to = this.anchors.get(i+1)?.nativeElement.offsetTop - 50;
        if(scrollTop < to && scrollTop > from){
          this.activeNum = i;
          break;
        }
      }
    }
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onWindowScroll(event: any) {
    event.stopPropagation();
    this.contentScroll(window.scrollY);
  }
  @HostListener('window:scrollend', ['$event']) // for window scroll events
  onWindowScrollEnd(event: any) {
    event.stopPropagation();
    this.scrolling = false;
  }
}
