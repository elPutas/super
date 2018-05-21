import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosEntidadesPage } from './datos-entidades';

@NgModule({
  declarations: [
    DatosEntidadesPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosEntidadesPage),
  ],
})
export class DatosEntidadesPageModule {}
