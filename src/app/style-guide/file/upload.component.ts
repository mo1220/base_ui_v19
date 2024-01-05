import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FileItem, FileUploader } from "ng2-file-upload";
import { MessagesService } from "../../core/toast-message/messages.service";
import * as _ from 'lodash';
import {environment} from "../../../environments/environment";
import {API_BASE_URL} from "../../core/service/constants";
import {UtilService} from "../../core/service/util.service";
import {Store} from "@ngrx/store";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-upload',
  templateUrl: './upload.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideUploadComponent implements AfterViewInit, OnDestroy {

  public uploader:FileUploader;// = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  uploadedFiles: Array<any>;
  totalFileSize = 0;
  response:string = '';

  constructor(
    private store: Store<any>,
    private cd: ChangeDetectorRef,
    private utilService: UtilService,
    private msgs: MessagesService,
    private translate: TranslateService,
    private router: Router
  ) {
    const vm = this;
    const FILE_URL = `http://192.168.0.90:4000/api/Boards/file?access_token=aa`;
    const allowExtension =[
        'video/x-msvideo', // .avi
        'image/bmp', //.bmp
        'image/gif', // .gif
        'image/png', // .png
        'image/svg+xml', // .svg
        'image/jpeg', // .jpg, .jpeg
        'video/webp', // .webbp
        'video/webm', // .webbm
        'video/mp4', // .mp4
        'video/mpeg', // .mpeg
        'text/plain', // .txt
        'text/csv', // .csv
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/pdf', // .pdf
        'application/vnd.ms-powerpoint', // .ppt
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      ];
    const allowType = ['.gif', '.jpg', '.jpeg', '.png', '.csv', '.tsv', '.hwp', '.pdf', '.docx', '.doc', '.xls', '.xlsx', '.ppt', '.pptx'];
    this.uploader = new FileUploader({
      url: FILE_URL,// 테스트용 LG화학 //파일 업로더 경로의 URL
      // authToken: '', //파일 전송 시 'Authorization' 헤더로 적용될 인증 토큰입니다.
      // authTokenHeader: '',
      // additionalParameter: {
      //   path: '' // 파라미터에 path: ''를 추가
      // },
      // parametersBeforeFiles: false, //추가 매개변수를 파일 앞이나 뒤에 추가해야 하는지 여부를 나타냅니다. 기본값은 거짓입니다.
      // allowedMimeType: allowExtension,
      // allowedFileType: allowType,
      // maxFileSize: 2, // 업로드 Max File Size
      // queueLimit: 2, // 큐 갯수 제한
      // filters: [{
      //   name: 'mimeType',
      //   fn: (item: any): boolean => {
      //     // mime type 확인
      //     // if (allowedMineType.includes(item.type)) return true;
      //     const fileExt = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase();
      //     return allowType.includes(fileExt);
      //   }
      // }],
      // disableMultipart: true, // 'true'인 경우 파일 업로드에 멀티파트 양식 사용을 비활성화하고 대신 파일을 스트리밍 합니다. 일부 API(예: Amazon S3)에서는 파일이 양식을 통해 전송되기보다는 스트리밍될 것으로 예상할 수 있습니다. 기본값 false
      // itemAlias: '', //항목 별칭(양식 이름 재정의)
      // formatDataFunctionIsAsync: true, //'formatDataFunction'에 전달된 함수가 비동기인지 알려줍니다. 기본값 false
      // formatDataFunction: async (item:any) => { // 요청 본문을 수정하는 기능입니다. 이 함수가 호출되려면 'DisableMultipart'가 'true'여야 합니다.
      //   return new Promise( (resolve: any, reject) => {
      //     resolve({
      //       name: item._file.name,
      //       length: item._file.size,
      //       contentType: item._file.type,
      //       date: new Date()
      //     });
      //   });
      // }
    });
    this.hasBaseDropZoneOver = false;

    this.uploader.onAfterAddingFile = (item:FileItem) => {
      console.log(item);
      console.log(this.uploader.queue);
      // if(item.file.name.length > 80) {
      //   vm.msgs.info({ title: '파일 에러', message: '파일이름이 긴 파일이 있습니다.' });
      // }
      vm.setTotalFileSize();
    };

    this.uploadedFiles = [];
    const files:any[] = [];


    this.uploader.response.subscribe(res => {
      const jsonResult = JSON.parse(res);
      console.log(jsonResult);

      if(jsonResult.message) {
        this.uploader.queue.pop();
        // this.fileInput.nativeElement.value = "";
        setTimeout(() => {
          // this.loading = false;
          // this.notiService.warn(jsonResult.message);
        },100)
        return;
      }

      // files.push(jsonResult.data.files.file[0]);
      this.uploadedFiles = [...files];
      // this.uploadedFiles.push(jsonResult.data.files.file[0]);

      setTimeout(() => {
        // 업로드 작업 완료되었을 때
        if (this.uploader.queue.length === this.uploadedFiles.length) {
          if (this.uploader.queue.length === this.uploader.queue.filter(f => f.isSuccess).length) {
            // dispatch
            this.response = res;
          } else {
            // this.notiService.info(vm.translate.instant('guide.file_warning3')); //'파일 업로드를 실패했습니다.'
          }
        }
      }, 300);
    });
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setTotalFileSize() {
    // this.uploader.queue = _.filter(this.uploader.queue, d => d.file.name.length < 80);
    this.totalFileSize = _.sumBy(this.uploader.queue, d => d.file.size);
  }

  onFileRemove(item: FileItem) {
    this.uploadedFiles.forEach(e => console.log(e));
    const index = this.uploadedFiles.findIndex(f => f.originalFilename === item.file.name);
    if (index >= 0) {
      this.uploadedFiles = [...this.uploadedFiles.slice(0, index), this.uploadedFiles.slice(index + 1, this.uploadedFiles.length)];
    }
    item.remove();
    this.setTotalFileSize();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void { }
}
