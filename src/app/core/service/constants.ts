import { TranslationWidth } from '@angular/common';
import { Injectable } from '@angular/core';

export const MOBILE =
  typeof window !== 'undefined' ? window.screen.availWidth < 800 : true;
// 테스트 서버
// export const API_BASE_URL: string = `https://localhost:6200`;
export const API_BASE_URL: string = `https://192.168.0.95:4000`; // 서브원 서버
// export const API_BASE_URL: string = `http://192.168.0.193:3000`;  // 팀장님서버

