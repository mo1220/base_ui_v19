import { Component, Output, ViewEncapsulation, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorDialog } from '../color-dialog/color-dialog';

@Component({
  selector: 'color-input',
  templateUrl: 'color-input.template.html',
  styleUrls: ['color-input.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorInputComponent {
  toggle: boolean[] = [];
  @Input() size = ''; // 'xl' | 'lg' | '' | 'sm' | 'xs'
  @Input() type = 'swatch'; // undefined | 'swatch' | 'sketch' | 'all'
  @Input() disabled: any;
  @Input() noInput: boolean; // input 사용/비사용
  _color: string;
  paddingLeft: any = {
    '': ['32px', '22px'],
    'xl': ['48px', '38px'],
    'lg' : ['48px', '38px'],
    'sm' : ['28px', '22px'],
    'xs' : ['22px', '14px']
  };
  paddingRight = {
    '': '20px',
    'xl': '',
    'lg' : '',
    'sm' : '',
    'xs' : ''
  };
  @Input()
  get color() {
    return this._color;
  }
  set color(value) {
    this._color = value ? value : '#FFF';
    // this.colorChange.emit(this._color);
  }
  @Output() colorChange: EventEmitter<string> = new EventEmitter();
  popoverShow = false;
  constructor(
    public dialog: MatDialog
  ) { }

  changeColor(e: any) {
    this._color = e.color.hex;
    this.colorChange.emit(this._color);
  }

  setTransparent() {
    this._color = 'transparent';
    this.colorChange.emit(this._color);
  }

  setColorDialog() {
    const dialogRef = this.dialog.open(ColorDialog, {
      width: '450px',
      data: {
        currentColor: this._color
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._color = result;
        this.colorChange.emit(this._color);
      }
    });
  }
}
