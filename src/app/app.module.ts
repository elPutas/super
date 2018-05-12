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

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { CalendarModule } from 'ionic3-calendar-en';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {RlTagInputModule} from 'angular2-tag-input';

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
    IonicModule.forRoot(MyApp),
    
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
