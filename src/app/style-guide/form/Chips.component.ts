import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, HostListener, inject,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {menuType} from "../style-guide.models";
import {FormControl} from "@angular/forms";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-chips',
  templateUrl: './Chips.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideChipsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  chipsMenu: Array<menuType> = [
    {
      title: 'Basic',
      anchor: 'basic',
    },
    {
      title: 'Size',
      anchor: 'size',
    },
    {
      title: 'Editable',
      anchor: 'editable',
    },
    {
      title: 'Dragable',
      anchor: 'drag',
    },
    {
      title: 'Rounded',
      anchor: 'round',
    }
  ];

  chipList = [
    // {name: 'Default', color: ''},
    {name: 'Primary', value: 'primary'},
    {name: 'Success', value: 'success'},
    {name: 'Info', value: 'info'},
    {name: 'Warning', value: 'warning'},
    {name: 'Danger', value: 'danger'},
  ];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  sizeList = [ // 사이즈별 반복용
    {
      label: 'Xsmall',
      class: 'xs',
    },
    {
      label: 'Small',
      class: 'sm',
    },
    {
      label: 'Base',
      class: 'base',
    },
    {
      label: 'Large',
      class: 'lg',
    },
  ]

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {

  }

  ngOnInit() : void {

  }

  removeChip(chip: any) {
    const index = this.chipList.indexOf(chip);
    if (index >= 0) {
      this.chipList.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<Array<any>>) {
    moveItemInArray(this.chipList, event.previousIndex, event.currentIndex);
  }

  add(event: MatChipInputEvent): void {
    const value = {
      name: event.value.trim(),
      value: event.value.trim()
    };

    // Add our keyword
    if (value.name) {
      this.chipList.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  edit(chip:any, event: MatChipEditedEvent) {
    const value = {
      name: event.value.trim(),
      value: event.value.trim()
    };

    if (!value.name) { // 입력한 것을 지우고 수정 시 칩 삭제
      this.removeChip(chip);
      return;
    }else { // 입력사항이 있을 경우 해당 칩을 찾아서 수정
      const index = this.chipList.indexOf(chip);
      if (index >= 0) {
        this.chipList[index] = value;
      }
    }
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }

}
