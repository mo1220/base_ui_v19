import {createAction, createActionGroup, props} from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth, User, PwchParams, UserInfo, Dashboard } from './auth.models';

export const authLogin = createAction('[Auth] Login');
export const authLogout = createAction('[Auth] Logout');

export const actionLoginRequest = createAction(
  '[Auth] Login Request',
  props<{ form: { email: string; password: string, seq: string; } }>()
);

export const actionBackHistoryStatus = createAction(
  '[Auth] BackHistory Status',
  props<{ backHistoryStatus: boolean  }>()
);


export const actionLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ auth: any }>()
);

export const actionTokenLoginSuccess = createAction(
  '[Auth] Token Login Success',
  props<{ access_token: string }>()
);

export const actionLoginError = createAction(
  '[Auth] Login Error',
  props<{ error: HttpErrorResponse | string }>()
);

export const actionLogoutRequest = createAction( '[Auth] Logout Request');

export const actionLogoutSuccess = createAction(
  '[Auth] Logout Success',
  props<any>()
);

export const actionLogoutError = createAction(
  '[Auth] Logout Error',
  props<{ error: HttpErrorResponse }>()
);

export const actionAuthClear = createAction('[Auth] Auth Clear');

/************************************************************************************/

/**
 * @Action User Info Request
 * */
export const actionUserInfoRequest = createAction(
  '[API] GET User Info',
  props<{ access_token: string }>()
);
export const actionUserInfoSuccess = createAction(
  '[Auth] GET User Info Success',
  props<{info: UserInfo}>()
);
export const actionUserInfoError = createAction(
  '[Auth] GET User Info Error',
  props<{ error: HttpErrorResponse }>()
);

/**
 * @Action User Dashboard  Request
 * */
export const actionUserDashboardRequest = createAction(
  '[API] GET User Dashboard',
  props<{ request: any }>()
);
export const actionUserDashboardSuccess = createAction(
  '[Auth] GET User Dashboard Success',
  props<{ dashboard: any }>()
);
export const actionUserDashboardError = createAction(
  '[Auth] GET User Dashboard Error',
  props<{ error: HttpErrorResponse }>()
);

/**
 * @Action 기본 전체 menu list 가져오기
 */
export const actionMenusListReq = createAction('[Auth] GET Menu List Request');
export const actionMenusListSuccess = createAction(
  '[Auth] GET Menu List Success',
  props<{ data: any }> ()
);
export const actionMenusListFail = createAction(
  '[Auth] GET Menu List Fail',
  props<{ error: HttpErrorResponse }>()
);

export const actionLoginExpiration = createAction(
  '[Auth] GET Login Expiration ',
  props<{ isExpiredPassword: any }> ()
);

/**
 * @Action 권한 있는 menu list 가져오기
 */
export const actionMenusListPermitReq = createAction('[Auth] GET Menu List Permit Request');
export const actionMenusListPermitSuccess = createAction(
  '[Auth] GET Menu List Permit Success',
  props<{ data: any }> ()
);
export const actionMenusListPermitFail = createAction(
  '[Auth] GET Menu List Permit Fail',
  props<{ error: HttpErrorResponse }>()
);


/**
* @action BooksActions
*
* */
export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Add Books': props<{ bookId: string }>(),
    'Remove Book': props<{ bookId: string }>(),
    'Modify Book Action': props<{ bookId: string }>(),
  },
});



/**
 * @Action User Info Modify Request
 * */
// export const actionUserModifyRequest = createAction(
//   '[API] User Modify',
//   props<{user: UserInfo}>()
// );
// export const actionUserModifySuccess = createAction(
//   '[Auth] User Modify Success',
//   props<{info: UserInfo}>()
// );
// export const actionUserModifyError = createAction(
//   '[Auth] User Modify Error',
//   props<{ error: HttpErrorResponse }>()
// );

/**
 * @Action User Change Password Request
 * */
// export const actionChangePasswordRequest = createAction(
//   '[API] User Change Password',
//   props<{params: PwchParams}>()
// );
// export const actionChangePasswordSuccess = createAction(
//   '[Auth] User Change Password Success',
//   props<any>()
// );
// export const actionChangePasswordError = createAction(
//   '[Auth] User Change Password Error',
//   props<{ error: HttpErrorResponse }>()
// );

export const actionClearAuth = createAction(
  '[Auth] Clear Auth'
);
