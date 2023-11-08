export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  isFirst?: boolean; // 처음 로그인
  isExpiredPassword? : boolean; //비밀번호 만료
  login?: any;
  auth?: Auth | null | any;
  info?: UserInfo;
  dashboard?: Dashboard;
  backHistoryStatus?: boolean;
  menu?: {
    allMenus: any; // 기본 전체 메뉴 리스트
    data: Array<MenuNode> | any; // 사용자 그룹에 속한 메뉴 리스트
  } | any;
}

export interface UserInfo {
  COMP_SEQ: string;
  REG_DATE: string;
  USER_COMP: string;
  USER_COMP_TEL: string;
  USER_DUTY: string;
  USER_EMAIL: string;
  USER_JOB: string;
  USER_NAME: string;
  USER_NAME_CARD: string;
  USER_PHONE: string;
  U_SEQ: string;
}


export interface PwchParams {
  uuid?: string;
  password?: string;
  new_password?: string;
  ck_new_password?: string;
  u_seq?: string;
}

export interface User {
  userId: number;
  userNm: string;
  loginId: string;
}

export interface Auth {
  user: any;
  access_token: string;
  ndr_yn: boolean;
  isFirst?: boolean;
  isExpiredPassword?: boolean;
  verifyingEmail?: boolean // 임시비밀번호 시
}

export interface Dashboard {
  cols?: number;
  rows?: number;
  x?: number;
  y?: number;
  config: {};
  disabled: boolean;
  minItemCols?: number;
  minItemRows?: number;
}

export interface MenuNode {
  _id: string | null, // 메뉴 id
  name: string; // 메뉴명
  expanded: boolean, // 펼침 상태
  children: Array<MenuNode>; // 자식 메뉴
  kr?: string;
  en?: string;
  cn?: string;
  link?: string;
  external?: boolean;
}
