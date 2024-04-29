import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleGuideComponent } from './component/style-guide.component';
// Infomation
import { StyleGuideInfomationComponent } from './style-guide-infomation/style-guide-infomation.component';
// Button
import { StyleGuideButtonComponent } from './button/button.component';
import { StyleGuideSpeedDialComponent } from './button/SpeedDial.component';
import { StyleGuideSplitButtonComponent } from './button/SplitButton.component';
// Data
import { StyleGuideDataViewComponent } from './data/DataView.component';
import { StyleGuidePaginatorComponent } from './data/Paginator.component';
import { StyleGuideTableComponent } from './data/table.component';
import { StyleGuideTreeComponent } from './data/Tree.component';
// File
import { StyleGuideUploadComponent } from './file/upload.component';
// Form
import { StyleGuideAutoComplateComponent } from './form/AutoComplete.component';
import { StyleGuideCalendarComponent } from './form/Calendar.component';
import { StyleGuideCheckboxComponent } from './form/Checkbox.component';
import { StyleGuideChipsComponent } from './form/Chips.component';
import { StyleGuideColorPickerComponent } from './form/ColorPicker.component';
import { StyleGuideDropdownComponent } from './form/Dropdown.component';
import { StyleGuideEditorComponent } from './form/Editor.component';
import { StyleGuideInputComponent } from './form/Input.component';
import { StyleGuideKnobComponent } from './form/Knob.component';
import { StyleGuideRadioButtonComponent } from './form/RadioButton.component';
import { StyleGuideRatingComponent } from './form/Rating.component';
import { StyleGuideSelectComponent } from './form/Select.component';
import { StyleGuideSliderComponent } from './form/Slider.component';
import { StyleGuideInputMaskComponent } from './form/InputMask.component';
import { StyleGuideInputNumberComponent } from './form/inputNumber.component';
import { StyleGuideKeyFilterComponent } from './form/KeyFilter.component';

// Menu
import { StyleGuideBreadcrumbComponent } from './menu/Breadcrumb.component';
import { StyleGuideContextMenuComponent } from './menu/ContextMenu.component';
import { StyleGuideGnbComponent } from './menu/gnb.component';
import { StyleGuideLnbComponent } from './menu/lnb.component';
import { StyleGuideMenuComponent } from './menu/Menu.component';
import { StyleGuideStepsComponent } from './menu/Steps.component';
import { StyleGuideTabMenuComponent } from './menu/TabMenu.component';
// Message
import { StyleGuideMessagesComponent } from './message/Messages.component';
// Panel
import { StyleGuideAccordionComponent } from './panel/Accordion.component';
import { StyleGuideCardComponent } from './panel/Card.component';
import { StyleGuideDividerComponent } from './panel/Divider.component';
import { StyleGuideSplitterComponent } from './panel/Splitter.component';
// typography
import { StyleGuideTypographyComponent } from './typography/typography.component';
import {StyleGuideGridsterComponent} from "./panel/Gridster.component";
import {StyleGuideLetterAvatarComponent} from "./message/LetterAvatar.component";
import {StyleGuideAgGridComponent} from "./data/AgGrid.component";
import {StyleGuideProgressComponent} from "./data/Progress.component";

