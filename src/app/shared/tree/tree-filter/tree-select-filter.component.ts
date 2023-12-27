import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ITreeOptions, KEYS, TreeComponent} from "@odymaui/angular-tree-component";


@Component({
  selector: 'tree-select-filter',
  templateUrl: 'tree-select-filter.template.html',
  styleUrls: ['tree-select-filter.style.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TreeSelectFilterComponent implements OnInit, OnChanges, AfterViewInit {
  options: ITreeOptions = {
    // displayField: 'dept_nm', // TODO 변경,
    useVirtualScroll: true,
    nodeHeight: 18,
    // dropSlotHeight: 3,
  };

  treeModel: any;

  @ViewChild('inputElem') inputElem: ElementRef;
  @ViewChild('tree') tree: TreeComponent;
  @ViewChild('treeWrap') treeWrap: ElementRef;

  @Input('labelName') labelName: string;
  @Input() nodes: any;
  @Input() displayField: any;
  @Input() size:string;

  _openState = false;
  // @Input()
  // get openState() {
  //   return this._openState;
  // }
  // set openState(value) {
  //   this._openState = value ? value : false;
  // }
  @Input() openState: boolean = false;
  @Output() openStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  @Input() label: string;
  @Output() labelChange = new EventEmitter<string>();

  ngOnInit(): void {
    // console.log(this.nodes);
    this.options = {
      ...this.options,
      displayField: this.displayField,
    }
  }

  ngAfterViewInit(): void {
    this.treeModel = this.tree.treeModel;
    setTimeout(() => {
      this.treeModel.expandAll();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { openState } = changes;
    if(openState && openState.currentValue) {
      setTimeout(() => {
        this.inputElem.nativeElement.focus();
      }, 1)
    }
  }

  filterTree(e: any) {
    e.stopPropagation();
    const value = e.target.value !== '' ? e.target.value.replace(/\s| /gi, '') : '';
    // const inputElem = type == 'it_owner' ? this.itOwnerElem.nativeElement : this.coopOwnerElem.nativeElement;
    this.treeModel.filterNodes(value); // 입력된 값으로 tree 필터
    const activeNode = this.treeModel.getFocusedNode();

    if (e.key === 'ArrowDown') {   // 아래 화살표
      this.inputElem.nativeElement.blur();
      const rootNodes = this.treeModel.getVisibleRoots(); // 검색된 결과에서 가장 최상위
      this.treeModel.setFocusedNode(rootNodes[0]); // 포커스 주기
      // 다음 노드가 있는지 확인
      if (activeNode && activeNode.findNextNode()) {
        const nextNode = activeNode.findNextNode();
        // 다음 노드를 활성화
        this.treeModel.setFocusedNode(nextNode);
      }
    } else if (e.key === 'ArrowUp') { // 위 화살표
      this.inputElem.nativeElement.blur();
      const rootNodes = this.treeModel.getVisibleRoots(); // 검색된 결과에서 가장 최상위
      this.treeModel.setFocusedNode(rootNodes[0]); // 포커스 주기
      // 이전 노드가 있는지 확인
      if (activeNode && activeNode.findPreviousNode()) {
        const preNode = activeNode.findPreviousNode();
        // 이전 노드를 활성화
        this.treeModel.setFocusedNode(preNode);
      }
    }

    if (e.key === 'Enter') { // 엔터 입력 시 입력 값 주기
      this.openState = false;
      this.openStateChange.emit(this.openState);
      this.value = value;
      this.valueChange.emit(this.value);
    }
  }

  onEvent(e: any) {
    if(e.eventName === 'focus'){
      this.options = {
        ...this.options,
        scrollContainer: this.treeWrap.nativeElement,
        actionMapping: {
          keys: {
            [KEYS.ENTER] : (tree: any, node: any, $event: KeyboardEvent) => {
              // console.log(node)
              this.value = node.data.dept_id;
              this.label = node.data.dept_nm;
              this.valueChange.emit(this.value);
              this.labelChange.emit(this.label);
              this.openState = false;
              this.openStateChange.emit(this.openState);
            }
          }
        }
      }
    }
  }

  selectOwner(node: any) {
    this.openState = false;
    this.openStateChange.emit(this.openState);
    this.label = node.data.dept_nm;
    this.labelChange.emit(this.label);
    this.value = node.data.dept_id;
    this.valueChange.emit(this.value);
  }
}
