import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the EntitiesInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntitiesInfoProvider 
{
    

    constructor(public http: HttpClient) {
        console.log('Hello EntitiesInfoProvider Provider');
    }

    getInfo(_te, _ce) 
    {
        
        
        let apiUrl = "https://www.datos.gov.co/resource/sr9n-792w.json?"
        let te = "tipo_entidad="+_te;
        let ce = "cod_entidad="+_ce;
        
        console.log("URL", apiUrl+te+"&"+ce)
        
        return new Promise((resolve, reject) => {
            this.http.get(apiUrl+te+"&"+ce)
              .subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
        });
    }
}
