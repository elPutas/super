import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TasasPage } from '../tasas/tasas';
import { EntidadesPage } from '../entidades/entidades';
import { RedesPage } from '../redes/redes';
import { EventosPage } from '../eventos/eventos';
import { TrmProvider } from '../../providers/trm/trm';

import { Screenshot } from '@ionic-native/screenshot';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //showTabs:boolean = true;
  //tabBarElement:any;
  //tabBarElementBtn:any;
  tab1Root = HomePage;
  tab2Root = TasasPage;
  tab3Root = EntidadesPage;
  tab4Root = RedesPage;
  tab5Root = EventosPage;

  constructor(
    public events: Events,
    public screenshot: Screenshot
  ) {
    //this.tabBarElement = document.querySelector('#tabs .tabbar');
    //this.tabBarElementBtn = document.querySelector('#tabs .tabbar .tab-button');
    this.events.subscribe('tabs:hide', () => {
      //this.showTabs = false; background: #0669eb !important;
      //this.tabBarElement.style.background = "#0669eb !important";
      //this.tabBarElementBtn.style.opacity = "0";
      //var tabBarElement = document.querySelector('#tabs .tabbar');
      //var tabBarElementBtn = document.querySelector('#tabs .tabbar .tab-button');
      var tabBarElement = document.getElementsByClassName('tabbar') as HTMLCollectionOf<HTMLElement>;
      //var tabBarElementBtn = document.getElementsByClassName('tab-button') as HTMLCollectionOf<HTMLElement>;
      if (tabBarElement.length != 0) {
        for(let i = 0; i < tabBarElement.length; i++ ){
          //tabBarElement[i].style.background = "#0669eb !important";
          tabBarElement[i].style.opacity = "0";
          if(i == tabBarElement.length - 1){
            // ion tabs
            //if (tabBarElementBtn.length != 0) {
            setTimeout(() => {
              // screenshot
              this.screenshot.save('jpg', 80, 'myscreenshot_trm').then(
                  (res)=>{
                    console.log(res);
                    this.events.publish('tabs:unhide', res.filePath);
                  },
                  (err)=>{
                    console.log(err);
                  }
                );

            }, 1000);
              /*for(let j = 0; j < tabBarElementBtn.length; j++ ){
                tabBarElementBtn[j].style.opacity = "0";
                // screenshot
                if(j == tabBarElementBtn.length - 1){
                  this.screenshot.save('jpg', 80, 'myscreenshot_trm').then(
                    (res)=>{
                      console.log(res);
                      this.events.publish('tabs:unhide', res.filePath);
                    },
                    (err)=>{
                      console.log(err);
                    }
                  );
                }

              }*/

            //}

          }


        }
      }

    });

    /*this.events.subscribe('tabs:unhide', (picture) => {
      //this.showTabs = true;
      //document.querySelector('#tabs .tabbar').style.background = "#f8f8f8 !important";
      //document.querySelector('#tabs .tabbar .tab-button').style.opacity = "1";
      var tabBarElement = document.getElementsByClassName('tabbar') as HTMLCollectionOf<HTMLElement>;
      var tabBarElementBtn = document.getElementsByClassName('tab-button') as HTMLCollectionOf<HTMLElement>;
      var auximg = document.getElementById('imgCanvas') as HTMLImageElement;
      auximg.style.display = 'none';

      if (tabBarElement.length != 0) {

        tabBarElement[0].style.background = "#f8f8f8 !important";
      }
      if (tabBarElementBtn.length != 0) {
        for(let i = 0; i < tabBarElementBtn.length; i++ ){
          tabBarElementBtn[i].style.opacity = "1";
        }
      }
    });*/
  }
}
