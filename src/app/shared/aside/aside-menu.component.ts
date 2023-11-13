import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'aside-menu',
  templateUrl: './aside-menu.template.html',
  styleUrls: ['./aside-menu.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AsideMenuComponent implements OnInit {

  @Input() items:any = [];
  @Input() bindLabel:string = '';
  @Input() bindValue:string = '';
  @Input() currentUrls:any = [];
  @Input() activeIndex: number[] = [];
  @Output() search: EventEmitter<any> = new EventEmitter();

  val: string = '';
  @Input()
  get value () : string {
    return this.val;
  }
  set value (value) {
    this.val = value;
  }

  @Output() valueChange : EventEmitter<string> = new EventEmitter();
  selectItem:any;
  active:boolean = false;

  label:string = '';
  constructor() {}

  ngOnInit() {
    this.bindLabel = this.bindLabel ? this.bindLabel : 'name';
    this.label = this.selectItem ? this.selectItem[this.bindLabel] : '';
  }

  valueChanged (e: any) {
    this.val = e;
    this.valueChange.emit(this.value);
  }

  selectedEvent(e: any) {
    this.valueChanged(e);
  }
}

@Component({
  selector: 'aside-menu-item',
  templateUrl: './aside-menu-item.template.html',
  styleUrls: ['./aside-menu.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AsideMenuItemComponent implements OnInit, OnChanges {
  @Input() depth: number = 0;
  _items: any = [];
  @Input()
  get items(): any {
    return this._items;
  }
  set items(value:any) {
    this._items = value.map((d:any, i:number) => {
      return {

      }
    });
  }
  @Input() bindLabel:string = '';
  @Input() bindValue:string = '';
  @Input() root:boolean | any = false;
  @Output() selected:EventEmitter<any> = new EventEmitter();
  @Input() selectItem:any;
  @Input() parentIndex:number;
  @Input() activeIndex: number[] = [];
  @Input() currentIndex:number[] = [];
  currentUrl = '';
  _currentUrls: any = [];
  @Input()
  get currentUrls() : string {
    return this._currentUrls;
  }
  set currentUrls(value) {
    this._currentUrls = value;
    const url = _.cloneDeep(this._currentUrls);
    url.shift();
    this.currentUrl = '/' + url.join('/');
  }
  label:string = '';
  value:string = '';
  constructor(private translate: TranslateService) { }
  ngOnInit() {
    this.label = this.bindLabel;
    this.value = this.bindValue;
  }
  ngOnChanges(changes: SimpleChanges | any) {

  }
  selectValue(e: any, i: number) {
    this.activeIndex[this.depth] = i;
    if(e.children && e.children.length > 0) {
      this.activeIndex = this.activeIndex.map((d, i) => {
        return i > this.depth ? -1 : d;
      });
    } else {
      this.selected.emit(e);
    }
  }
  getIndex(i:number) {
    return [ ...this.currentIndex, i ];
  }

  compairIndex(i: number) {
    const activeIndex = _.clone(this.activeIndex);
    return _.isEqual(this.getIndex(i), activeIndex.slice(0, this.depth + 1));
  }
  selectedEmit(e: any) {
    this.selected.emit(e);
  }
}
