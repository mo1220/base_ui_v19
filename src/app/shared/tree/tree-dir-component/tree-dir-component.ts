import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from "@angular/core";
import {ITreeOptions, TreeComponent, TreeModel, TreeNode} from "@odymaui/angular-tree-component";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {TreeNodeType} from "./tree-dir-model";
import {PopupMessage} from "../../popup-message/popup-message";
import {MatDialog} from "@angular/material/dialog";
import * as _ from 'lodash';
import {MessagesService} from "../../../core/toast-message/messages.service";

@Component({
  selector: 'tree-dir-component-app',
  templateUrl: 'tree-component.template.html',
  styleUrls: ['tree-component.styles.scss'],
  host: { class:'page-tree-filter-content tree-filter-box' },
  encapsulation: ViewEncapsulation.None
})

export class TreeDirComponent implements OnInit, OnDestroy, AfterViewInit {
  options: ITreeOptions;
  state: any = {};
  nodeActiveId: any;
  selectNodeIds = []; // 선택한 Node + 하위 id 전부 포함
  editMode: boolean = false;
  lang: string;

  @ViewChild('tree') tree: TreeComponent;
  @ViewChildren('categoriesElem') categoriesElem: QueryList<any>

  @Output() nodeActiveChanged: EventEmitter<any> = new EventEmitter(); // 노드 클릭 시 해당 정보 보내기
  @Output() outputNodeAPI: EventEmitter<any> = new EventEmitter(); // 수정, 생성, 삭제 API 에 필요한 파라미터 보내기
  @Output() treeElements: EventEmitter<any> = new EventEmitter(); // Tree Element

  // undefined: 추가|삭제|수정 등 관리 기능 | 'select': 선택 기능
  @Input() mode: string | undefined;
  @Input() iconUsed: boolean;
  @Input() displayField: any;
  @Input() expandUsed: boolean = false;

  // @Input() viewType: string;  // View Type(ex. 추천 | 관심)
  @Input() size: string = '';  // tree size ( lg. sm xs )
  @Input() dragoverId: any; // dragover 시 tree node id

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
    public dialog: MatDialog,
    private msgs: MessagesService
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    })
  }

  ngOnInit(): void {
    this.nodeActiveId = null;
    this.dragoverId = null;
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
              this.nodeActiveId = node.data._id;
              this.nodeActiveChanged.emit({node});
              this.dragoverId = null;
            },
            drop: (tree: TreeModel, node: TreeNode, e: any, {from, to}: any) => {
              const targetParentId = to.parent.data._id;
              // 전체 밖에 위치로 이동한 경우 무시
              if (to.parent.data.virtual) return;
              if (from instanceof TreeNode) { // 폴더 내 이동
                if (to.dropOnNode) {
                  // 같은 디렉토리 일 때
                  if (from.data.id == to.parent.data.id || from.parent.data.id == to.parent.data.id) return;
                  if (!to.parent.data.children) to.parent.data.children = [];
                  to.parent.data.children.push(from.data);
                  const before = from.parent.data.children.filter((n: any) => n._id !== from.data._id);
                  from.parent.data.children = [...before];
                  // // 노드 사이의 슬롯에다가 드래그 한 경우
                  // // 원래와 같은 위치로 드래그한 경우 무시
                  if (from.data.parentId == targetParentId && (to.index == from.index || to.index == from.index + 1)) return;
                  // TODO API 연결
                  this.outputNodeAPI.emit({type: 'update', node});
                  this.tree.treeModel.update();
                  return;
                }
              } else { // 데이터 -> 폴더 이동
                // if (from.rowData) { // 카드형 데이터 이동
                if (!to.dropOnNode) return;
                this.nodeActiveChanged.emit({node, from});
                this.outputNodeAPI.emit({type: 'move', node});
              }
              this.dragoverId = '';
            },
          }
        }
      };


    }
    // 노드 펼치기/접기
    if (e.eventName === 'toggleExpanded') {
      this.treeElements.emit(this.categoriesElem);
    }
  }

  ngOnDestroy(): void {
  }


  expandAll() {
    this.tree.treeModel.expandAll();
  }

  collapseAll() {
    this.tree.treeModel.collapseAll();
  }

  /**
   * @function Update / Add children API
   * @param node: add | update 할 node data
   */
  updateNode(node: any) {
    this.editMode = false;
    node.isEdit = false;
    if (node.data._id === '') { // 생성
      this.outputNodeAPI.emit({type: 'add', node});
    } else { //수정
      this.outputNodeAPI.emit({type: 'update', node});
    }
  }

  treeDragEnter(e: DragEvent, node: any) {
    this.dragoverId = node.data._id;
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

  /**
   * @function 폴더 추가
   * @param e: mouse evnet
   * @param node: node data
   */
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
      const no = this.tree.treeModel.getNodeById(node._id);
      if (no.isExpanded === undefined || !no.isExpanded) {
        no.expand();
      }
      const lastChild = no.data.children[no.data.children.length - 1];
      let child = this.tree.treeModel.getNodeById(lastChild._id);
      child.isEdit = true;
      child.focus();
      this.tree.treeModel.setFocus(this.state.activeNodeIds[0]);
    }, 10);

    setTimeout(() => {
      //element 생성 후(timeout 100ms) 현재 수정중인 node에 focus
      const ele = document.getElementById('tree_input_'); // 아직 _id가 없어 tree_input_까지만
      ele?.focus();
    }, 100);
  }

  /**
   * @function 삭제 confirm dialog
   * @param e
   * @param node
   */
  deleteMsg(e: MouseEvent, node: any) {
    // console.log(node)
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
        // console.log(node);
        this.outputNodeAPI.emit({type: 'delete', node});
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
