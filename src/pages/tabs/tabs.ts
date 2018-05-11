import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { TasasPage } from '../tasas/tasas';
import { EntidadesPage } from '../entidades/entidades';
import { RedesPage } from '../redes/redes';
import { EventosPage } from '../eventos/eventos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TasasPage;
  tab3Root = EntidadesPage;
  tab4Root = RedesPage;
  tab5Root = EventosPage;

  constructor() {

  }
}
