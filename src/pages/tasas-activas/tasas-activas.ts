import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TasasActivasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasas-activas',
  templateUrl: 'tasas-activas.html',
})
export class TasasActivasPage {

public autocompleteTags = [];
  public autocompleteItems = [
    'BANCO DE LA REPÚBLICA',
    'BANCO DE BOGOTÁ',
    'BANCO POPULAR',
    'BANCO CORPBANCA COLOMBIA S.A.',
    'BANCOLOMBIA',
    'CITIBANK COLOMBIA',
    'BANCO GNB SUDAMERIS COLOMBIA',
    'BBVA COLOMBIA'
  ];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasasActivasPage');
  }

}
