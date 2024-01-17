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
import {ColDef, ColGroupDef, GridOptions, GridReadyEvent} from "ag-grid-community";
import {TableVirtualScrollDataSource} from "ng-table-virtual-scroll";
import {MatTable} from "@angular/material/table";
import {CellLoadingComponent} from "../../shared/ag-grid/cell-loading/cell-loading.component";
import {ButtonRenderComponent} from "../../shared/ag-grid/button-render.component";
import {ChipRenderComponent} from "../../shared/ag-grid/chip-render.component";
import * as moment from "moment/moment";
import * as numeral from "numeral";

interface Country {
    name: string;
    flag: string;
    area: number;
    population: number;
    id: number;
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
];

export const ListData:any = [
    {
        id: 1,
        name: 'Russia',
        population: 146989754,
        update_date: '2023-12-13T15:36:23',
        keyword:['key1','key2','key3']
    },
    {
        id: 2,
        name: 'France',
        population: 64979548,
        update_date: '2023-12-13T15:36:23',
        keyword:['key1','key2','key3']
    },
    {
        id: 3,
        name: 'Germany',
        population: 82114224,
        update_date: '2023-12-13T15:36:23',
        keyword:['key1','key2','key3']
    },
    {
        id: 4,
        name: 'Portugal',
        population: 10329506,
        update_date: '2023-12-13T15:36:23',
        keyword:['key1','key2','key3']
    },
    {
        id: 5,
        name: 'Canada',
        population: 36624199,
        update_date: '2023-12-13T15:36:23',
        keyword:['key1','key2','key3']
    },
    {
        id: 6,
        name: 'Vietnam',
        population: 95540800,
        update_date: '2023-12-13T15:36:23',
        keyword:['key1','key2','key3']
    },
]

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
    selector: 'style-guide-ag-grid',
    templateUrl: './AgGrid.template.html',
    encapsulation: ViewEncapsulation.None
})
export class StyleGuideAgGridComponent implements AfterViewInit, OnDestroy, OnInit {
    loading:boolean = true;
    frameworkComponents = {
        'CellLoadingComponent': CellLoadingComponent,
    };
    frameworkComponents2 = {
        'ButtonRenderComponent': ButtonRenderComponent,
        'ChipRenderComponent': ChipRenderComponent,
    };
    gridApi: any;
    gridApi2: any;

    menus: Array<menuType> = [
        {
            title: 'Basic Ag-grid',
            desc: 'Ag-grid default Table <code class="language-plaintext highlighter-rouge">\n&lt;ag-grid-angular class="ag-theme-alpine"&gt;&lt;/ag-grid-angular&gt;\n</code><br>Ag-grid Border Table  <code class="language-plaintext highlighter-rouge">\n&lt;ag-grid-angular class="ag-theme-alpine ag-grid-border"&gt;&lt;/ag-grid-angular&gt;\n</code>',
            anchor: 'ag-grid'
        },
        {
            title: 'Cell Renderer / ValueFormatter',
            desc: 'DOM에 추가되는 요소가 있는 경우 <span class="highlight-blue">cellRenderer</span>를 사용하지만, 값만 바뀌는 경우 <span class="highlight-blue">valueFormatter</span>를 우선사용 하는것이 적절합니다.',
            anchor: 'render'
        },
        {
            title: 'ColGroupDef',
            desc: '헤더를 그룹화 하고 스타일링 하기',
            anchor: 'col-group'
        },
    ];
    countries = COUNTRIES;
    logdate = ListData;
    @ViewChildren('anchors') anchors: QueryList<ElementRef>;

