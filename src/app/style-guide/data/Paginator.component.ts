import {
  AfterViewInit,
  Component, ElementRef,
  OnDestroy, OnInit,
  QueryList,
  ViewChild,
  ChangeDetectorRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {menuType} from "../style-guide.models";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import * as _ from 'lodash';
/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-paginator',
  templateUrl: './Paginator.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuidePaginatorComponent implements AfterViewInit, OnDestroy, OnInit {
  params = {
    size: 10,
    page: 1,
  }

  menus: Array<menuType> = [
    {
      title: 'Basic',
      desc: '기본 페이지네이션  <code class="language-plaintext highlighter-rouge">&lt;pagination&gt;&lt;/pagination&gt;</code>',
      anchor: 'basic'
    },
    {
      title: 'Alignment',
      desc: '테이블 Alignment',
      anchor: 'alignment'
    },
    {
      title: 'Table Pagination',
      desc: '테이블 사용 시 페이지네이션',
      anchor: 'table'
    }
  ];

  contentArray = new Array(90).fill('');
  returnedArray?: Array<{id: number; content: string; }>;
  currentPage = 1;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.contentArray = this.contentArray.map((v: string, i: number) => ({
      id: i+1,
      content: `Content line ${i + 1}`})
    );
    this.returnedArray = this.contentArray.slice(0, this.params.size);
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }

  pageChanged({page, itemsPerPage}: PageChangedEvent): void {
    const startItem = (page - 1) *itemsPerPage;
    const endItem = page * itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  changeParam(size: number){
     this.params.size = size;
  }
}
