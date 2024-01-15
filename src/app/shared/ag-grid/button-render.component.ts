import { ILoadingCellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";

@Component({
  selector: 'app-button-cell-renderer',
  template: `
    <div *ngIf="params.btns" class="cell-buttons h-100 d-flex align-center gap-2">
      <button mat-button class="btn btn-sm btn-secondary" style="margin-top: 1px; padding: 0.3rem;"
              *ngFor="let item of params.btns"
              [matTooltip]="item.tooltip || ''"
              (click)="onClick($event, item.actionType)">
        <mat-icon class="mat-icon md-12"
                  [ngClass]="{'me-1':item.label}">{{item.icon}}</mat-icon>
        <span *ngIf="item.label">{{item.label}}</span>
      </button>
    </div>
  `,
  styles: [`
    /*.cell-buttons .btn .mat-icon{color: #adadad;}*/
   `]
})

/**
 * @CellRenderer button 추가
 * icon : mat-icon (필수)
 * label: 안넣으면 아이콘 버튼으로, 넣으면 라벨 버튼으로 변경
 * tooltip: 옵셔널
 * actionType: 이벤트 구분
 * */
export class ButtonRenderComponent implements ILoadingCellRendererAngularComp {
  public params:any; // icon: mat-icon, label?: 버튼명, field: field 명

  agInit(params:any): void {
    this.params = params;
  }

  onClick(event:any, action:any) {
    const res = {
      ...this.params.data,
      actionType: action
    }
    this.params.onClick(res);
    // handle the rest
  };
}
