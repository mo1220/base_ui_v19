import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {ITreeOptions, TreeComponent, TreeModel, TreeNode} from "@odymaui/angular-tree-component";

@Component({
  selector: 'tree-dir-component-app',
  templateUrl: 'tree-component.template.html',
  styleUrls: ['tree-component.styles.scss']
})

export class TreeDirComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('tree') tree: TreeComponent;
  @Output() nodeActiveChanged: EventEmitter<any> = new EventEmitter(); // 노드 클릭 시 해당 위젯 정보 보내기
  @Output() outputNode: EventEmitter<any> = new EventEmitter(); // 노드 output
  options: ITreeOptions;
  treeTimeId: any;
  @Input() mode: string | undefined // default: 추가|삭제|수정 등 관리 기능 | 'select': 선택 기능
  @Input() loading: boolean | undefined // loading 상태

  state: boolean;

  // options: any;
  nodeActiveId: number;
  _nodes:Array<any>; // 트리 노드

  @Input()
  get nodes(){
    return this._nodes
  }
  set nodes(value){
    this._nodes = value ?  value : [];
    // console.log(this.nodes, value)
  }


  ngOnInit(): void {
    this.treeTimeId = null;
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
        allowDrag: false,
        allowDrop: false,
        actionMapping: {
          mouse: {
            click: (tree: TreeModel, node: TreeNode, $event: any) => {
              this.nodeActiveId = node.data.id;
              this.nodeActiveChanged.emit({ node });
            }
          }
        }
      };
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.treeTimeId);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const { nodes } = changes;
  //   clearTimeout(this.treeTimeId);
  //   if(nodes.currentValue && nodes.currentValue.length > 0 && !this.loading) {
  //     this.treeTimeId = setTimeout(() => {
  //       this.tree.treeModel.expandAll();
  //     }, 1);
  //   }
  // }

  dragOverId: any;
  editMode: boolean = false;

  /**
   * @function 이벤트 output emit
   */
  // outputFunction(e, node, type){
    // if(type === 'dbclick'){
    //   this.outputNode.emit({event: e, type, node})
    // } else if(type === 'add'){
    //   this.outputNode.emit({event: e, type, node})
    // }
    // this.outputNode.emit({event: e, type, node})
  // }

  updateNode(node: any) {

  }

  treeDropDragOver($event: DragEvent) {

  }

  addChildren($event: MouseEvent, node: any) {

  }

  deleteMsg($event: MouseEvent, node: any) {

  }

  editName($event: MouseEvent, node: any) {

  }
}
