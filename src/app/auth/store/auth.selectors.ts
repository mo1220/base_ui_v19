import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../../core/core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.auth
);

export const selectAuthInfo = createSelector(
  selectAuthState,
  (state: AuthState) => state.info
);

export const selectAuthDashboard = createSelector(
  selectAuthState,
  (state: AuthState) => state.dashboard
);

export const selectBackHistoryStatus = createSelector(
  selectAuthState,
  (state: AuthState) => state.backHistoryStatus
);

export const selectMenus = createSelector(
  selectAuthState,
  (state: AuthState) => state.menu
);
