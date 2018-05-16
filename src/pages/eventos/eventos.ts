import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertEventPage } from '../alert-event/alert-event';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage 
{


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }
  
  presentModal() {
    let modal = this.modalCtrl.create(AlertEventPage);
    modal.present();
  }
  
  
    

  ionViewDidLoad() {
    
    /*
    this.currentEvents = [
      {
        year: 2018,
        month: 5,
        date: 15
      },
      {
        year: 2018,
        month: 5,
        date: 13
      }
    ];
    
    //console.log('ionViewDidLoad EventosPage', this.currentEvents);
    */
  }

}





