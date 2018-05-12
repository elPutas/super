import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasasActivasPage } from './tasas-activas';

@NgModule({
  declarations: [
    TasasActivasPage,
  ],
  imports: [
    IonicPageModule.forChild(TasasActivasPage),
  ],
})
export class TasasActivasPageModule {}
