import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import { SettingActions } from './settings.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  language: 'en',
  theme: 'DEFAULT-THEME',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  hour: 0,
  gotoTop: false
};
const reducer = createReducer(
  initialState,
  on(
    SettingActions.language,
    SettingActions.theme,
    SettingActions.autoNightMode,
    SettingActions.hour,
    SettingActions.goToTop,
    (state, action) => ({ ...state, ...action })
  )
);
export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
