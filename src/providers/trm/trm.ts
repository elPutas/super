import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Enums from '../../enums/enums';

/*
  Generated class for the TrmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrmProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello TrmProvider Provider');
  }

  httpGetTrmGovco(start, end): any{
      //let apiUrl = Enums.DATOSGOVCO_BASE+'/g3ab-sax9.json?$where=vigenciahasta%20BETWEEN%20%27';
      let apiUrl = "https:\//www.datos.gov.co/resource/g3ab-sax9.json?$where=vigenciahasta%20BETWEEN%20%27"
      let from = start;
      let to = end;

      return new Promise((resolve, reject) => {
        this.http.get(apiUrl+from+'%27%20AND%20%27'+end+'%27')
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });

    }

}
