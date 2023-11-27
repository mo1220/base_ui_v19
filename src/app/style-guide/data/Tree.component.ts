import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList, ViewChild,
  ViewChildren,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {menuType} from "../style-guide.models";
import {ITreeOptions, ITreeState, TreeComponent, TreeNode} from "@odymaui/angular-tree-component";
import {NotificationService} from "../../core/notifications/notification.service";
import {MessagesService} from "../../core/toast-message/messages.service";
import {COUNTRIES} from "./table.component";
import {ColDef, GridOptions, GridReadyEvent, RowDropZoneParams} from "ag-grid-community";
import * as _ from 'lodash';

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-tree',
  templateUrl: './Tree.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideTreeComponent implements AfterViewInit, OnDestroy {
  menus: Array<menuType> = [
    {
      title: 'Basic',
      desc: 'basic Tree Component',
      anchor: 'basic'
    },
    {
      title: 'Checkbox Tree',
      desc: 'Checkbox Tree Component',
      anchor: 'checkbox'
    },
    {
      title: 'Icon Tree',
      desc: 'Icon Tree Component',
      anchor: 'icon'
    },
    {
      title: 'skeleton loading Tree',
      desc: 'Skeleton loading Tree Component <code class="language-plaintext highlighter-rouge"> ' +
        '\n&lt;ngx-skeleton&gt;&lt;/ngx-skeleton&gt;</code> 사용',
      anchor: 'loading'
    },
    {
      title: 'Event Tree',
      desc: '폴더 추가/수정/삭제 등 이벤트 관련 Tree Component',
      anchor: 'event'
    },
    {
      title: 'Filter Tree',
      desc: '검색 Tree Component',
      anchor: 'filter'
    },
    {
      title: 'Size Tree',
      desc: 'Size Tree Component  <div class="msg info"> ' +
        '<strong class="color-dark">&lt;tree-dir-component-app&gt; 컴포넌트 사용</strong> <br/> <code>[size]</code> : 사이즈(xs, sm) 입력</div>',
      anchor: 'size'
    },
  ];
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  countries = COUNTRIES
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        {id: 2, name: 'child1-1'},
        {id: 3, name: 'child1-2'}
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        {id: 5, name: 'child2-1'},
        {id: 6, name: 'child2-2', children: [{id: 7, name: 'subsub'}]}
      ]
    }
  ];

  nodes2 = [
    {
      _id: '전체',
      name: '전체',
      children: [
        {
          _id: 'root1',
          name: 'root1',
          children: [
            {name: 'child1', _id: 'ch1'},
            {name: 'child2',  _id: 'ch2'}
          ]
        },
        {
          _id: 'root2',
          name: 'root2',
          children: [
            {name: 'child2.1',  _id: 'ch2.1'},
            {
              _id: 'ch2.2',
              name: 'child2.2',
              children: [
                {name: 'subsub', _id: 'sub'}
              ]
            }
          ]
        }]
    }
  ];

  deptList = [
    {
      "dept_id": "758f6ee4-d7c0-4702-8c8a-fec6a15f88be",
      "up_dept_id": "ROOT",
      "dept_nm": "encore",
      "children": [
        {
          "dept_id": "a054b184-ddf8-4fb1-8f3a-2f741508f04e",
          "up_dept_id": "758f6ee4-d7c0-4702-8c8a-fec6a15f88be",
          "dept_nm": "데이터솔루션센터",
          "children": [
            {
              "dept_id": "bd808868-0aec-41ed-ae90-cf8062e2c31f",
              "up_dept_id": "a054b184-ddf8-4fb1-8f3a-2f741508f04e",
              "dept_nm": "데이터아키텍처팀",
              "children": []
            },
            {
              "dept_id": "05ac4528-1143-4529-a1da-f3be3ebabdd4",
              "up_dept_id": "a054b184-ddf8-4fb1-8f3a-2f741508f04e",
              "dept_nm": "PMO팀",
              "children": []
            },
            {
              "dept_id": "dff5edb2-74e9-4f94-9a65-123e78180bec",
              "up_dept_id": "a054b184-ddf8-4fb1-8f3a-2f741508f04e",
              "dept_nm": "연구원",
              "children": []
            },
            {
              "dept_id": "a24bc971-1f18-4f01-a663-8c3bc279787d",
              "up_dept_id": "a054b184-ddf8-4fb1-8f3a-2f741508f04e",
              "dept_nm": "SDR팀",
              "children": []
            },
            {
              "dept_id": "ae76f848-5158-4511-a637-6fe6751d942b",
              "up_dept_id": "a054b184-ddf8-4fb1-8f3a-2f741508f04e",
              "dept_nm": "BDC팀",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "dept_id": "II",
      "up_dept_id": "ROOT",
      "dept_nm": "기타관련부서",
      "children": [
        {
          "dept_id": "HD",
          "up_dept_id": "II",
          "dept_nm": "기타협력업체",
          "children": []
        },
        {
          "dept_id": "HD2",
          "up_dept_id": "II",
          "dept_nm": "협력업체기타",
          "children": []
        }
      ]
    }
  ]; // 부서 목록
  datasetParams = {
    owner_name: '',
    owner: '',
    it_owner_name: '',
    it_owner: ''
  }
  filterTeamView = {
    owner: false,
    it_owner: false
  }


  loadingContent = Array.from({ length: 7}, (d, i) => (i));

  loading = true;
  loading2 = false;

  options: ITreeOptions = {
    useCheckbox: true
  };

  @ViewChildren('trees') trees: QueryList<TreeComponent>;

  state: ITreeState;
  selectedNode: any = {}; // 선택 노드

  gridOptions:GridOptions;
  defaultColDef: ColDef = {
    minWidth: 50,
    suppressMenu: true,
    sortable: false,
    resizable: true,
    flex: 1
  };
  columnDefs: ColDef[] = [];
  gridApi: any;

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private msgs: MessagesService,
  ) {
    this.gridOptions = <GridOptions>{
      rowHeight: 30,
      headerHeight: 30,
      unSortIcon: true,
      suppressPropertyNamesCheck: true, // ag grid console 제거
    };

    this.columnDefs = [
      // {
      //   field: 'id',
      //   headerName: '#',
      // },
      {
        field: 'name',
        headerName: '국가 이름',
        rowDrag: true
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
    ];
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
    this.trees.forEach(tree => {
      tree.treeModel.expandAll();
    })
  }

  ngOnDestroy(): void {
  }

  onUpdate(e: any) {
    console.log('initiallized', e);
  }

  onDeselect(e: any) {
    console.log('deselect', e);
  }

  onSelect(e: any) {
    console.log('select', e);
  }

  onEvent(e: any) {
  }

  onGridReady(params: GridReadyEvent){
    this.gridApi = params.api;
  }



  /**
   * @function 선택한 노드 정보 받기
   * @param treeNode
   * @param type
   */
  nodeActiveChanged(treeNode: any, type?: string) {
    const { node, from } = treeNode;
    console.log(node, from, treeNode );
    if (type !== undefined) {
      this.selectedNode[type] = node.data;
    }
  }

  /**
   * @function 폴더 생성, 수정, 삭제 API 에 필요한 node 정보
   * @param type: 'add' | 'update' | 'delete'
   * @param node: TreeNode
   */
  outputAPI({type, node}: any) {
    console.log('=======', type, node)
    this.loading2 = true;
    // API 성공 시
    setTimeout(() => {
      this.loading2 = false;
    }, 1000);

    if (type === 'add') { // 폴더 생성
      // TODO  API 연결
      this.msgs.success({title: '폴더 생성', message: '폴더 생성 성공!'})
    } else if (type === 'update') { // 폴더 수정
      // TODO  API 연결
      this.msgs.success({title: '폴더 수정', message: '폴더 수정 성공!'})
    } else if(type === 'delete') { // 폴더 삭제
      // TODO  API 연결
      this.msgs.success({title: '폴더 삭제', message: '폴더 삭제 성공!'})
    } else if(type === 'move') { // rowData 폴더로 이동 시
      // TODO  API 연결
      this.msgs.success({title: '폴더 이동', message: '폴더 이동 성공!'})
    }
  }

  /**
   * @function tree-element 받아 droopZone 생성
   * @param container
   */
  setDropZone(container: any){
    const vm = this;
    setTimeout(() => {
      container.forEach((d: any )=> {
        // ag grid row를 드래그 할수 있는 콘테이너로 등록
        this.addDropZones(d.nativeElement);
      });
    }, 10);
  }

  dragOverId: any; //dragoverId
  /**
   * Drop Zone Container 설정 (데이터를 드래그하여 디렉터리 이동 시 필요)
   * */
  addDropZones(container: any) {
    if(!this.gridApi) {
      setTimeout(() => {
        this.addDropZones(container);
      }, 10);
      return;
    }
    const dropZone: RowDropZoneParams = {
      getContainer: () => {
        return container;
      },
      onDragEnter: (e) => {
        const _id = container.getAttribute('id');
        // 전체, 공유는 제외
        this.dragOverId = ['0'].includes(_id) ? '' : _id;
        console.log(this.dragOverId);
      },
      onDragLeave: (e) => {
        this.dragOverId = '';
      },
      onDragStop: (params) => {
        // TODO DATA ID에 맞게 변경
        const data = params.nodes.map(d => d.data.id);
        // this.moveNode(this.dragOverId, data);
        this.dragOverId = '';
      }
    };
    this.gridApi.removeRowDropZone(dropZone);
    // setTimeout(() => {
      this.gridApi.addRowDropZone(dropZone);
    // }, 1)
  }

  /**
   * @function focus 일 때 tree 보이기
   * @param type: 담당자 타입
   */
  openTree(type: string) {
    if (type === 'owner') {
      this.filterTeamView.owner = true;
    } else {
      this.filterTeamView.it_owner = true;
    }
  }
}
