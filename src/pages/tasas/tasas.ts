import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TasasActivasPage } from '../tasas-activas/tasas-activas';
import { TasasPasivasPage } from '../tasas-pasivas/tasas-pasivas';
/**
 * Generated class for the TasasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasas',
  templateUrl: 'tasas.html',
})
export class TasasPage 
{
    tasasActivasPage = TasasActivasPage
    tasasPasivasPage = TasasPasivasPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasasPage');
  }

}
