import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from './animations/route.animations';
import { AnimationsService } from './animations/animations.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { LocalStorageService } from './local-storage/local-storage.service';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { NotificationService, ErrNotificationComponent } from './notifications/notification.service';
import { SettingsEffects } from './settings/settings.effects';
import {
  selectSettingsLanguage,
  selectEffectiveTheme
} from './settings/settings.selectors';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

import {
  AppState,
  reducers,
  metaReducers,
  selectRouterState
} from './core.state';
import { AuthEffects } from '../auth/store/auth.effects';
import { selectIsAuthenticated, selectAuth } from '../auth/store/auth.selectors';
import { authLogin, authLogout } from '../auth/store/auth.actions';
import { AuthGuardService } from '../auth/store/auth-guard.service';
import { TitleService } from './title/title.service';
import { MatIconModule } from "@angular/material/icon";
import { ToastrModule } from 'ngx-toastr';

export {
  TitleService,
  selectAuth,
  authLogin,
  authLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated,
  ROUTE_ANIMATIONS_ELEMENTS,
  AnimationsService,
  AuthGuardService,
  selectRouterState,
  NotificationService,
  selectEffectiveTheme,
  selectSettingsLanguage,
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    ToastrModule.forRoot({
      // closeButton: true,
      timeOut: 8000,
      extendedTimeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      toastClass: 'toast toast-bootstrap-compatibility-fix'
    }),
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      AuthEffects,
      SettingsEffects
    ]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'ENCORE DP'
      }),
    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    ErrNotificationComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false }
  ],
  exports: [
    // angular
    FormsModule,
    // material
    MatSnackBarModule,
    MatIconModule,
    // 3rd party
    TranslateModule,
    ToastrModule,
    ErrNotificationComponent
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
