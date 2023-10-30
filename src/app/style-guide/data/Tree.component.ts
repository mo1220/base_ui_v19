import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList, ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {menuType} from "../style-guide.models";
import {ITreeOptions, ITreeState, TreeComponent, TreeNode} from "@odymaui/angular-tree-component";

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
      title: 'skeleton loading Tree',
      desc: '검색 Tree Component',
      anchor: 'filter'
    }
  ];
  @ViewChildren('anchors') anchors: QueryList<ElementRef>;

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];
  options: ITreeOptions = {
    useCheckbox: true
  };

  @ViewChildren('trees') trees: QueryList<TreeComponent>
  state: ITreeState;
  selectedNode: any;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.trees.forEach(tree => {
      tree.treeModel.expandAll();
    })
  }

  ngOnDestroy(): void { }
  onUpdate(e: any){
    console.log('initiallized', e);
  }
  onDeselect(e: any){
    console.log('deselect', e);
  }
  onSelect(e: any){
    console.log('select', e);
  }
  onEvent(e: any){
  }
  nodeActiveChanged(treeNode: any){
    const { node } = treeNode;
    this.selectedNode = node.data;
  }
}
