import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {menuType} from "../style-guide.models";
import {default_colors} from "../../core/settings/settings.model";
import {ColDef, GridOptions, GridReadyEvent} from "ag-grid-community";

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  id: number;
}

const COUNTRIES: Country[] = [
  {
    id: 1,
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    id: 2,
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548,
  },
  {
    id: 3,
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224,
  },
  {
    id: 4,
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506,
  },
  {
    id: 5,
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
  },
  {
    id: 6,
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800,
  },
  {
    id: 7,
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278,
  },
  {
    id: 8,
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276,
  },
  {
    id: 9,
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
  },
  {
    id: 10,
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354,
  },
  {
    id: 11,
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379,
  },
  {
    id: 12,
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097,
  },
  {
    id: 13,
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  },
];

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-table',
  templateUrl: './table.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideTableComponent implements AfterViewInit, OnDestroy, OnInit {
  menus: Array<menuType> = [
    {
      title: 'Basic',
      desc: '기본 Table  <code class="language-plaintext highlighter-rouge">\n&lt;table class="table table-striped table-bordered"&gt;&lt;/table&gt;\n</code>',
      anchor: 'basic'
    },
    {
      title: 'Ranking Table',
      desc: 'Portal 메인에서 사용하는 Ranking Table   <code class="language-plaintext highlighter-rouge">\n&lt;table class="rank-table"&gt;&lt;/table&gt;\n</code>',
      anchor: 'rank'
    },
    {
      title: 'Notice Table',
      desc: '게시판 Table <code class="language-plaintext highlighter-rouge">\n&lt;table class="board-table"&gt;&lt;/table&gt;\n</code>',
      anchor: 'notice'
    },
    {
      title: 'Ag-grid Table',
      desc: 'Ag-grid default Table <code class="language-plaintext highlighter-rouge">\n&lt;ag-grid-angular class="ag-theme-alpine"&gt;&lt;/ag-grid-angular&gt;\n</code>',
      anchor: 'ag-grid'
    },
    {
      title: 'Ag-grid Border Table',
      desc: 'Ag-grid Border Table  <code class="language-plaintext highlighter-rouge">\n&lt;ag-grid-angular class="ag-theme-alpine ag-grid-border"&gt;&lt;/ag-grid-angular&gt;\n</code>',
      anchor: 'ag-grid-boarder'
    },
  ];
  countries = COUNTRIES;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  thLabel = ['checkbox', 'guide.reg_date', 'guide.subject', 'guide.creator', 'guide.file', 'guide.up_date']; // table th
  colors = default_colors;
  allChecked: boolean = false; // 모두 Check box 상태
  checkMap: any = {};

  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    minWidth: 50,
    suppressMenu: true,
    sortable: false,
    resizable: true,
    flex: 1
  };
  gridOptions:GridOptions;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
    this.gridOptions = <GridOptions>{
      rowHeight: 30,
      headerHeight: 30,
      unSortIcon: true,
      suppressPropertyNamesCheck: true, // ag grid console 제거
      overlayNoRowsTemplate: `<div class="no-data"><div class="no-data-content"><img src="/assets/images/icon/no-data.svg" /><p>${translate.instant('content.no_data')}</p></div></div>`
    };
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        field: 'id',
        headerName: '#'
      },
      {
        field: 'name',
        headerName: '국가 이름'
      },
      {
        field: 'flag',
        headerName: '국기'
      },
      {
        field: 'area',
        headerName: '국가 면적'
      },
      {
        field: 'population',
        headerName: '인구수'
      },
    ]
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
  }

  onClickCheckBoxAll(e: any) {
    console.log(e.target.checked);
    for (let k of this.countries) {
      this.checkMap[k.id] = e.target.checked;
    }
  }

  onGridReady(params: GridReadyEvent){

  }
}
