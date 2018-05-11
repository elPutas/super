import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntidadesPage } from './entidades';

@NgModule({
  declarations: [
    EntidadesPage,
  ],
  imports: [
    IonicPageModule.forChild(EntidadesPage),
  ],
})
export class EntidadesPageModule {}
