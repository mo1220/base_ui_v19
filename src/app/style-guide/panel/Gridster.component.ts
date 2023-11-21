import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from "@angular/core";
import {menuType} from "../style-guide.models";
import {DASHBOARD_ICON, GRIDSTER_CONFIG_INIT, gridsterOp, originDashboard} from "./gridster.model";
import {ApiService} from "../../core/service/commons";
import {GridsterItem} from "angular-gridster2";
import {NotificationService} from "../../core/notifications/notification.service";

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
    private cd: ChangeDetectorRef,
    private api: ApiService,
    public notifi: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.options = {
      ...this.options,
      emptyCellClickCallback: this.emptyCellEvent.bind(this), // cell Click
      emptyCellContextMenuCallback: this.emptyCellEvent.bind(this),
      emptyCellDropCallback: this.emptyCellEvent.bind(this),
      emptyCellDragCallback: this.emptyCellEvent.bind(this),
    };
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
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

  emptyCellEvent(e: any, item: GridsterItem): void {
    console.info(`empty cell ${e.type}`, e.type, e, item);
    e.preventDefault();
    const {enableEmptyCellClick,  enableEmptyCellContextMenu, enableEmptyCellDrop, enableEmptyCellDrag} = this.options;

    if(enableEmptyCellClick && ['click', 'mouseup'].includes(e.type)) this.notifi.success('Empty Cell Click');
    if(enableEmptyCellContextMenu && e.type ==='contextmenu') this.notifi.success('Contextmenu Cell Click');
    if(e.type === 'drop' && enableEmptyCellDrop){
      const data = e.dataTransfer.getData('text');
      item = { ...item, rows: 5, cols: 5, config: JSON.parse(data) };
      this.dashboard.push(item);
    }
    if(e.type === 'mouseup' && enableEmptyCellDrag) {
      if(item.cols === 1 && item.rows === 1) return;
      this.dashboard.push(item);
    }
  }

  dragStartHandler(e: DragEvent, icon: any){
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', JSON.stringify(icon.config));
      e.dataTransfer.dropEffect = 'copy';
    }
  }

}
