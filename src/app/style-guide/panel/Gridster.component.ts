import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation} from "@angular/core";
import {menuType} from "../style-guide.models";
import {DASHBOARD_ICON, GRIDSTER_CONFIG_INIT, gridsterOp, originDashboard} from "./gridster.model";
import {ApiService} from "../../core/service/commons";
import {GridsterItem} from "angular-gridster2";

/**
 * @class StyleGuideGridsterComponent *
 * */
@Component({
  selector: 'style-guide-gridster',
  templateUrl: './Gridster.template.html',
  encapsulation: ViewEncapsulation.None
})

export class StyleGuideGridsterComponent implements OnInit, AfterViewInit{
  menus: Array<menuType> = [
    {
      title: 'Basic Gridster',
      desc: 'Angular-gridster Option 정리',
      anchor: 'basic'
    },
  ];

  @ViewChildren('anchors') anchors: any;
  options = GRIDSTER_CONFIG_INIT;

  op_desc = gridsterOp;
  _originDashboard = originDashboard;
  dashboard: Array<GridsterItem> = [...originDashboard];
  dashboardIcon: any = {...DASHBOARD_ICON};
  modified: boolean = false;
  gridTypeOptions: any = [
    {label: '화면맞춤', value: 'fit'},
    {label: '세로스크롤', value: 'scrollVertical'},
    {label: '가로스크롤', value: 'scrollHorizontal'},
    {label: '크기고정', value: 'fixed'},
    {label: '세로고정', value: 'verticalFixed'},
    {label: '가로고정', value: 'horizontalFixed'}
  ];
  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.options = {
      ...this.options,
      emptyCellClickCallback: this.emptyCellClick.bind(this), // cell Click
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50
    };
  }

  ngAfterViewInit(): void {
  }

  removeItem($event: MouseEvent | TouchEvent, item: GridsterItem): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  changedOptions(){
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  addItem(){
    this.dashboard.push({ x: 0, y: 0, cols: 5, rows: 5 });
  }

  emptyCellClick(event: MouseEvent, item: GridsterItem): void {
    console.info('empty cell click', event, item);
    const { enableEmptyCellClick, enableEmptyCellContextMenu, enableEmptyCellDrop, enableEmptyCellDrag } = this.options;
    if (event.type === 'drop' && enableEmptyCellDrop) {
      this.addItem();
    } else if(event.type === 'mouseup') {
      if(enableEmptyCellClick) this.addItem();
      else if(enableEmptyCellDrag) this.addItem();
    } else if(event.type === 'contextmenu' && enableEmptyCellContextMenu){
      this.addItem();
    }
  }

  dragStartHandler(e: DragEvent){
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', 'Drag Me Button');
      e.dataTransfer.dropEffect = 'copy';
    }
  }

}
