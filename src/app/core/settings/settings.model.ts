import { AppState } from '../core.module';
export const NIGHT_MODE_THEME = 'BLACK-THEME';
export type Language = 'kr' | 'en' | 'cn' | string;
export interface SettingsState {
  language: string; // 언어 선택
  theme: string; // 테마 선택
  autoNightMode: boolean; // 나이트 모드 여부 (나이트 모드시 18:00 이후엔 다크 모드)
  nightTheme: string; // 나이트 테마
  hour: number; // 시간
  gotoTop?: boolean;  // 내부 페이지 Scroll Top 으로 이동시
}
export interface State extends AppState {
  settings: SettingsState;
}
export const default_colors = [
  '#B50031FF', // primary color
  '#6B6B6B',
  '#EF5350',
  '#FDD835',
  '#9CCC65',
  '#29B6F6',
  '#7E57C2',
  '#bed0b0',
  '#f8d798',
  '#6ccff0',
  '#ffbe8e',
  '#fd9a91',
  '#87afcf',
  '#ecb1e1',
  '#afa6e6',
  '#5e9450',
  '#f2b434',
  '#65c7e2',
  '#f98a3b',
  '#eb5d44',
  '#1872c5',
  '#ba57a8',
  '#7262a5',
  '#4c7e3f',
  '#d59d00',
  '#407bc0',
  '#c96215',
  '#951a00',
  '#073d82',
  '#6c2b5d',
  '#5a4a7a',
  '#bed0b0',
  '#f8d798',
  '#6ccff0',
  '#ffbe8e',
  '#fd9a91',
  '#87afcf',
  '#ecb1e1',
  '#afa6e6',
  '#5e9450',
  '#eea808',
  '#60a9ca',
  '#d67e41',
  '#d12900',
  '#044da9',
  '#a33b88',
  '#625297',
  '#98bc8b',
  '#f7c769',
  '#59bedd',
  '#ff994e',
  '#f6715e',
  '#4c91d4',
  '#de8ed3',
  '#8172ba',
  '#3c6135',
  '#9a7000',
  '#2b5361',
  '#a34908',
  '#5c190b',
  '#042952',
  '#581f4c',
  '#422f60',
  '#def4d7',
  '#ffebc8',
  '#cdf5ff',
  '#fbe4d6',
  '#ffe3de',
  '#b5ddf9',
  '#fddefb',
  '#dfdbfa'
]
