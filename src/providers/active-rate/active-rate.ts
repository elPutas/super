import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ActiveRateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActiveRateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ActiveRateProvider Provider');
  }

    getEntities() 
    {
        return new Promise<any>((resolve, reject) => {
            this.http.get('https://www.datos.gov.co/resource/wnsa-ce2u.json')
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
    }
}
