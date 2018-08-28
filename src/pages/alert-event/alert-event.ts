import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the AlertEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alert-event',
  templateUrl: 'alert-event.html',
})
export class AlertEventPage
{
    infoArray = []
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public socialSharing: SocialSharing,
      public events:Events,
      public viewCtrl: ViewController
    )
    {
        this.infoArray = navParams.get("myData")
        console.log(this.infoArray)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AlertEventPage');
        this.events.subscribe('tabs:unhide', (picture) => {
          this.uriToBase64(picture).then((pic64:string)=>{

            var tabBarElement = document.getElementsByClassName('tabbar') as HTMLCollectionOf<HTMLElement>;
            if (tabBarElement.length != 0) {
              for(let i = 0; i < tabBarElement.length; i++ ){
                tabBarElement[i].style.opacity = "1";
              }
            }

            this.socialSharing.share("evento", null, pic64, "https://www.superfinanciera.gov.co")
            .then(() => {
              // Success!
            }).catch((error) => {
            // Error!
            console.log(error);
          });


          });
        });
    }

    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }

    public regularShare(){
      this.events.publish('tabs:hide');
    }

    uriToBase64(MY_URL){
      return new Promise((resolve) => {
        var request = new XMLHttpRequest();
        request.open('GET', MY_URL, true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  function(e){
                resolve(reader.result);
            };
        };
        request.send();
      });

    }

}
