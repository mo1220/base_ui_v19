import { Injectable } from '@angular/core';

const APP_PREFIX = 'DTK-';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  static loadInitialState() {
    return Object.keys(sessionStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            // @ts-ignore
            let item = sessionStorage.getItem(storageKey) === 'undefined' ? undefined : JSON.parse(sessionStorage.getItem(storageKey));
            currentStateRef[key] = item;
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  setItem(key: string, value: any) {
    if(['POPUP', 'INIT', 'LOGIN', 'DATA_CATALOG_GUIDE', 'AUTO_CONNECT'].includes(key)) {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }else {
      sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if(['POPUP', 'INIT', 'LOGIN', 'DATA_CATALOG_GUIDE', 'AUTO_CONNECT'].includes(key)) {
      // @ts-ignore
      return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    }else {
      // @ts-ignore
      return JSON.parse(sessionStorage.getItem(`${APP_PREFIX}${key}`));
    }
  }

  removeItem(key: string) {
    sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  /** Tests that localStorage exists, can be written to, and read from. */
  testLocalStorage() {
    const testValue = 'testValue';
    const testKey = 'testKey';
    let retrievedValue: string;
    const errorMessage = 'localStorage did not return expected value';

    this.setItem(testKey, testValue);
    retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
}
