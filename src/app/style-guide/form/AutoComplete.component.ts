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
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {menuType} from "../style-guide.models";

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

  keyword: Array<string> = ['',''];
  completeList: Array<string> = ['apple','ace','banana','bulls','cat','city','strong'];
  filteredList: Observable<string[]>;
  control = new FormControl('');
  autoCompleteView: boolean = false;


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

}
