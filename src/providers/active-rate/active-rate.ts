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

    getEntitiesSuperfinanc()
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

    getEntitiesFiltered(_te, _ce, _type)
    {
        let apiUrl = "https://www.datos.gov.co/resource/wnsa-ce2u.json?"
        let te = "tipo_entidad="+_te;
        let ce = "codigo_entidad="+_ce;
        let type = "modalidad_de_credito="+_type;


        console.log("URL", apiUrl+te+"&"+ce+"&"+type)

        return new Promise<any>((resolve, reject) => {
            this.http.get(apiUrl+te+"&"+ce+"&"+type)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
    }

    getEntitiesPasivas()
    {
        return new Promise<any>((resolve, reject) => {
            this.http.get('https://www.datos.gov.co/resource/k5ms-eavc.json')
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
    }

    getEntitiesFilteredPasivas(_te, _ce, _type)
    {
        let apiUrl = "https://www.datos.gov.co/resource/k5ms-eavc.json?"
        let te = "tipo_entidad="+_te;
        let ce = "codigo_entidad="+_ce;
        let type = "tipo="+_type;


        console.log("URL", apiUrl+te+"&"+ce+"&"+type)

        return new Promise<any>((resolve, reject) => {
            this.http.get(apiUrl+te+"&"+ce+"&"+type)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
    }

}
