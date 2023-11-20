export const DASHBOARD_ICON: any = {
  'cloud': 'cloud',
  'list': 'format_list_numbered',
  'board': 'reorder',
  'bar': 'bar_chart',
  'barH': 'bar_chart',
  'pie': 'incomplete_circle'
}

export interface gridsterOpType {
  name: string;
  key?: string;
  desc: string;
  options?: any
  link: string;
}
export const gridsterOp: Array<gridsterOpType> = [
  {
    name: 'Compact',
    key: 'compactType',
    desc: 'compact items',
    options: ['none', 'compactUp', 'compactLeft', 'compactUp&Left', 'compactLeft&Up', 'compactRight', 'compactUp&Right', 'compactRight&Up',
      'compactDown', 'compactDown&Left', 'compactLeft&Down', 'compactDown&Right', 'compactRight&Down'],
    link: 'https://tiberiuzuld.github.io/angular-gridster2/compact'
  },
  {
    name: 'Display Grid',
    key: 'displayGrid',
    desc: 'Background grid 표시설정',
    options: ['always', 'onDrag&Resize', 'none'] ,
    link: 'https://tiberiuzuld.github.io/angular-gridster2/displayGrid'
  },
  {
    name: 'Drag',
    key: 'draggable',
    desc: 'Grid Item Drag 설정',
    options: {
      draggable: {
        enabled: true,
        delayStart: 100,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: true,
        dragHandleClass: 'drag-handle'
      }
    },
    link: 'https://tiberiuzuld.github.io/angular-gridster2/drag'
  },
  {
    name: 'Empty Cell',
    key: 'empty',
    desc: '빈 Cell 설정',
    link: 'https://tiberiuzuld.github.io/angular-gridster2/emptyCell'
  },
  {
    name: 'Grid Margin',
    key: 'margin',
    desc: 'Margin 설정',
    link: 'https://tiberiuzuld.github.io/angular-gridster2/gridMargins'
  },
  {
    name: 'Grid Type',
    key: 'gridType',
    desc: 'Grid 타입 설정',
    link: 'https://tiberiuzuld.github.io/angular-gridster2/gridMargins'
  }
]
// Gridster Init Options
export const GRIDSTER_CONFIG_INIT: any = {
  compactType: 'none',
  gridType: 'fixed', //'verticalFixed'
  margin: 5,
  outerMargin: true,
  outerMarginTop: 5,
  outerMarginBottom: 5,
  outerMarginLeft: 5,
  outerMarginRight: 5,
  mobileBreakpoint: 640,
  minCols: 3,
  maxCols: 100,
  minRows: 3,
  maxRows: 100,
  maxItemCols: 100,
  minItemCols: 1,
  maxItemRows: 100,
  minItemRows: 1,
  maxItemArea: 2500,
  minItemArea: 1,
  defaultItemCols: 1,
  defaultItemRows: 1,
  fixedColWidth: 50,
  fixedRowHeight: 50,
  keepFixedHeightInMobile: false,
  keepFixedWidthInMobile: false,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: true,
  enableEmptyCellDrag: true,
  emptyCellDragMaxCols: 50,
  emptyCellDragMaxRows: 50,
  enableOccupiedCellDrop: true,
  draggable: {
    enabled: true,
    delayStart: 100,
    ignoreContentClass: 'gridster-item-content',
    ignoreContent: true,
    dragHandleClass: 'drag-handler'
  },
  resizable: {
    enabled: true,
    // stop: DashboardConfigFormComponent.eventStop,
    handles: {
      s: true,
      e: true,
      n: false,
      w: true,
      se: true,
      ne: false,
      sw: false,
      nw: false
    }
  },
  api: {},
  swap: false,
  pushItems: true,
  pushResizeItems: false,
  displayGrid: 'onDrag&Resize', //always
  disableWindowResize: true,
  scrollToNewItems: true,
  disableWarnings: true
}

// 메인 대시보드 widget
export interface MAIN_WIDGET_TYPE {
  title?: string,
  chart?: string,
  widgetType?: string,
  subTitle?: string,
}

// 시각화 widget
export interface WIDGET_TYPE {

}


export interface DASHBOARD_ITEM_TYPE {
  cols: number,
  rows: number,
  y: number,
  x: number,
  minItemCols?: number,
  minItemRows?: number,
  config: any;
  disabled?: boolean
}


// Demo
export const originDashboard: Array<DASHBOARD_ITEM_TYPE> = [
  {
    cols: 12,
    rows: 7,
    y: 0,
    x: 0,
    minItemCols: 4,
    minItemRows: 4,
    config: {title: 'main.wordcloud', chart: 'cloud', widgetType: 'wordcloud'},
    disabled: true
  },
  {
    'cols': 9,
    'rows': 5,
    'y': 0,
    'x': 12,
    'minItemCols': 4,
    'minItemRows': 4,
    'config': {'title': 'main.recommendKeyword','chart':'list', 'widgetType': 'recommendKeyword'},
    'disabled': true
  },
  // {
  //   'cols': 9,
  //   'rows': 5,
  //   'y': 5,
  //   'x': 12,
  //   'minItemCols': 4,
  //   'minItemRows': 4,
  //   'config': {'title': 'main.recommendDataset','chart':'list', 'widgetType': 'recommendDataset'},
  //   'disabled': true
  // },
  {
    'cols': 12,
    'rows': 6,
    'y': 7,
    'x': 0,
    'minItemCols': 5,
    'minItemRows': 4,
    'config': {'title': 'main.sourceSystem', 'chart':'bar', 'widgetType': 'sourceSystem'},
    'disabled': true
  },
  {
    'cols': 12,
    'rows': 5,
    'y': 13,
    'x': 0,
    'minItemCols': 5,
    'config': {'title': 'main.sourceSystemType', 'chart':'barH', 'widgetType': 'sourceSystemType'},
    'disabled': true
  },
  {
    'cols': 9,
    'rows': 8,
    'y': 10,
    'x': 12,
    'minItemCols': 5,
    'minItemRows': 4,
    'config': {'title': 'main.topDataset', 'chart':'pie', 'widgetType': 'topDataset'},
    'disabled': true
  },
  {
    'cols': 11,
    'rows': 5,
    'y': 18,
    'x': 11,
    'minItemCols': 5,
    'minItemRows': 4,
    'config': {'title': 'nav.menu4-5-1', 'chart':'board', 'widgetType': 'extractReqList'},
    'disabled': true
  },
  // {
  //   'cols': 10,
  //   'rows': 5,
  //   'y': 18,
  //   'x': 11,
  //   'minItemCols': 5,
  //   'minItemRows': 4,
  //   'config': {'title': 'nav.menu4-5-2', 'chart':'board', 'widgetType': 'datasetReqList'},
  //   'disabled': true
  // },
  // {
  //
  //   'cols': 11,
  //   'rows': 5,
  //   'y': 23,
  //   'x': 0,
  //   'minItemCols': 5,
  //   'minItemRows': 4,
  //   'config': {'title': 'nav.menu5-1', 'chart':'board', 'widgetType': 'noticeList'},
  //   'disabled': true
  // },
  // {
  //   'cols': 10,
  //   'rows': 5,
  //   'y': 23,
  //   'x': 11,
  //   'minItemCols': 5,
  //   'minItemRows': 4,
  //   'config': {'title': 'nav.menu5-3', 'chart':'board', 'widgetType': 'qnaList'},
  //   'disabled': true
  // },
];
