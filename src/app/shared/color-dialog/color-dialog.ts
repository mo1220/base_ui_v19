import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { COLOR_MAP, GRAY_MAP } from "../category-colors/colors.models";

@Component({
  selector: 'color-dialog',
  templateUrl: './color-dialog.template.html',
  styleUrls: ['./color-dialog.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorDialog implements OnInit {
  color = '';
  active = 0;
  colorMap = _.cloneDeep(COLOR_MAP);
  grayMap = _.cloneDeep(GRAY_MAP);
  activeColor = {
    enabled: false,
    type: 'color',
    position: []
  }
  constructor(
    public dialogRef: MatDialogRef<ColorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.color = _.clone(data.currentColor);
    // 현재 컬러가 맵에 있는지 확인
    this.confirmMapColor();
  }

  ngOnInit(): void {

  }

  onNavChange(e: any) {
    if(e.nextId === 0) {
      this.confirmMapColor();
    }
  }

  confirmMapColor() {
    const ci = _.findIndex(this.colorMap, d => d.color.toLowerCase() === this.color.toLowerCase());
    if(ci !== -1) {
      this.selectColor(this.colorMap[ci], 'color');
    }
    const gi = _.findIndex(this.grayMap, d => d.color.toLowerCase() === this.color.toLowerCase());
    if(gi !== -1) {
      this.selectColor(this.colorMap[gi], 'gray');
    }
    // if(this.color.toLowerCase())
    // console.log(ci, gi);
    if(gi === -1 && ci === -1) {
      this.activeColor = {
        ...this.activeColor,
        enabled: false
      }
    }
  }

  selectColor(d: any, type: any) {
    this.color = d.color;
    const coords = d.coords ? d.coords.split(',') : [];
    this.activeColor = {
      enabled: true,
      type: type,
      // @ts-ignore
      position: d.coords ? [Number(coords[1]), Number(coords[8]) - 1] : []
    }
  }

  changeColor(e: any) {
    this.color = e.color.hex;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.color);
  }
}
