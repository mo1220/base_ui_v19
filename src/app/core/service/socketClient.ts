/*
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { API_BASE_URL } from './constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private url = 'http://192.168.0.190:3003/api/alarmEv/websocket';
  @Output() socket: any;
  token: string;
  PATH: string;
  baseUrl: string;
  paramsLink: string = '?';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessages(path) {
    this.baseUrl = !environment.production ? `${API_BASE_URL}` : ''; // `${API_BASE_URL}/api`;
    this.PATH = path;
    this.paramsLink = this.PATH.indexOf('?') == -1 ? '?' : '&';
    this.token =
      this.localStorageService.getItem('APPS.LOGINS.CONTENTS') != undefined
        ? this.localStorageService.getItem('APPS.LOGINS.CONTENTS').id
        : '';
    if (this.token == '') this.router.navigate(['/ssoLoginError']);

    let url = `${this.baseUrl}${this.PATH}`;
    url = url.replace(/"/gi, '');

    let observable = new Observable(observer => {
      this.socket = io(url); // this.url
      this.socket.emit('authentication', { access_token: this.token });
      this.socket.on('system', data => {
        observer.next({ key: 'system', value: data });
      });
      this.socket.on('alarm', data => {
        observer.next({ key: 'alarm', value: data });
      });
      this.socket.on('share', data => {
        observer.next({ key: 'share', value: data });
      });
      this.socket.on('comment', data => {
        observer.next({ key: 'comment', value: data });
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
*/
