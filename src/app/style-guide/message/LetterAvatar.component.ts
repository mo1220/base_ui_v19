import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {menuType} from "../style-guide.models";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-letter-avatar',
  templateUrl: './LetterAvatar.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideLetterAvatarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  LetterAvatarMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Size',
      anchor: 'size',
    },
    {
      title: 'Radius',
      anchor: 'radius',
    },
    {
      title: 'Circle Border Style',
      anchor: 'circle',
    },
  ];

  avatar: any[] = ['금','은','동','기술','자원','업무','혁신','외부','보고','기타'];
  sizes: any[] = [18,25,30,40,50,60,70,80,90,100];
  _radius: any[] = [5, 10, 15, 20, 25, 30, 32, 35, 40, 44, 46]

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
    let arr = []
    for(let i = 1; i <=100 ; i++) {
      arr.push(i);
    }
    console.log(arr);
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
