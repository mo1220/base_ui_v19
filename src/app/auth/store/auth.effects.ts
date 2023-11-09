import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ofType, createEffect, Actions} from '@ngrx/effects';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {of} from 'rxjs';
import {catchError, debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {
  authLogin,
  authLogout,
  actionLoginError,
  actionLoginRequest,
  actionLoginSuccess,
  actionLogoutError,
  actionLogoutRequest,
  actionLogoutSuccess,
  actionUserInfoError,
  actionUserInfoRequest,
  actionUserInfoSuccess,
  // actionUserModifyError,
  // actionUserModifyRequest,
  // actionUserModifySuccess,
  actionAuthClear,
  actionTokenLoginSuccess,
  actionUserDashboardSuccess,
  actionMenusListReq,
  actionMenusListSuccess,
  actionMenusListFail,
  actionLoginExpiration,
  actionMenusListPermitReq,
  actionMenusListPermitSuccess, actionMenusListPermitFail
} from './auth.actions';
import { AuthGuardService } from './auth-guard.service';
import { ApiService } from "../../core/service/commons";
import { NotificationService } from "../../core/notifications/notification.service";
import { TranslateService } from '@ngx-translate/core';
import { Store } from "@ngrx/store";
export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private localStorageService: LocalStorageService,
    private api:ApiService,
    private service: AuthGuardService,
    private router: Router,
    private msgs: NotificationService,
    private translate: TranslateService
  ) {}

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() => {
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          console.log('logout createEffect');
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
          this.localStorageService.removeItem('ADMIN.APPROVAL');
          this.localStorageService.removeItem('ADMIN.GLOSSARY');
          this.localStorageService.removeItem('ADMIN.USER');
          this.localStorageService.removeItem('ADMIN.USER.ROLE');
          this.localStorageService.removeItem('ADMIN.USER.DEPT');
          this.localStorageService.removeItem('ADMIN.AUDIT');
          this.localStorageService.removeItem('AUTH.DASHBOARD');
          this.localStorageService.removeItem('DATA_CATALOG.KEYWORD_LIST');
          this.localStorageService.removeItem('DATA_CATALOG.INTEREST');
          this.localStorageService.removeItem('DATA_CATALOG.REQUEST');
          this.localStorageService.removeItem('DATA_CATALOG.DATA');
          this.localStorageService.removeItem('DATA_CATALOG.BUSINESS');
          this.localStorageService.removeItem('DATA_CATALOG.IT');
          this.localStorageService.removeItem('DASHBOARD.YEARS');
          this.localStorageService.removeItem('GLOSSARY.REQUEST');
          this.localStorageService.removeItem('GLOSSARY.DATA');
          this.localStorageService.removeItem('MY_PAGE.REQUEST');
          this.localStorageService.removeItem('MY_PAGE.FAVORITE');
        })
      ),
    { dispatch: false }
  );

  loginReq = createEffect(() => ({ debounce = 500 } = {}) =>
    this.actions$.pipe(
      ofType(actionLoginRequest),
      debounceTime(debounce),
      switchMap(action => {
          return this.service.login(action.form).pipe(
            map((res: any) => res.data),
            tap((res) => {
              console.log('loginReq createEffect', res);
              if (res.isFirst) { // 처음 로그인
                this.router.navigate(['/init-login']);
                return;
              }
              if (res.isExpiredPassword) {
                this.router.navigate(['/expire-info']);
                // this.store.dispatch(actionLoginExpiration({isExpiredPassword: res.isExpiredPassword}))
                return;
              }
              if (res.verifyingEmail) { // 임시비밀번호로 로그인 시
                let access_token
                if (res?.redirectUrl) {
                  const redirectUrl = res.redirectUrl;
                  if (redirectUrl) {
                    const idx = redirectUrl.indexOf('=');
                    access_token = redirectUrl.slice(idx + 1, redirectUrl.length);
                  }
                }

                this.localStorageService.setItem(AUTH_KEY, {
                  access_token
                })
                this.router.navigateByUrl(res.redirectUrl);
                return;
              }

              this.localStorageService.setItem(AUTH_KEY, {
                isAuthenticated: true,
                auth: res,
              });

              const {dashboard, menus} = res;
              // 사용자 대시보드
              if (dashboard) {
                this.localStorageService.setItem('AUTH.DASHBOARD', res.dashboard);
                this.store.dispatch(actionUserDashboardSuccess({dashboard}));
              }
              // 사용자 메뉴
              if (menus) {
                const {data} = menus;
                this.localStorageService.setItem('AUTH.MENU', data.data);
              }
            }),
            switchMap((auth: any) => {
              let actions = [];
              if (auth.info) {

                actions.push(
                  // @ts-ignore
                  actionLoginSuccess({auth}),
                  actionMenusListPermitReq(),
                );
              } else if (auth.verifyingEmail || auth.isFirst || auth.isExpiredPassword) {
                // @ts-ignore
                actions.push(actionLoginSuccess({auth}))
              }
              return actions;
            }),
            catchError(error => of(
              actionLoginError({error}),
              // actionHttpErrorMessage(error)
            ))
          )
        }
      )
    )
  );

  logoutReq = createEffect(() => ({debounce = 500} = {}) =>
    this.actions$.pipe(
      ofType(actionLogoutRequest),
      debounceTime(debounce),
      switchMap(action =>
        this.service.logout().pipe(
          tap(res => {
            this.router.navigate(['/logout']);
            this.localStorageService.removeItem(AUTH_KEY);
          }),
          switchMap(res => [
            // actionLogoutRequest(),
            actionLogoutSuccess({res}),
            authLogout(),
            actionAuthClear()
          ]),
          catchError(error => of(actionLogoutError({error})))
        )
      )
    )
  );

  /********************************************************************************/
  tokenReq = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTokenLoginSuccess),
        tap((res) => {
          console.log('tokenReq createEffect', res);
          this.store.dispatch(actionUserInfoRequest(res));
        })
      ),
    { dispatch: false }
  );

  getUser = createEffect(() => ({ debounce = 500 } = {}) =>
    this.actions$.pipe(
      ofType(actionUserInfoRequest),
      debounceTime(debounce),
      switchMap(action =>
        this.api.API('post', '/UserData/getMyInfo').pipe(
          map(res => res.data),
          tap(res => {
            this.localStorageService.setItem(AUTH_KEY, {
              isAuthenticated: true,
              auth: {
                access_token: action.access_token,
                info: res
              }
            });
            if(res.dashboard) {
              this.store.dispatch(actionUserDashboardSuccess({dashboard: res.dashboard}))
            }
          }),
          switchMap(info => [
            actionUserInfoSuccess({ info }),
            actionMenusListPermitReq()
          ]),
          catchError(error => of(actionUserInfoError({ error })))
        )
      )
    )
  );

  /**
   * @Effect menu 전체 list 가져오기
   */
  getMenuList = createEffect(() => ({ debounce = 500 } = {}) =>
    this.actions$.pipe(
      ofType(actionMenusListReq),
      debounceTime(debounce),
      switchMap(action =>
        this.service.getMenuList().pipe(
          switchMap(data => [
            actionMenusListSuccess({data})
          ]),
          catchError(error => of(actionMenusListFail({ error })))
        )
      )
    )
  );

  getPermitMenuList = createEffect(() => ({ debounce = 500 } = {}) =>
    this.actions$.pipe(
      ofType(actionMenusListPermitReq),
      debounceTime(debounce),
      switchMap(action =>
        this.service.getMenuPermitList().pipe(
          tap(res => {
            this.localStorageService.setItem('AUTH.MENU', res);
          }),
          switchMap(data => [
            actionMenusListPermitSuccess({ data: data })
          ]),
          catchError(error => {
            const authKey = this.localStorageService.getItem('AUTH');
            if(!authKey) return of(actionLoginError({ error: 'Access token not found' }));
            return of(actionMenusListPermitFail({ error }))
          })
        )
      )
    )
  );
}
