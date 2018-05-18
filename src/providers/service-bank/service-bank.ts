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
  
  getCountries() {
    return this.http.get<any>('assets/data/banks.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
    }

}