    columnDefs: ColDef[] = [];
    columnDefs2: ColDef[] = [];
    columnDefs3: (ColDef | ColGroupDef)[] = [];
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
        private router: Router,
    ) {
        this.gridOptions = <GridOptions>{
            rowHeight: 30,
            headerHeight: 30,
            unSortIcon: true,
            suppressPropertyNamesCheck: true, // ag grid console 제거
            overlayNoRowsTemplate: `<div class="no-data"><div class="no-data-content"><img src="/assets/images/icon/no-data.svg" /><p>${translate.instant('content.no_data')}</p></div></div>`
        };
    }

    /** Whether the button toggle group contains the id as an active value. */
    isSticky(id: string) {
        return id === 'position' || id.indexOf('header') > -1;
    }

    ngOnInit(): void {
        this.columnDefs = [
            {
                field: 'id',
                headerName: '#',
                cellRenderer: 'CellLoadingComponent',
                cellRendererParams: { loading: this.loading }
            },
            {
                field: 'name',
                headerName: '국가 이름',
                cellRenderer: 'CellLoadingComponent',
                cellRendererParams: { loading: this.loading }
            },
            {
                field: 'flag',
                headerName: '국기',
                cellRenderer: 'CellLoadingComponent',
                cellRendererParams: { loading: this.loading }
            },
            {
                field: 'area',
                headerName: '국가 면적',
                cellRenderer: 'CellLoadingComponent',
                cellRendererParams: { loading: this.loading }
            },
            {
                field: 'population',
                headerName: '인구수',
                cellRenderer: 'CellLoadingComponent',
                cellRendererParams: { loading: this.loading }
            },
        ];

        this.columnDefs2 = [
            {
                field: 'id',
                headerName: '#',
            },
            {
                field: 'name',
                headerName: '국가 이름',
            },
            {
                field: 'population',
                headerName: 'valueFormatter',
                valueFormatter: (params:any) => {
                    return numeral(params.value).format('0,0')
                },
            },
            {
                field: 'update_date',
                headerName: 'valueFormatter',
                valueFormatter: (params:any) => {
                    return moment(params.value).format('YYYY-MM-DD hh:mm');
                }
            },
            {
                field: 'keyword',
                headerName: 'ChipRenderComponent',
                cellRenderer: 'ChipRenderComponent'
            },
            {
                field: 'keyword',
                headerName: 'valueFormatter',
                valueFormatter: (params:any) => {
                    return params.value.join(' > ');
                }
            },
            {
                field: 'config',
                headerName: 'ButtonRenderComponent',
                flex: 0,
                width: 180,
                cellRenderer: 'ButtonRenderComponent',
                cellRendererParams: {
                    btns: [
                        {
                            icon: 'settings',
                            tooltip: '수정',
                            actionType: 'modify',
                        },
                        {
                            icon: 'delete',
                            tooltip: '삭제',
                            actionType: 'delete',
                        }
                    ],
                    onClick: (d:any) => this.onConfigClick(d)
                }
            },
        ];

        this.columnDefs3 =  [
            {
                headerName: 'Source',
                marryChildren: true,
                children: [
                    {
                        field: 'source.system',
                        headerName: '시스템명',
                    },
                    {
                        field: 'source.schema',
                        headerName: '스키마명',
                    },
                    {
                        field: 'source.table_en',
                        headerName: '테이블명(영문)',
                    },
                    {
                        field: 'source.table_kr',
                        headerName: '테이블명(국문)',
                    },
                    {
                        field: 'source.desc',
                        headerName: '설명',
                    },
                ]
            },
            {
                headerName: 'Target',
                headerClass: 'target_header',
                marryChildren: true,
                children: [
                    {
                        field: 'target.system',
                        headerName: '시스템명',
                    },
                    {
                        field: 'target.schema',
                        headerName: '스키마명',
                    },
                    {
                        field: 'target.table_en',
                        headerName: '테이블명(영문)',
                    },
                ]
            },
        ];
    }

    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    ngOnDestroy(): void {
    }

    onConfigClick(d:any) {
        console.log(d);
    }

    /**
     * @function setColumnDefs: columnDef 재설정
     */
    setColumnDefs(){
        this.loading = !this.loading;
        let newCol = this.columnDefs.map((col:any) => {
            col = {
                ...col,
                cellRendererParams: {
                    loading: this.loading
                }
            };
            return col;
        });
        this.gridApi?.setColumnDefs(newCol);
        // this.gridApi2?.setColumnDefs(newCol);
    }

    onGridReady(params: GridReadyEvent){
        this.gridApi = params.api;
    }
    onGridReady2(params: GridReadyEvent){
        this.gridApi2 = params.api;
    }
}

