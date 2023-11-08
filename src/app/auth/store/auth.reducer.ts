import { AuthState } from './auth.models';
import { createReducer, on, Action } from '@ngrx/store';
import {
  actionAuthClear,
  actionLoginError,
  actionLoginRequest,
  actionLoginSuccess,
  actionLogoutError,
  actionLogoutSuccess,
  authLogin,
  authLogout,
  actionUserInfoError,
  actionUserInfoSuccess,
  actionTokenLoginSuccess,
  actionUserDashboardSuccess,
  actionBackHistoryStatus,
  actionMenusListSuccess,
  actionMenusListFail, actionLoginExpiration, actionMenusListPermitSuccess, actionMenusListPermitFail, BooksActions
} from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: false
};

// @ts-ignore
// @ts-ignore
// @ts-ignore
const reducer = createReducer(
  initialState,
  on(authLogin, state => ({ ...state, isAuthenticated: true })),
  on(authLogout, state => ({ ...state, isAuthenticated: false })),
  on(actionLoginRequest, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(actionLoginSuccess, (state, { auth }) => {
    let isAuthenticated = true;
    if(auth.isFirst || auth.verifyingEmail){ // 초기 로그인 | 임시비밀번호 로그인
      isAuthenticated = false;
      if(auth.verifyingEmail) {
        let url = auth?.redirectUrl;
        if(url){
          const idx = url.indexOf('=');
          auth = {
            ...auth,
            access_token:  url.slice(idx+1, url.length)
          }
        }
      }
    }
    return ({
      ...state,
      loading: false,
      auth,
      isAuthenticated,
      error: null
    })
  }),
  on(actionLoginError, (state, { error }) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    auth: null,
    error
  })),
  on(actionLogoutSuccess, (state, { error }) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    user: null,
    error
  })),
  on(actionLogoutError, (state, { error }) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    // stock: null,
    error
  })),
  /************************************************************************************/

  on(actionTokenLoginSuccess, (state, { access_token }) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    auth: {
      ...state.auth,
      access_token
    },
    error: null
  })),
  on(actionUserInfoSuccess, (state, { info }) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    auth: {
      ...state.auth,
      info
    },
    error: null
  })),
  on(actionUserInfoError, (state, { error }) => ({
    ...state,
    loading: false,
    auth: null,
    error
  })),
  on(actionUserDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    isAuthenticated: true,
    dashboard
  })),

  // on(actionUserModifySuccess, (state, { info }) => {
  //   return {
  //     ...state,
  //     loading: false,
  //     info,
  //     error: null
  //   };
  // }),
  // on(actionUserModifyError, (state, { error }) => ({
  //   ...state,
  //   loading: false,
  //   error
  // })),

  on(actionBackHistoryStatus, (state, { backHistoryStatus })  => ({
    ...state,
    backHistoryStatus
  })),


  /**
   * menu list 가져오기
   */
  on(actionMenusListSuccess, (state, { data })  => ({
    ...state,
    loading: false,
    menu: {
      ...state.menu,
      allMenus: data.data
    }
  })),
  on(actionMenusListFail, (state, { error })  => ({
    ...state,
    loading: false,
    error
  })),

  on(actionLoginExpiration, (state, { isExpiredPassword })  => ({
    ...state,
    loading: false,
    isExpiredPassword
  })),

  on(actionMenusListPermitSuccess, (state, { data })  => ({
    ...state,
    loading: false,
    menu: {
      ...state.menu,
      data: data.data
    }
  })),


  on(actionMenusListPermitFail, (state, { error })  => ({
    ...state,
    loading: false,
    error
  })),

  /************************************************************************************/
  on(actionAuthClear, () => ({
    isAuthenticated: false,
    loading: false
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
