import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation} from "@angular/core";
import {menuType} from "../style-guide.models";
import {GRIDSTER_CONFIG_INIT, gridsterOp, originDashboard} from "./gridster.model";
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
  dashboard: Array<GridsterItem> = [...originDashboard];

  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
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
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

  emptyCellClick(event: MouseEvent, item: GridsterItem): void {
    console.info('empty cell click', event, item);
    this.dashboard.push(item);
  }

  dragStartHandler(e: DragEvent){
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', 'Drag Me Button');
      e.dataTransfer.dropEffect = 'copy';
    }
  }

}
