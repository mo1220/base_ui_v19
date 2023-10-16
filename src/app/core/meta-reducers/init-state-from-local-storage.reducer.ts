import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { AppState } from '../core.state';

/**
 * @function local(session) storage state initialize
 * */
export function initStateFromLocalStorage(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  // console.log('initStateFromLocalStorage');
  return function(state, action) {
    // console.log('initStateFromLocalStorage', state, action);
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return {...state, ...newState};
  };
}
