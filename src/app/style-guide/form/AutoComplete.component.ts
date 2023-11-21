import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import * as events from "events";
import {FormControl} from "@angular/forms";
import {Observable, startWith, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, tap} from "rxjs/operators";
import {menuType} from "../style-guide.models";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import * as _ from 'lodash';
import {MatOptionSelectionChange} from "@angular/material/core";
import * as moment from "moment/moment";

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
  keywordList: { val: string; label: any }[] = [];
  keywordGroupList: Array<any> = [];
  completeList: Array<string> = ['apple', 'ace', 'banana', 'bulls', 'cat', 'city', 'strong'];
  // filteredList: Array<string> = [];
  loadingList = Array.from({length: 5}).map((_, i) => i);
  autoCompleteView: boolean = false;
  // inputKeyword: string = '';
  inputList$: Observable<any> = new Observable<any>();



  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('searchInput2') searchInput2: ElementRef;
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
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      this.searchKeyword = this.autoComplete.activeOption?.value;
    } else {
      this.focused = true;
      this.search$.next(this.searchKeyword);
    }
  }

  ngOnInit(): void {
    const keywordHighlight = (data: any) => data.replace(this.searchKeyword, '<b class="highlight">' + this.searchKeyword + '</b class>')

    this.inputList$ = this.search$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      // filter(d => !d),
      map(keyword => this.completeList.filter(d => d.toLowerCase().includes(keyword))
        .map(d => ({ val: d, label: keywordHighlight(d)})))
    );

    this.inputList$
      .subscribe((list) => {
      this.keywordLoading = false;
      console.log(list);
      this.keywordList = [...list]; //this.filteredList.map(d => ({val: d, label: keywordHighlight(d)} ));
      this.keywordGroupList = [
        {
          group: 'history',
          label: '최근 검색어',
          values: list.map((d: any) => ({
            ...d,
            logtime: moment().format('YYYY-MM-DD')
          }))
        },
        {
          group: 'keyword',
          label: '인기 검색어',
          values: [...list]
        },
      ];
    });
  }


  onFocus() {
    this.search$.next('');
    this.focused = true;
  }

  onFocusout() {
    this.focused = false;
    this.searchInput.nativeElement.blur();
    this.searchInput2.nativeElement.blur();
  }

  onOptionSelected(e: any) {
    const value = e.option.value; //e.source.value;
    this.search$.next(value);
    this.searchInput.nativeElement.blur();
    this.searchInput2.nativeElement.blur();
    // this.searchBox.nativeElement.blur();
    this.focused = false;
    this.keywordLoading = false;
  }

  ngOnDestroy(): void {
  }

  onSelectionClick(e: MouseEvent, item: any) {

  }

  onSelectionChange(e: MatOptionSelectionChange, item: any) {
    console.log(e, item)
  }
}
