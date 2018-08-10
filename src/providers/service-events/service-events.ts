import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceEventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceEventsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServiceEventsProvider Provider');
  }


    getEvents()
    {
        return new Promise((resolve, reject) => {
            this.http.get('https://www.superfinanciera.gov.co/sfcweb/evento/list')
              .subscribe(res => {

                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
    }
    /*
    getEvents()
    {
        return new Promise((resolve, reject) => {
            this.http.get('assets/data/banks.json')
              .subscribe(res => {

                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
    }
      */
}
