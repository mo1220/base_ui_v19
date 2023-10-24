import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// Angular Material
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { OverlayModule } from '@angular/cdk/overlay';

// ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { PipesModule } from './pipes/index'; // Pipe
import { RouterModule } from '@angular/router';
import { AsideMenuComponent, AsideMenuItemComponent } from './aside/aside-menu.component'; // Left Menu

import { ToastrModule } from 'ngx-toastr';
import { LaddaModule } from 'angular2-ladda';

import { PopupMessage } from './popup-message/popup-message';
import { CustomToastComponent } from './toast-message/toast-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    TranslateModule,

    // Angular Material
    DragDropModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    // MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatRippleModule,
    MatRadioModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatBadgeModule,
    MatDialogModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    OverlayModule,

    // ngx-bootstrap
    BsDatepickerModule,
    PopoverModule,
    PaginationModule,
    TimepickerModule,
    TooltipModule,
    TabsModule,
    CollapseModule,
    ButtonsModule,

    PipesModule,
    RouterModule,
    ToastrModule,
    LaddaModule.forRoot({
      style: 'zoom-out',
      spinnerSize: 20,
      spinnerColor: 'white',
      spinnerLines: 36
    }),
  ],
  declarations: [
    AsideMenuComponent, // Left Menu
    AsideMenuItemComponent, // Left Menu Item
    PopupMessage, // Popup Message
    CustomToastComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    DragDropModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectModule,
    // MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatBadgeModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    OverlayModule,

    // ngx-bootstrap
    BsDatepickerModule,
    PopoverModule,
    PaginationModule,
    TimepickerModule,
    TooltipModule,
    TabsModule,
    CollapseModule,
    ButtonsModule,

    PipesModule, // Pipe

    // Shared Component
    AsideMenuComponent,
    AsideMenuItemComponent,
    PopupMessage,
    CustomToastComponent,

    //3rd Party
    LaddaModule,
    ToastrModule,
  ],
  providers: [],
})
export class SharedModule {
  // constructor() {}
}
