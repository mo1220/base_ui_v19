import {
  AfterViewInit,
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
  ]
  basicChips = [{name:'chip1', color: 'default'}];
  chipList = [
    // {name: 'Default', color: ''},
    {name: 'Primary', color: 'primary'},
    {name: 'Success', color: 'success'},
    {name: 'Info', color: 'info'},
    {name: 'Warning', color: 'warning'},
    {name: 'Danger', color: 'danger'},
  ];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  removeChip(chip: any) {
    const index = this.chipList.indexOf(chip);
    if (index >= 0) {
      this.chipList.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<Array<any>>) {
    moveItemInArray(this.chipList, event.previousIndex, event.currentIndex);
  }

  add(event: MatChipInputEvent, type?: string): void {
    console.log(event);
    if(type && type === 'basic') {
      const value = { name: (event.value || '').trim(), color: (event.value || '').trim() };
      if (value) {
        this.basicChips.push(value);
        // Clear the input value
        event.chipInput!.clear();
      }
      return;
    }

    const value = { name: (event.value || '').trim(), color: (event.value || '').trim() };

    // Add our keyword
    if (value) {
      this.chipList.push(value);
    }
    console.log(this.chipList)

    // Clear the input value
    event.chipInput!.clear();
  }

  edit(chip:any, event: MatChipEditedEvent) {
    const value = { ...chip, name: event.value.trim() };

    if (!value) {
      this.removeChip(chip);
      return;
    }
    // Edit existing fruit
    const index = this.chipList.indexOf(chip);
    if (index >= 0) {
      this.chipList[index] = value;
    }
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

}
