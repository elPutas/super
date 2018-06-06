import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
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
      let apiUrl = "https://www.datos.gov.co/resource/g3ab-sax9.json?$where=vigenciahasta%20BETWEEN%20%27"
      let from = start;
      let to = end;

      return new Promise((resolve, reject) => {
        this.http.get(apiUrl+from+'%27AND%27'+end+'%27')
          .subscribe(res => {
            resolve(res);
          }, (err: HttpErrorResponse) => {
            console.log(err);
            reject(new Error(err.message));
          });
      })

    }

    httpGetTrmsuperFinc(datestring:string):any{
      /*var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https:\//www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl', true);
      var sr = '<soapenv:Envelope xmlns:soapenv="http:\//schemas.xmlsoap.org/soap/envelope/" xmlns:act="http:\//action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/">'+
                  '<soapenv:Header/>'+
                  '<soapenv:Body>'+
                  '<act:queryTCRM>'+
                  '<!--Optional:-->'+
                  '<tcrmQueryAssociatedDate>'+datestring+'</tcrmQueryAssociatedDate>'+
                  '</act:queryTCRM>'+
                  '</soapenv:Body>'+
                '</soapenv:Envelope>';

      return new Promise((resolve, reject) => {
        xmlhttp.onreadystatechange =  () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              var xml = xmlhttp.responseXML;
              console.log(xml.getElementsByTagName("return")[0].childNodes[4].nodeValue);
              resolve(xml.getElementsByTagName("return")[0].childNodes[4].nodeValue);
            }else{
              reject(xmlhttp);
            }
          }
        }

        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
      });*/

      var data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
      "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:act=\"http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/\">\n  <soapenv:Header/>\n  <soapenv:Body>\n  <act:queryTCRM>\n  <!--Optional:-->\n  <tcrmQueryAssociatedDate>"+datestring+"</tcrmQueryAssociatedDate>\n  </act:queryTCRM>\n  </soapenv:Body>\n</soapenv:Envelope>";

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      return new Promise((resolve, reject) => {

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            if (this.status == 200) {
              var xml = this.responseXML;
              console.log(xml.getElementsByTagName("return")[0].childNodes[4].textContent);
              resolve(xml.getElementsByTagName("return")[0].childNodes[4].textContent);
            }else{
              reject(this);
            }
          }
        });

        xhr.open("POST", "https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl=");
        xhr.setRequestHeader("Content-Type", "text/xml");
        //xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8100");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        //xhr.setRequestHeader("Postman-Token", "3b7921c0-0503-4e1b-b5cc-23f2b760ef18");

        xhr.send(data);

      });

    }


}
