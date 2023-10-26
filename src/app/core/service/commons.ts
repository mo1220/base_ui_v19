import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { API_BASE_URL } from './constants';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { UtilService } from './util.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import {NotificationService} from '../notifications/notification.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // @ts-ignore
  PATH: string;
  // @ts-ignore
  baseUrl: string;
  // @ts-ignore
  headers: Headers;
  paramsLink = '?';
  lang = 'kr';
  url = '';
  constructor(
    public store: Store<AppState>,
    private httpClient: HttpClient,
    private router: Router,
    // tslint:disable-next-line:no-shadowed-variable
    private utilService: UtilService,
    private localStorageService: LocalStorageService,
    public translate: TranslateService,
    private msgs: NotificationService,
  ) {
    this.lang = translate.currentLang;
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd){
        this.url = e.urlAfterRedirects;
      }
    });
  }

  // @ts-ignore
  API(type: string, path: string, params?: any): Observable<any> {
    // const lang = this.translate.currentLang;
    params = {
      ...params
    };
    let headerParams: any = {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
      _lang: this.lang,
      _dp_url: this.url,
      _hash: moment().format('x')
    }
    this.baseUrl = !environment.production ? `${API_BASE_URL}/api` : '/api';
    this.PATH = path;
    this.paramsLink = this.PATH.indexOf('?') === -1 ? '?' : '&';
    const auth = this.utilService.getState(this.store, 'auth.auth');
    let token = auth ? auth.access_token ? auth.access_token : '' :  '';
    let url = `${this.baseUrl}${this.PATH}${this.paramsLink}`;

    if (token !== '') {
      headerParams = {
        ...headerParams,
        access_token: token
      };
    }
    if(path === '/system/health') delete headerParams.access_token;

    url = url.replace(/'/gi, '');

    let header = new HttpHeaders();
    _.forEach(headerParams, (v, k) => {
      if(v) header = header.set(k, v);
    });

    // console.log(header);
    switch (type) {
      case 'get': {
        let paramiters = new HttpParams();
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const val = params[key];
            paramiters = paramiters.append(key, val);
          }
        }
        return this.httpClient.get(url, {
          params: paramiters,
          // withCredentials: true,
          headers: header
          // headers: new HttpHeaders({
          //   'Content-Type': 'application/json',
          //   'X-Content-Type-Options': 'nosniff',
          //   'Access-Control-Allow-Origin': '*',
          //   ...headerParams
          // })
        });
      }
      case 'post': {
        return this.httpClient.post(url, { ...params }, {
          withCredentials: true,
          headers: header
          // headers: new HttpHeaders({
          //   'Content-Type': 'application/json',
          //   'X-Content-Type-Options': 'nosniff',
          //   'Access-Control-Allow-Origin': '*',
          //   ...headerParams
          // })
        });
      }
      case 'put': {
        return this.httpClient.put(url, { ...params }, {
          withCredentials: true,
          headers: header
          // headers: new HttpHeaders({
          //   'Content-Type': 'application/json',
          //   'X-Content-Type-Options': 'nosniff',
          //   'Access-Control-Allow-Origin': '*',
          //   ...headerParams
          // })
        });
      }
      case 'delete': {
        let paramiters = new HttpParams();
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const val = params[key];
            paramiters = paramiters.append(key, val);
          }
        }
        return this.httpClient.delete(url, {
          params: paramiters,
          withCredentials: true,
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'Access-Control-Allow-Origin': '*',
            ...headerParams
          })
        });
      }
      case 'patch': {
        return this.httpClient.patch(url, {  ...params }, {
          withCredentials: true,
          headers: header
          // headers: new HttpHeaders({
          //   'Content-Type': 'application/json',
          //   'X-Content-Type-Options': 'nosniff',
          //   'Access-Control-Allow-Origin': '*',
          //   ...headerParams
          // })
        });
      }
    }
  }

  pdfUrl(path:string) {
    this.baseUrl = !environment.production ? `${API_BASE_URL}/api` : '/api';
    this.PATH = path;
    this.paramsLink = this.PATH.indexOf('?') === -1 ? '?' : '&';
    const auth = this.utilService.getState(this.store, 'auth.auth');
    const token = auth ? auth.access_token : '';
    let url = `${this.baseUrl}${this.PATH}${this.paramsLink}_hash=` + moment().format('x');
    // console.log(url);
    if (token !== '') {
      url += `&access_token=${token}`;
    }
    return encodeURIComponent(url);
  }

  pdfAllUrl(path:string) {
    this.baseUrl = !environment.production ? `${API_BASE_URL}/api` : '/api';
    this.PATH = path;
    this.paramsLink = this.PATH.indexOf('?') === -1 ? '?' : '&';
    const auth = this.utilService.getState(this.store, 'auth.auth');
    const token = auth ? auth.access_token : '';
    let url = `${this.baseUrl}${this.PATH}${this.paramsLink}_hash=` + moment().format('x');
    if (token !== '') {
      url += `&access_token=${token}`;
    }
    return url;
  }

  downloadApiAsync(type: string, path: string, params?: any): Promise<any> {
    // console.log(params);
    return new Promise<any>((resolve, reject) => {
      try{
        this.baseUrl = !environment.production ? `${API_BASE_URL}/api` : '/api';
        this.PATH = path;
        this.paramsLink = this.PATH.indexOf('?') === -1 ? '?' : '&';
        const auth = this.utilService.getState(this.store, 'auth.auth');
        const token = auth ? auth.access_token : '';
        let url = `${this.baseUrl}${this.PATH}${this.paramsLink}_hash=` + moment().format('x');
        let str = '';
        const addedParams = {
          ...params,
          _dp_url: this.url,
        }
        // tslint:disable-next-line:forin
        for (const key in addedParams) {
          if (str !== '') {
            str += '&';
          }
          str += key + '=' + encodeURIComponent(addedParams[key]);
        }
        url = url + '&' + str;
        url = url.replace(/'/gi, '');
        // console.log(url);
        this.httpClient.get(url,{
          responseType: "blob",
          headers:{ access_token: token }
        }).subscribe((response) => {
          let dataType = response.type;
          let binaryData = [];
          // @ts-ignore
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
          downloadLink.setAttribute('download', params['downloadFilename']);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          resolve('SUCCESS');
        });
      } catch(err) {
        reject(err);
      }
    });
    // window.location.href = url;
  }

  downloadExtractApi(type: string, path: string, params?: any) {
    // console.log(params);
    this.baseUrl = !environment.production ? `${API_BASE_URL}/api` : '/api';
    this.PATH = path;
    this.paramsLink = this.PATH.indexOf('?') === -1 ? '?' : '&';
    const auth = this.utilService.getState(this.store, 'auth.auth');
    const token = auth ? auth.access_token : '';
    let url = `${this.baseUrl}${this.PATH}${this.paramsLink}_hash=` + moment().format('x');
    if (token !== '') {
      url += `&access_token=` + token;
    }

    // url = url.replace(/'/gi, '');
    let str = '';
    const addedParams = {
      ...params,
      _dp_url: this.url,
    }
    // tslint:disable-next-line:forin
    for (const key in addedParams) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(addedParams[key]);
    }
    url = url + '&' + str;
    url = url.replace(/'/gi, '');

    let xhr = new XMLHttpRequest();
    const vm = this;
    xhr.onreadystatechange = function() {
      // console.log(xhr)
      if(xhr.readyState == 4) { // readyState 4 (요청의 처리가 종료되고, 응답이 준비된 상태)
        if(xhr.status == 200) { // status 200 (올바른 응답)
          window.location.href = url;
        }else {
          vm.msgs.error('파일을 다운로드 받을 수 없습니다. 관리자에게 문의하세요.');
        }
      }

    }
    xhr.open('head',url);
    xhr.send(null);
    // window.location.href = url;
  }

  downloadApi(type: string, path: string, params?: any): Promise<any> {
    // @ts-ignore
    return new Promise<any>((resolve, reject) => {
      try {
        this.baseUrl = !environment.production ? `${API_BASE_URL}/api` : '/api';
        this.PATH = path;
        this.paramsLink = this.PATH.indexOf('?') === -1 ? '?' : '&';
        const auth = this.utilService.getState(this.store, 'auth.auth');
        const token = auth ? auth.access_token : '';
        let url = `${this.baseUrl}${this.PATH}${this.paramsLink}_hash=` + moment().format('x');
        // console.log(token);

        // if (token !== '') {
        //   url += `&access_token=` + token;
        // }

        // url = url.replace(/'/gi, '');
        let str = '';
        const addedParams = {
          ...params,
          _dp_url: this.url,
        }
        // tslint:disable-next-line:forin
        for (const key in addedParams) {
          if (str !== '') {
            str += '&';
          }
          str += key + '=' + encodeURIComponent(addedParams[key]);
        }
        url = url + '&' + str;
        url = url.replace(/'/gi, '');
        // console.log(url);
        this.httpClient.get(url,{
          responseType: "blob",
          observe:'response',
          headers:{access_token:token}
        }).subscribe((response) => {
         // console.log(response);
          let disposition = response.headers.get('Content-Disposition');
          let filename = 'export.xlsx';
          if (disposition && disposition.indexOf('attachment') !== -1) {
            if(disposition.indexOf("filename*=UTF-8''") > -1){
              filename = decodeURIComponent(disposition.split("filename*=UTF-8''")[1]);
            } else {
              let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
              let matches = filenameRegex.exec(disposition);
              if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
            }
          }

         // console.log(filename);
          // @ts-ignore
          let dataType = response.body.type;
          let binaryData = [];
          // @ts-ignore
          binaryData.push(response.body);
          let downloadLink = document.createElement('a');
          // @ts-ignore
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
          downloadLink.setAttribute('download', (params&&params['downloadFilename'])?params['downloadFilename']:filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          resolve('SUCCESS');
        },error => {
          console.log(error);
        });
      }catch(err){
        reject(err);
        return err;
      }
    });
  }

  /** 파일 다운로드(progress) url생성 **/
  downloadAsyncUrl(type: string, path: string, params?: any) {
    this.baseUrl = !environment.production ? `${API_BASE_URL}/api` : '/api';
    this.PATH = path;
    this.paramsLink = this.PATH.indexOf('?') === -1 ? '?' : '&';
    const auth = this.utilService.getState(this.store, 'auth.auth');
    const token = auth ? auth.access_token : '';
    let url = `${this.baseUrl}${this.PATH}${this.paramsLink}_hash=` + moment().format('x');
    if (token !== '') {
      url += `&access_token=` + token;
    }

    // url = url.replace(/'/gi, '');
    let str = '';
    const addedParams = {
      ...params,
      _dp_url: this.url,
    }
    // tslint:disable-next-line:forin
    for (const key in addedParams) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(addedParams[key]);
    }
    url = url + '&' + str;
    return url = url.replace(/'/gi, '');
  }

  DummyAPI(type: string, path: string, params?: any): Observable<any> {
    const fileName = path.split('/');
    const filePATH = '/assets/dummy/' + fileName[fileName.length - 1] + '.json';

    switch (type) {
      case 'get': {
        return this.httpClient.get(filePATH, params);
      }
      case 'post': {
        return this.httpClient.post(filePATH, params);
      }
      default:
        return this.httpClient.get(filePATH, params);
    }
  }
}
