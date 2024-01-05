import { ILoadingCellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";
@Component({
  selector: 'app-loading-cell-renderer',
  template: `
    <ng-container *ngIf="params.loading else viewData">
      <div class="ag-custom-loading-cell" [class.dc_loading]="params.data_catalog">
        <!--ST: children ColumnDefs -->
        <ng-container *ngIf="!params.field else noChildrenCol">
          <ngx-skeleton  width="100%" height="100%"></ngx-skeleton>
        </ng-container>
        <!--END: children ColumnDefs -->

        <!--ST: default ColumnDefs -->
        <ng-template #noChildrenCol>
          <ng-container *ngIf="params.field.indexOf('selected') > -1">
            <ngx-skeleton width="15px" height="15px" backgroundColor="#eee" margin="5px auto 0"></ngx-skeleton>
            <!--<div class="ngx-skeleton-animate" style="background-color: #eee; width: 100%; height: 15px; margin: 5px auto 0;"></div>-->
          </ng-container>
          <ng-container *ngIf="!['selected'].includes(params.field)">
            <ngx-skeleton  width="100%" height="100%"></ngx-skeleton>
          </ng-container>
        </ng-template>
        <!--End: default ColumnDefs -->
      </div>
    </ng-container>

    <ng-template #viewData>
      <!--ST: TODO children ColumnDefs -->
      <ng-container *ngIf="!params.field else defaultCol">
      </ng-container>
      <ng-template #defaultCol>
        <!-- check box -->
        <ng-container *ngIf="!['selected'].includes(params.field)">
          {{ params.data[params.field] ? params.data[params.field]  : params.value }}
        </ng-container>
      </ng-template>
      <!--END: children ColumnDefs -->
    </ng-template>
  `,
  styles: [`
    .dc_loading { padding: 0 !important; }
    .ag-custom-loading-cell{ margin-top: 5px; padding:0 10px; height: 15px;  width: 100%;}
   `]
})

export class CellLoadingComponent implements ILoadingCellRendererAngularComp {
  public params: any; // loading: 로딩 상태, field: field 명

  agInit(params:any): void {
    // console.log(params);
    this.params = params;
  }
}
