import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../../core/core.state';
import { ApiService } from '../../core/service/commons';
import { MenuNode, User } from './auth.models';
import { UtilService } from '../../core/service/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private api: ApiService,
    private utilServie: UtilService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(selectIsAuthenticated));
  }
  login(params: { email: string; password: string }): Observable<boolean> {
    return this.api.API('post', '/auth/login', { username : params.email, password: params.password });
    // return this.api.API('post', '/UserData/login', { user_id : params.email, passwd: params.password });
  }
  user(): Observable<User> {
    return this.api.API('post', '/user/me');
  }
  logout(): Observable<any> {
    return this.api.API('post', '/UserData/logout');
  }
  getMenuList(): Observable<Array<MenuNode>>{
    return this.api.API('get', '/menus')
  }
  getMenuPermitList(): Observable<Array<MenuNode>>{
    return this.api.API('get', '/menus/permit');
  }
}
