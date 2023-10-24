import {
  Component, ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList,
  SimpleChanges, ViewChild, ViewChildren,
  ViewEncapsulation
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
  @Input() anchor: QueryList<ElementRef>;
  @Input() menu: Array<menuType>;

  scrolling = false;
  activeNum = 0;

  constructor(
    private translate: TranslateService
  ) {

  }

  ngOnInit() {

  }

  onAnchor(activeIdx: number){
    this.scrolling = true;
    this.activeNum = activeIdx;
    const targetY = this.anchor.get(activeIdx)?.nativeElement?.offsetTop;
    window.scrollTo({left: 0, top: targetY, behavior: 'smooth'});
  }

  contentScroll(scrollTop: number): void{
    if (!this.scrolling) {
      for(let i=0; i<this.menu.length-1; i++){
        const from = this.anchor.get(i)?.nativeElement.offsetTop - 50;
        const to = this.anchor.get(i+1)?.nativeElement.offsetTop - 50;
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
