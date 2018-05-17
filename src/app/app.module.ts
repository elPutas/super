import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//pages
import { HomePage } from '../pages/home/home';
import { TasasPage } from '../pages/tasas/tasas';
import { EntidadesPage } from '../pages/entidades/entidades';
import { RedesPage } from '../pages/redes/redes';
import { EventosPage } from '../pages/eventos/eventos';

import { TasasActivasPage } from '../pages/tasas-activas/tasas-activas';

import { TabsPage } from '../pages/tabs/tabs';

import {HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { CalendarModule } from 'ionic3-calendar-en';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {RlTagInputModule} from 'angular2-tag-input';
import { TrmProvider } from '../providers/trm/trm';

// AoT requires an exported function for factories
/*export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "/public/i18n/", "-lang.json");
}*/

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "../assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TasasPage,
    EntidadesPage,
    RedesPage,
    EventosPage,
    TasasActivasPage,
    TabsPage
  ],
  imports: [
    RlTagInputModule,
    CalendarModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TasasPage,
    EntidadesPage,
    RedesPage,
    EventosPage,
    TasasActivasPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TrmProvider
  ]
})
export class AppModule {}
