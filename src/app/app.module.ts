//Core
import { EMPTY } from 'rxjs';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//HTTP Module
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Global router
import { AppRoutingModule } from './router/app.routing';

//Global interceptor
import { AppInterceptor } from './core/http/app.interceptor';

//Modular components
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

//Entry rendering component
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

//Services
import { JwtService } from './services/jwt.service';
import { UserService } from './services/user.service';

//Locales
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeUkr from '@angular/common/locales/uk';
import { LanguagesService } from './services/languages.service';
import { LocaleService } from './services/locale.service';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeUkr, 'uk');

export function initAuth(jwtService: JwtService, userService: UserService) {
  return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    AppRoutingModule,
    SpinnerComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
    LocaleService,
    LanguagesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
