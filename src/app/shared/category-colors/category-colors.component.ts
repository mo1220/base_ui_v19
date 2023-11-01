import {
  Component,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  Input,
  ViewContainerRef,
} from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ColorDialog } from '../color-dialog/color-dialog';

@Component({
  selector: 'category-colors',
  templateUrl: 'category-colors.template.html',
  styleUrls: ['category-colors.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryColorsComponent implements OnInit {
  _colors: string[] = [];
  _colors2: string[] = [];
  toggle: boolean[] = [];
  cnt = 0;
  active = -1;
  popoverShow = false;
  @Input() type:string;
  @Output() colorsChange: EventEmitter<string[]> = new EventEmitter();
  @Input() // colors: string[] = [];
  get colors() {
    return this._colors;
  }
  set colors(value) {
    this._colors = value ? value : [];
    this.cnt++;
    if(!_.isEqual(this._colors2, this._colors)) {
      this._colors2 = [ ..._.cloneDeep(this._colors) ];
    }
    this.colorsChange.emit(this._colors);
    this.toggle = this._colors.map(d => false);
  }

  @Output() changeColors: EventEmitter<string[]> = new EventEmitter();

  // test = '#FF0000';
  colorSubject$: Subject<string> = new Subject<string>();

  constructor(
    public vcRef: ViewContainerRef,
    public dialog: MatDialog
  ) {

    this.colorSubject$
      .pipe(
        debounceTime(300)
      )
      .subscribe(res => {
       // console.log(res, this._colors2);
        this.changeColors.emit(this._colors2);
      });
  }

  ngOnInit(): void {

  }

  changeColor(e: any) {
    if(this.active === -1) {
      this._colors.push(e.color.hex);
    } else {
      this._colors[this.active] = e.color.hex;
    }
    this.changeColors.emit(this._colors);
    this.active = -1;
  }

  setColorDialog() {
    const dialogRef = this.dialog.open(ColorDialog, {
      width: '450px',
      data: {
        currentColor: this.active === -1 ? '#FFFFFF' : this._colors[this.active]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(this.active === -1) {
          this._colors.push(result);
        } else {
          this._colors[this.active] = result;
          this.active = -1;
        }
        this.changeColors.emit(this._colors);
      }
    });
  }

  removeColor(i: number) {
    this.colors.splice(i, 1);
    this.toggle.splice(i, 1);
    this.changeColors.emit(this._colors);
  }
}
