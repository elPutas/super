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
import { TasasActivasResultPage } from '../pages/tasas-activas-result/tasas-activas-result';

import { TabsPage } from '../pages/tabs/tabs';


//alerts
import { AlertEventPage } from '../pages/alert-event/alert-event';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { CalendarModule } from 'ionic3-calendar-en';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {RlTagInputModule} from 'angular2-tag-input';

import { TrmProvider } from '../providers/trm/trm';


// webpack-translate-loader.ts
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServiceBankProvider } from '../providers/service-bank/service-bank';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}



@Injectable()
export class WA18396Interceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.responseType == 'json') {
			req = req.clone({ responseType: 'text' });

			return next.handle(req).map(response => {
				if (response instanceof HttpResponse) {
					response = response.clone<any>({ body: JSON.parse(response.body) });
				}

				return response;
			});
		}

		return next.handle(req);
	}
}

declare var System: System;
interface System {
  import(request: string): Promise<any>;
}

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.fromPromise(System.import(`../assets/i18n/${lang}.json`));
  }
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
    TasasActivasResultPage,
    AlertEventPage,
    TabsPage
  ],
  imports: [
    RlTagInputModule,
    AutoCompleteModule,
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
    TasasActivasResultPage,
    AlertEventPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceBankProvider,
    TrmProvider
  ]
})
export class AppModule {}
