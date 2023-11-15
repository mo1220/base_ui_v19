import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {ITreeOptions, TreeComponent, TreeModel, TreeNode} from "@odymaui/angular-tree-component";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {TreeNodeType} from "./tree-dir-model";
import {PopupMessage} from "../../popup-message/popup-message";
import {MatDialog} from "@angular/material/dialog";
import * as _ from 'lodash';

@Component({
  selector: 'tree-dir-component-app',
  templateUrl: 'tree-component.template.html',
  styleUrls: ['tree-component.styles.scss']
})

export class TreeDirComponent implements OnInit, OnDestroy, AfterViewInit {
  options: ITreeOptions;
  state: any = {};
  nodeActiveId: number;
  selectNodeIds = []; // 선택한 Node + 하위 id 전부 포함
  dragOverId: any;   // 드래그 id
  editMode: boolean = false;
  lang: string;

  @ViewChild('tree') tree: TreeComponent;

  @Output() nodeActiveChanged: EventEmitter<any> = new EventEmitter(); // 노드 클릭 시 해당 정보 보내기
  @Output() outputNode: EventEmitter<any> = new EventEmitter(); // 수정, 생성, 삭제 API 에 필요한 파라미터 보내기

  @Input() mode: string | undefined; // default: 추가|삭제|수정 등 관리 기능 | 'select': 선택 기능
  @Input() loading: boolean | undefined; // loading 상태
  @Input() viewType: string;  // View Type(ex. 추천 | 관심)

  _nodes: Array<any>; // 트리 노드
  @Input()
  get nodes() {
    return this._nodes
  }

  set nodes(value) {
    this._nodes = value ? value : [];
    // console.log(this.nodes, value)
  }


  constructor(
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    })
  }

  ngOnInit(): void {
    this.nodeActiveId = 0;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tree.treeModel.expandAll();
    }, 10)
  }


  onEvent(e: any): void {
    if (e.eventName === 'initialized') {
      this.options = {
        allowDrag: true,
        allowDrop: true,
        idField: '_id',
        actionMapping: {
          mouse: {
            click: (tree: TreeModel, node: TreeNode, e: any) => {
              this.nodeActiveId = node.data.id;
              this.nodeActiveChanged.emit({node});
            }
          }
        }
      };


    }
  }

  ngOnDestroy(): void {}

  /**
   * @function Update / Addchildren API
   * @param node
   */
  updateNode(node: any) {
    this.editMode = false;
    node.isEdit = false;
    if (node.data._id === '') { // 생성
      this.outputNode.emit({type: 'add', node});
    } else { //수정
      this.outputNode.emit({type: 'update', node});
    }
  }

  treeDropDragOver($event: DragEvent) {

  }

  /**
   *  현재 Node 및 하위 node의 _id 전체 구하기 (배열로 받아야함)
   * */
  // getNodeIds(node): Array<any> {
  //   let nodes = [];
  //   const getIds = (n) => {
  //     _.forEach(n, (v, k) => {
  //       nodes.push(v._id);
  //       if(v.children.length > 0) getIds(v.children);
  //     });
  //   }
  //   getIds(node);
  //   return nodes;
  // }
  //

  addChildren(e: MouseEvent, node: TreeNodeType) {
    e.stopPropagation();
    // this.editMode = true;
    if (!node.children) node.children = [];
    node.children.push({
      _id: '',
      name: '새폴더', // 언어 사용 시 this.lang === 'en' ? 'New Folder' : '새폴더'
      children: [],
      parentId: node._id ? node._id : node.id
    });
    this.tree.treeModel.update();

    setTimeout(() => {
      const no = this.tree.treeModel.getNodeById(node._id ? node._id : node.id);
      if (no.isExpanded === undefined || !no.isExpanded) {
        no.expand();
      }
      const lastChild = no.data.children[no.data.children.length - 1];
      let child = this.tree.treeModel.getNodeById(lastChild._id ? lastChild._id : lastChild.id);
      child.isEdit = true;
      child.focus();
      this.tree.treeModel.setFocus(this.state[this.viewType].activeNodeIds[0]);
    }, 10);

    setTimeout(() => {
      //element 생성 후(timeout 100ms) 현재 수정중인 node에 focus
      const ele = document.getElementById('tree_input_'); // 아직 _id가 없어 tree_input_까지만
      ele?.focus();
    }, 100);
  }

  deleteMsg(e: MouseEvent, node: any) {
    console.log(node)
    // if (node.data._id !== '') {
      const dialogRef = this.dialog.open(PopupMessage, {
        width: '400px',
        data: {
          type: 'warning',
          title: '폴더를 삭제하시겠습니까?',
          txt: '삭제하시면, 폴더안에 있는 데이터도 같이 삭제 됩니다.<br/>그래도 삭제하시겠습니까?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          console.log(node);
          this.outputNode.emit({type: 'delete', node});
          const nd = _.clone(node);
          node.parent.data.children.splice(node.index, 1);
          this.tree.treeModel.update();
        }
      })
    // }
  }

  /**
   * @function 폴더 이름 수정
   * @param e: 마우스 이벤트
   * @param node: 수정할 노드 정보
   */
  editName(e: MouseEvent, node: any) {
    node.isEdit = !node.isEdit;
    this.editMode = node.isEdit;
    if (node.isEdit) {
      setTimeout(() => {
        // element 생성 후(timeout 100ms) 현재 수정중인 node에 focus
        const ele = document.getElementById('tree_input_' + node.data._id);
        ele?.focus();
      }, 100);
    }
  }
}
