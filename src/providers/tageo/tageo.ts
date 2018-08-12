import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TageoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TageoProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello TageoProvider Provider');
  }

  tagSection(idsection)
  {
      return new Promise((resolve, reject) => {
          this.http.get('https://www.superfinanciera.gov.co/sfcweb/usabilidad/registrar?id_disp=2&id_opc='+idsection)
            .subscribe(res => {

              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
  }

}
