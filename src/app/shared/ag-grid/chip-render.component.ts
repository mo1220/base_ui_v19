import { ILoadingCellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";

@Component({
  selector: 'app-format-cell-renderer',
  template: `
    <div class="h-100 d-flex align-center gap-1 overflow-hidden" *ngIf="formattingValue">
      <span class="cell-chip" *ngFor="let item of formattingValue" [title]="item">
        {{item}}
      </span>
    </div>
    {{formattingValue}}
  `,
  styles: [`
   `]
})

/**
 * @CellRenderer 타입별 포맷 변경
 * */
export class ChipRenderComponent implements ILoadingCellRendererAngularComp {
  public params:any; // type: 'number' | 'date' | 'array'
  formattingValue:any;

  agInit(params:any): void {
    this.params = params;
    const encodedStr = (value:any) => {  // 내용에 tag가 들어갔을 경우 인코딩
      return value.replace(/[\u00A0-\u9999<>\&]/g, function (i:string) {
        return '&#' + i.charCodeAt(0) + ';';
      });
    };
    this.formattingValue = params.value.map((d:any) => { return encodedStr(d) });

  }
}
