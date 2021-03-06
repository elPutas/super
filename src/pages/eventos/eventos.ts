import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertEventPage } from '../alert-event/alert-event';
import { ServiceEventsProvider } from '../../providers/service-events/service-events';
import { TageoProvider } from '../../providers/tageo/tageo';
/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage
{
    currentEvents:any = [];
    newArray = []
    justInfoEvent = []
    data:any=[]


    constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public modalCtrl: ModalController,
               public tageoProvider:TageoProvider,
               private serviceEventsProvider: ServiceEventsProvider
              )
    {

    }

    itemSelected(data)
    {
        console.log(data)
    }

    //open bottom alert
    presentModal()
    {
        let modal = this.modalCtrl.create(AlertEventPage, {myData:this.justInfoEvent});
        modal.present();
    }

    onDaySelect(data)
    {
        //filer by date
        let myDay = data.date
        let myMonth = data.month
        let myYear = data.year

        this.newArray = this.currentEvents.filter(item => item.date === myDay && item.month === myMonth && myYear === item.year)



        if(this.newArray[0] != undefined)
        {

            this.justInfoEvent = this.newArray[0].info
            this.presentModal()
            console.log("filter",this.justInfoEvent)
        }

    }


    ionViewDidLoad()
    {
        this.serviceEventsProvider.getEvents().then((info:any) => {
          this.currentEvents = [];
          let instance = this;
          info.forEach(function (value) {
            console.log(value);
            let obj = {
              "year": value.year,
              "month": value.month,
              "date": value.day,
              "info": value.info
            };
            instance.currentEvents.push(obj);
          });

        });

        this.tageoProvider.tagSection(5).then(
          (done:any)=>{
          },
          (err:any)=>{
          }
        );

    }
}
