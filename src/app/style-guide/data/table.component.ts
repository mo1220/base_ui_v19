import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnDestroy, OnInit,
  QueryList, Renderer2, ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {menuType} from "../style-guide.models";
import {default_colors} from "../../core/settings/settings.model";
import {ColDef, GridOptions, GridReadyEvent} from "ag-grid-community";
import {TableVirtualScrollDataSource} from "ng-table-virtual-scroll";
import {MatTable} from "@angular/material/table";
import {CellLoadingComponent} from "../../shared/ag-grid/cell-loading/cell-loading.component";

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
  id: number;
}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  filler?: number;
}

export const COUNTRIES: Country[] = [
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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',   filler: 20,},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',   filler: 20,},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',   filler: 20,},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',   filler: 20,},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',   filler: 20,},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',   filler: 20,},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',  filler: 20,},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',  filler: 20,},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',  filler: 20,},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',  filler: 20,},
];

const DATA = Array.from({length: 10000}, (v, i) => ({
  position: i+1,
  name: ELEMENT_DATA[(i%10)].name,
  weight: ELEMENT_DATA[((i%10))].weight,
  symbol: ELEMENT_DATA[((i%10))].symbol,
  filler: ELEMENT_DATA[((i%10))].filler,
}));

const DATA2 = Array.from({length: 10000}, (v, i) => ({
  position: i+1,
  name: ELEMENT_DATA[(i%10)].name,
  weight: ELEMENT_DATA[((i%10))].weight,
  symbol: ELEMENT_DATA[((i%10))].symbol,
  filler: ELEMENT_DATA[((i%10))].filler,
}));


/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-table',
  templateUrl: './table.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideTableComponent implements AfterViewInit, OnDestroy, OnInit {
  loading:boolean = true;

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
      title: 'Analysis Table',
      desc: 'Analysis Table\n <code class="language-plaintext highlighter-rouge">Material Table & cdk-virtual-scroll</code>',
      anchor: 'analysis'
    },
    {
      title: 'Analysis Resize Table',
      desc: 'Analysis Table\n <code class="language-plaintext highlighter-rouge">Material Table & cdk-virtual-scroll</code>',
      anchor: 'resize'
    },
  ];
  countries = COUNTRIES;
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  thLabel = ['checkbox', 'guide.reg_date', 'guide.subject', 'guide.creator', 'guide.file', 'guide.up_date']; // table th
  colors = default_colors;
  allChecked: boolean = false; // 모두 Check box 상태
  checkMap: any = {};


  displayedColumns: string[] = [];
  dataSource = new TableVirtualScrollDataSource(DATA);
  dataSource2 = new TableVirtualScrollDataSource(DATA2);
  tables = [0];
  columns: any[] = [
    { field: 'position', width: 20,},
    { field: 'name', width: 20,},
    {field: 'filler', width: 20},
    { field: 'weight', width: 20,},
    { field: 'symbol', width: 20,}
  ]
  @ViewChild(MatTable, {read: ElementRef} ) private matTableRef: ElementRef;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.displayedColumns.length = 24;
    this.displayedColumns.fill('filler');

    // The first two columns should be position and name; the last two columns: weight, symbol
    this.displayedColumns[0] = 'position';
    this.displayedColumns[1] = 'name';
    this.displayedColumns[22] = 'weight';
    this.displayedColumns[23] = 'symbol';
  }

  /** Whether the button toggle group contains the id as an active value. */
  isSticky(id: string) {
    return id === 'position' || id.indexOf('header') > -1;
  }

  ngOnInit(): void {
    this.columns.forEach(( column: any, index: number) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    console.log(this.displayedColumns)
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  ngOnDestroy(): void {
  }


  onClickCheckBoxAll(e: any) {
    for (let k of this.countries) {
      this.checkMap[k.id] = e.target.checked;
    }
  }


  setTableResize(tableWidth: number){
    let totWidth: number | undefined = 0;
    this.columns.forEach(( column: any) => {
      totWidth += column.width;
    });
    const padding = 5;
    const scale = (tableWidth - padding) / totWidth;
    this.columns.forEach(( column: any) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from( document.getElementsByClassName('mat-column-' + column.field) );
    columnEls.forEach(( el: any ) => {
      el.style.width = column.width + 'px';
    });
  }

  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0].querySelector('tr');
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  private checkResizing(event: any, index: number) {
    const cellData = this.getCellData(index);
    console.log(event)
    if ( ( index === 0 ) || ( Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&  index !== this.columns.length - 1 ) ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  onResizeColumn(e: any, index?: any){
    console.log(e.target.parentElement);
    this.checkResizing(e, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = e.pageX;
    this.startWidth = e.target.parentElement.clientWidth;
    e.preventDefault();
    this.mouseMove(index);
  }

  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if ( dx !== 0 ) {
      const j = ( this.isResizingRight ) ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      if ( newWidth > 50 ) {
        this.columns[index].width = width;
        this.setColumnWidth(this.columns[index]);
        this.columns[j].width = newWidth;
        this.setColumnWidth(this.columns[j]);
      }
    }
  }

  mouseMove(index:number){
    this.resizableMousemove = this.renderer.listen('document', 'mousemove', (event) => {
      console.log(event)
      if (this.pressed && event.buttons ) {
        const dx = (this.isResizingRight) ? (event.pageX - this.startX) : (-event.pageX + this.startX);
        const width = this.startWidth + dx;
        if ( this.currentResizeIndex === index && width > 50 ) {
          this.setColumnWidthChanges(index, width);
        }
      }
    });
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove();
        this.resizableMouseup();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }
}

