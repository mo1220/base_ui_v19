import {
  Component, ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList,
  SimpleChanges, ViewChild, ViewChildren,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import {menuType} from "../style-guide.models";

@Component({
  selector: 'aside-menu-right',
  templateUrl: './aside-menu-right.template.html',
  styleUrls: ['./aside-menu-right.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AsideMenuRightComponent implements OnInit {
  _anchor: QueryList<ElementRef>;
  @Input()
  get anchor() {
    return this._anchor;
  }
  set anchor(value: QueryList<ElementRef>) {
    if(value) this._anchor = value;
  }
  // anchor: QueryList<ElementRef>;

  // @Input()
  // anchor: QueryList<ElementRef>;
  _menu: Array<menuType> = [];
  @Input()
  get menu() {
    return this._menu;
  }
  set menu(value: Array<menuType>) {
    this._menu = value ? value : [];
  }
  scrolling = false;
  activeNum = 0;

  constructor(
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    // this._menu = [...this.menu];
  }

  ngAfterViewInit() : void {
    this.changeDetectorRef.detectChanges();
  }
  ngAfterViewChecked(): void {
  }

  onAnchor(activeIdx: number){
    this.scrolling = true;
    this.activeNum = activeIdx;
    const targetY = this._anchor.get(activeIdx)?.nativeElement?.offsetTop;
    window.scrollTo({left: 0, top: targetY, behavior: 'smooth'});
  }

  contentScroll(scrollTop: number): void{
    if (!this.scrolling) {
      for(let i=0; i<this.menu.length-1; i++){
        const from = this._anchor.get(i)?.nativeElement.offsetTop - 50;
        const to = this._anchor.get(i+1)?.nativeElement.offsetTop - 50;
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