const routes: Routes = [
  {
    path: '',
    component: StyleGuideComponent,
    data: { title: 'Style Guide' },
    children: [
      {
        path: 'infomation',
        component: StyleGuideInfomationComponent,
        data: {title: 'Infomation'}
      },
      {
        path: 'typography',
        component: StyleGuideTypographyComponent,
        data: {title: 'Typography'}
      },
      {
        path: 'form/autoComplete',
        component: StyleGuideAutoComplateComponent,
        data: {title: 'Auto Complete'}
      },
      {
        path: 'form/calendar',
        component: StyleGuideCalendarComponent,
        data: {title: 'Calendar'}
      },
      {
        path: 'form/checkbox',
        component: StyleGuideCheckboxComponent,
        data: {title: 'Checkbox'}
      },
      {
        path: 'form/chips',
        component: StyleGuideChipsComponent,
        data: {title: 'Chips'}
      },
      {
        path: 'form/colorPicker',
        component: StyleGuideColorPickerComponent,
        data: {title: 'Color Picker'}
      },
      {
        path: 'form/dropdown',
        component: StyleGuideDropdownComponent,
        data: {title: 'Dropdown'}
      },
      {
        path: 'form/editor',
        component: StyleGuideEditorComponent,
        data: {title: 'Editor'}
      },
      {
        path: 'form/input',
        component: StyleGuideInputComponent,
        data: {title: 'Input'}
      },
      {
        path: 'form/inputMask',
        component: StyleGuideInputMaskComponent,
        data: {title: 'Input Mask'}
      },
      {
        path: 'form/inputNumber',
        component: StyleGuideInputNumberComponent,
        data: {title: 'Input Number'}
      },
      {
        path: 'form/keyFilter',
        component: StyleGuideKeyFilterComponent,
        data: {title: 'Key Filter'}
      },
      {
        path: 'form/knob',
        component: StyleGuideKnobComponent,
        data: {title: 'Knob'}
      },
      {
        path: 'form/select',
        component: StyleGuideSelectComponent,
        data: {title: 'Select'}
      },
      {
        path: 'form/radio',
        component: StyleGuideRadioButtonComponent,
        data: {title: 'Radio'}
      },
      {
        path: 'form/rating',
        component: StyleGuideRatingComponent,
        data: {title: 'Rating'}
      },
      {
        path: 'form/slider',
        component: StyleGuideSliderComponent,
        data: {title: 'Slider'}
      },
      {
        path: 'button/button',
        component: StyleGuideButtonComponent,
        data: {title: 'Button'}
      },
      {
        path: 'button/splitButton',
        component: StyleGuideSplitButtonComponent,
        data: {title: 'Split Button'}
      },
      {
        path: 'button/speedDial',
        component: StyleGuideSpeedDialComponent,
        data: {title: 'Speed Dial'}
      },
      {
        path: 'data/ag-grid',
        component: StyleGuideAgGridComponent,
        data: {title: 'Ag-Grid'}
      },
      {
        path: 'data/table',
        component: StyleGuideTableComponent,
        data: {title: 'Table'}
      },
      {
        path: 'data/paginator',
        component: StyleGuidePaginatorComponent,
        data: {title: 'Paginator'}
      },
      {
        path: 'data/tree',
        component: StyleGuideTreeComponent,
        data: {title: 'Tree'}
      },
      {
        path: 'data/progress',
        component: StyleGuideProgressComponent,
        data: {title: 'Progress'}
      },
      {
        path: 'panel/accordion',
        component: StyleGuideAccordionComponent,
        data: {title: 'Accordion'}
      },
      {
        path: 'panel/card',
        component: StyleGuideCardComponent,
        data: {title: 'Card'}
      },
      {
        path: 'panel/divider',
        component: StyleGuideDividerComponent,
        data: {title: 'Divider'}
      },
      {
        path: 'panel/splitter',
        component: StyleGuideSplitterComponent,
        data: {title: 'Splitter'}
      },
      {
        path: 'panel/gridster',
        component: StyleGuideGridsterComponent,
        data: {title: 'Gridster'}
      },
      {
        path: 'file/upload',
        component: StyleGuideUploadComponent,
        data: {title: 'File Upload'}
      },
      {
        path: 'menu/breadcrumb',
        component: StyleGuideBreadcrumbComponent,
        data: {title: 'Breadcrumb'}
      },
      {
        path: 'menu/contextMenu',
        component: StyleGuideContextMenuComponent,
        data: {title: 'ContextMenu'}
      },
      {
        path: 'menu/gnb',
        component: StyleGuideGnbComponent,
        data: {title: 'Global Navigation'}
      },
      {
        path: 'menu/lnb',
        component: StyleGuideLnbComponent,
        data: {title: 'Local Navigation'}
      },
      {
        path: 'menu/menu',
        component: StyleGuideMenuComponent,
        data: {title: 'Menu'}
      },
      {
        path: 'menu/steps',
        component: StyleGuideStepsComponent,
        data: {title: 'Breadcrumb'}
      },
      {
        path: 'menu/tabMenu',
        component: StyleGuideTabMenuComponent,
        data: {title: 'TabMenu'}
      },
      {
        path: 'messages/letterAvatar',
        component: StyleGuideLetterAvatarComponent,
        data: {title: 'LetterAvatar'}
      },
      {
        path: 'messages/messages',
        component: StyleGuideMessagesComponent,
        data: {title: 'Messages'}
      },
      {
        path: 'menu/breadcrumb',
        component: StyleGuideBreadcrumbComponent,
        data: {title: 'Breadcrumb'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleGuideRoutingModule {}
