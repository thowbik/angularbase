
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import { AuthGuard } from './shared/auth/auth-guard.service';
import { AuthenticationService } from 'services/authentication.service';
import { AlertService } from 'services/alert.service';
import { UserSessionService } from 'services/usersession.service';
import { DataService } from 'services/data.service';
import { HttpInterceptorService } from 'services/interceptor.service';
import { NavigationService } from 'services/navigation.service';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DepartmentService } from 'services/department.service';
import { TopUpService } from 'services/topup.service';
import { UtilityService } from 'services/utility.service';
import { ForgotpasswordComponent } from './pages/content-layout-page/login/forgotpassword.component';
import { ForgotpasswordModule } from './pages/content-layout-page/login/forgotpassword.module';
import { ChangepasswordComponent } from './pages/content-layout-page/changepassword/changepassword.component';
import { ChangepasswordModule } from './pages/content-layout-page/changepassword/changepassword.module';
import { UserService } from 'services/user.service';
import { DashboardService } from 'services/dashboard.service';
import { PageService } from 'services/page.service';
import { HelpComponent } from './pages/content-layout-page/help/help.component';
import { HelpModule } from './pages/content-layout-page/help/help.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ForgotpasswordModule,
    ChangepasswordModule,
    HelpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    PerfectScrollbarModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserSessionService,
    NavigationService,
    DepartmentService,
    DashboardService,
    PageService,
    TopUpService,
    UtilityService,
    DataService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [AppComponent],
  entryComponents:
    [
      SpinnerComponent,
      ForgotpasswordComponent,
      ChangepasswordComponent,
      HelpComponent
    ]
})
export class AppModule { }
