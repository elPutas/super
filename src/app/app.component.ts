import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../pages/tabs/tabs';
/*
  informacion sobre la traduccion muy importante
  https://www.reddit.com/r/Angular2/comments/88rf25/angular_translations/
  basicamente en package.json => dependencies:
  "@ngx-translate/core": "9.1.1", bajarla de la version 10.1.1 a 9.1.1
  sino la traduccion se va a tomar por el culo

  este plunk podria talvez arreglar esa mierda en la libreria
  http://plnkr.co/edit/Yjh9qLSzLSfCWI77xW3f?p=info

  en el github de la libreria https://github.com/ngx-translate/core
  para angular 5 se usa @ngx-translate/core 8.x to 9.x	@ngx-translate/http-loader 1.x to 2.x
*/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService
  ) {
    platform.ready().then(() => {
      this.translate.addLangs(["en","es"]);
      this.translate.setDefaultLang('es');

      let browserLang = this.translate.getBrowserLang();
      console.log(browserLang);
      this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.show();
      splashScreen.hide();
    });
  }
}
