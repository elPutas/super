import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RedesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redes',
  templateUrl: 'redes.html',
})
export class RedesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedesPage');
  }
  
  ngAfterViewInit() {
      !function(d,s,id){
            var js: any,
                fjs=d.getElementsByTagName(s)[0],
                p='https';
                js=d.createElement(s);
                js.id=id;
                js.src=p+"://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js,fjs);
        }
        (document,"script","twitter-wjs");
    }
}
