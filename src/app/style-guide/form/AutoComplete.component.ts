import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as events from "events";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";

export interface menuType {
  title: string;
  anchor: string;
  desc?: string;
}

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-autocomplete',
  templateUrl: './AutoComplete.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideAutoComplateComponent implements AfterViewInit, OnDestroy {

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
      title: 'Reactive',
      anchor: 'reactive',
    }
  ]

  keyword: Array<string> = ['',''];
  completeList: Array<string> = ['apple','ace','banana','bulls','cat','city','strong'];
  filteredList: Observable<string[]>;
  control = new FormControl('');
  autoCompleteView: boolean = false;


  constructor(
    private translate: TranslateService,
    private router: Router
  ) {

  }

  ngAfterViewInit(): void { }

  keyupEvent(e: KeyboardEvent): void {
    // this.autoCompleteView = true;
    this.filteredList = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.completeList.filter(option => option.toLowerCase().includes(filterValue));
  }

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
