import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TasasPage } from '../tasas/tasas';
import { EntidadesPage } from '../entidades/entidades';
import { RedesPage } from '../redes/redes';
import { EventosPage } from '../eventos/eventos';
import { TrmProvider } from '../../providers/trm/trm';

import { Screenshot } from '@ionic-native/screenshot';
import {PqrsfPage} from "../pqrsf/pqrsf";
import {ConsultaPqrPage} from "../consulta-pqr/consulta-pqr";
import {DenunciaPage} from "../denuncia/denuncia";
import {ConsultaOficinaPage} from "../consulta-oficina/consulta-oficina";
import {TarifasPage} from "../tarifas/tarifas";
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
  tab6Root = PqrsfPage;
  tab7Root = ConsultaPqrPage;
  tab8Root = DenunciaPage;
  tab9Root = ConsultaOficinaPage;
  tab10Root= TarifasPage;

  constructor(
    public events: Events,
    public screenshot: Screenshot
  ) {

    this.events.subscribe('tabs:hide', () => {

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

          }


        }
      }

    });

  }
}
