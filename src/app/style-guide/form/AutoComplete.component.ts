import {
  AfterViewInit, ChangeDetectorRef,
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
import {Observable, startWith, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {menuType} from "../style-guide.models";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";

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
  autocompleteMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Reactive',
      anchor: 'reactive',
    }
  ]

  search$: Subject<string> = new Subject<string>();
  searchKeyword: string = '';

  focused: boolean = false;

  keywordLoading = true;

  completeList: Array<string> = ['apple','ace','banana','bulls','cat','city','strong'];
  filteredList: Array<string> = [];
  loadingList = Array.from({length: 5}).map((_, i) => i);
  control = new FormControl('');
  autoCompleteView: boolean = false;


  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatAutocompleteTrigger) autoComplete: MatAutocompleteTrigger;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  keyupEvent(e: KeyboardEvent): void {
    // this.autoCompleteView = true;
    e.preventDefault();
    if (e.key === 'Enter') {
      // search Event here
      this.search$.next(this.searchKeyword);

      this.searchInput.nativeElement.blur();
      this.focused = false;
      this.autoComplete.closePanel();
    }else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      this.searchKeyword = this.autoComplete.activeOption?.value;
    } else {
      this.search$.next(this.searchKeyword);
    }
  }

  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe((keyword) => {
      this.filteredList = this.completeList.filter(d => d.includes(keyword));
    });
  }


  onFocus() {
    this.search$.next('');
    this.focused = true;
  }
  onFocusout() {
    this.focused = false;
    this.searchInput.nativeElement.blur();
  }

  ngOnDestroy(): void { }

}
