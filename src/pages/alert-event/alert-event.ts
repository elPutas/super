import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AlertEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert-event',
  templateUrl: 'alert-event.html',
})
export class AlertEventPage 
{
    infoArray = []
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) 
    {
        this.infoArray = navParams.get("myData")
        console.log(this.infoArray)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AlertEventPage');
    }
  
    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }

}
