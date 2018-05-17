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

     currentEvents = [
        {
            year: 2018,
            month: 4,
            date: 15
        },
        {
            year: 2018,
            month: 4,
            date: 13
        }
      ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }
  
  presentModal() {
    let modal = this.modalCtrl.create(AlertEventPage);
    modal.present();
  }
  
  
    
  onDaySelect(data)
  {
    console.log("click", data)
    this.presentModal()
  }
    

  ionViewDidLoad() {
    
  }

}





