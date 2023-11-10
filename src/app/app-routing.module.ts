import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {PageNotFoundComponent} from "./pages/404/404.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'style-guide', // 404, Error, Blank 페이지
    loadChildren: () =>
      import('./style-guide/style-guide.module').then(m => m.StyleGuideModule)
  },
  {
    path: 'pages', // 404, Error, Blank 페이지
    loadChildren: () =>
      import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: 'data-catalog',
  //   loadChildren: () =>
  //     import('./features/data-catalog/data-catalog.module').then(m => m.DataCatalogModule)
  // },
  // {
  //   path: 'mypage',
  //   loadChildren: () =>
  //     import('./features/mypage/mypage.module').then(m => m.MypageModule)
  // },
  // {
  //   path: 'guide',
  //   loadChildren: () =>
  //     import('./features/guide/guide.module').then(m => m.GuideModule)
  // },
  // {
  //   path: 'dataportal',
  //   loadChildren: () =>
  //     import('./features/admin/admin.module').then(m => m.AdminModule)
  // },
  // {
  //   path: 'data-view',
  //   component: ViewBiComponent
  // },
  // {
  //   path: 'logindataportal', // 로그인
  //   loadChildren: () =>
  //     import('./features/login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: 'logout', // 로그아웃
  //   component: LogoutComponent
  // },
  // {
  //   path: 'ssoLoginError',  //세션만료
  //   component: SessionOutComponent,
  //   data: {
  //     title: '세션만료'
  //   }
  // },
  // {
  //   path: 'blank', // 빈페이지
  //   component: BlankComponent
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./features/settings/settings.module').then(m => m.SettingsModule)
  // },
  // {
  //   path: 'style-guide',
  //   loadChildren: () =>
  //     import('./features/style-guide/style-guide.module').then(m => m.StyleGuideModule)
  // },
  // {
  //   path: 'init-login',
  //   component: InitLoginComponent,
  //   data: {title: '초기 로그인'}
  // },  // 초기 로그인
  // {
  //   path: 'update-password',
  //   component: UpdatePasswordComponent,
  //   data: {title: '비밀번호 재설정'}
  // },  // 비밀번호 재설정
  // {
  //   path: 'expire-info',
  //   component: ExpireInfoComponent,
  //   data: {title: '비밀번호 사용기한 만료'}
  // },  // 시스템 점검 안내
  // {
  //   path: 'system-check-info',
  //   loadChildren: () =>
  //     import('./features/system-check-info/system-check-info.module').then(m => m.SystemCheckInfoModule)
  // },  // 시스템 점검 안내
  // {
  //   path: 'noexist', // 권한이 없는 페이지
  //   component: NoExistComponent
  // },
  // {
  //   path: 'sk-login',
  //   component: SkLoginComponent,
  //   data: {title: 'SK 로그인'}
  // },  // 초기 로그인
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
