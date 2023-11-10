import { createActionGroup, props } from '@ngrx/store';
import { Language } from './settings.model';
// language: string; // 언어 선택
// theme: string; // 테마 선택
// autoNightMode: boolean; // 나이트 모드 여부 (나이트 모드시 18:00 이후엔 다크 모드)
// nightTheme: string; // 나이트 테마
// hour: number; // 시간
// gotoTop?: boolean;  // 내부 페이지 Scroll Top 으로 이동시

export const SettingActions = createActionGroup({
  source: 'Settings',
  events: {
    'Language': props<{ language: Language }>(),
    'Theme': props<{ theme: string }>(),
    'Auto Night Mode': props<{ autoNightMode: boolean }>(),
    'Hour': props<{ hour: number }>(),
    'Go To Top': props<{ gotoTop: boolean }>()
  },
});
