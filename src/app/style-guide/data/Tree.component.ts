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
      desc: 'Skeleton loading Tree Component',
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
  ];
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        {id: 2, name: 'child1'},
        {id: 3, name: 'child2'}
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        {id: 5, name: 'child2.1'},
        {id: 6, name: 'child2.2', children: [{id: 7, name: 'subsub'}]}
      ]
    }
  ];
  nodes2 = [
    {
      name: 'root1',
      children: [
        {name: 'child1'},
        {name: 'child2'}
      ]
    },
    {
      name: 'root2',
      children: [
        {name: 'child2.1'},
        {
          name: 'child2.2',
          children: [
            {name: 'subsub'}
          ]
        }
      ]
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

  options: ITreeOptions = {
    useCheckbox: true
  };

  @ViewChildren('trees') trees: QueryList<TreeComponent>;

  state: ITreeState;
  selectedNode: any = {}; // 선택 노드

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private msgs: MessagesService,
  ) {
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

  /**
   * @function 선택한 노드 정보 받기
   * @param treeNode
   * @param type
   */
  nodeActiveChanged(treeNode: any, type?: string) {
    const {node} = treeNode;
    if (type !== undefined) {
      this.selectedNode[type] = node.data;
    }
  }

  /**
   * @function 폴더 생성, 수정, 삭제 API 에 필요한 node 정보
   * @param type: 'add' | 'update' | 'delete'
   * @param node: TreeNode
   */
  outputNode({type, node}: any) {
    if (type === 'add') { // 폴더 생성
      // TODO  API 연결
      this.msgs.success({title: '폴더 생성', message: '폴더 생성 성공!'})
    } else if (type === 'update') { // 폴더 수정
      // TODO  API 연결
      this.msgs.success({title: '폴더 수정', message: '폴더 수정 성공!'})
    } else { // 폴더 삭제
      // TODO  API 연결
      this.msgs.success({title: '폴더 삭제', message: '폴더 삭제 성공!'})
    }
  }

  /**
   * @function focus 일 때 tree 보이기
   * @param type: 담당자 타입
   */
  openTree(type: string) {
    if(type ==='owner') {
      this.filterTeamView.owner = true;
    } else {
      this.filterTeamView.it_owner = true;
    }
  }
}
