import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js'

// TODO ImageResize type 에러 나는 거 해결
// import { ImageResize } from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);
// quill-image-resize는 angular6 이하에서 작동합니다.
// 대신 BlotFormatter사용
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

import 'brace';
import 'brace/mode/sql';
import 'brace/theme/dracula';
import { AceConfigInterface } from "ngx-ace-wrapper/lib/ace.interfaces";
import { AceComponent } from "ngx-ace-wrapper";

import hljs from 'highlight.js'
hljs.configure({
  languages: ['javascript', 'python', 'sql', 'xml', 'html', 'java']
})

/**
 * @class StyleGuideEditorComponent *
 * */
@Component({
  selector: 'style-guide-editor',
  templateUrl: './Editor.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  @ViewChild(AceComponent, { static: false }) componentRef?: AceComponent;
  editor: any;
  buttonMenu: any = [
    {
      title: 'Html Editor(Quill)',
      anchor: 'basicHtmlEditor',
      desc: 'Quill Editor',
    },
    {
      title: 'Html Viewer(Quill)',
      anchor: 'basicHtmlViewer',
      desc: 'Quill Editor',
    },
    {
      title: 'Code Editor(Ace Editor)',
      anchor: 'basicCodeEditor',
      desc: 'Quill Editor',
    }
  ];
  blurred = false;
  focused = false;
  modules = {};
  // content = `
  // <p> Consider the point P on the curve y = f (x) whose coordinates are (x, y) and another point Q where coordinates are (x + Δx, y + Δy). The slope of the line joining P and Q is given by: </p> <p> <span class=\"ql-formula\" data-value=\"\\tan\\theta = \\frac{\\triangle y}{\\triangle x}=\\frac{(y+\\triangle y)-y}{\\triangle x}\"> \\tan\\theta = \\frac{\\triangle y}{\\triangle x}=\\frac{(y+\\triangle y)-y}{\\triangle x} </span> -------------------- (1) </p> <p> <span class=\"ql-formula\" data-value=\"\\tan\\theta = \\frac{\\triangle y}{\\triangle x}=\\frac{(y+\\triangle y)-y}{\\triangle x}\"> \\tan\\theta = \\frac{\\triangle y}{\\triangle x}=\\frac{(y+\\triangle y)-y}{\\triangle x} </span> -------------------- (2) </p>`
  content = '';

  value = 'SELECT * FROM {TB:0001A}';
  config: AceConfigInterface = {
    wrap: true,
    cursorStyle: 'slim',
    highlightActiveLine:false,
    autoScrollEditorIntoView: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    showPrintMargin: false,
    fontSize:12
  };
  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      formula: true,
      // imageResize: {},
      blotFormatter: {
        // empty object for default behaviour.
      },
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value,
      },
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video', 'emoji'],
        ['formula']
      ]
    }
  }

  created(quill: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', quill);
    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    })

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    } as any, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blurred = false;
  }
  nativeFocus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('native-focus', $event)
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false;
    this.blurred = true;
  }
  nativeBlur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('native-blur', $event);
  }

  ngAfterViewInit(): void {
    // 기존 Editor 방식 유지 Editor Instance를 가져오는 방식
    // @ts-ignore
    this.editor = this.componentRef.directiveRef.ace();
    console.log(this.editor);
    this.cd.detectChanges();
  }

  insertText() {
    const text = `{COL:Column1}`;
    if(this.editor.getSelectedText() === '') {
      this.editor.session.insert(this.editor.getCursorPosition(), text + ' ');
    } else {
      this.editor.session.replace(this.editor.selection.getRange(), text);
    }
    this.editor.focus();
  }
  ngOnDestroy(): void {

  }
}
