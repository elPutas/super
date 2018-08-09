import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceBankProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceBankProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServiceBankProvider Provider');
  }

  getEntities()
  {
        return new Promise<any>((resolve, reject) => {
            this.http.get('https://www.datos.gov.co/resource/sr9n-792w.json')
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
    }

    getEntitiesSuperFinanc()
    {
          return new Promise<any>((resolve, reject) => {
              this.http.get('https://www.superfinanciera.gov.co/WebServiceEntidades/rest/entidad/listarEntidades.json')
                .subscribe(res => {
                  resolve(res);
                }, (err) => {
                  reject(err);
                });
            });
      }

}
