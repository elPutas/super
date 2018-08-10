import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { ActiveRateProvider } from '../../providers/active-rate/active-rate';
import { SocialSharing } from '@ionic-native/social-sharing';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


/**
 * Generated class for the TasasActivasResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasas-activas-result',
  templateUrl: 'tasas-activas-result.html',
})
export class TasasActivasResultPage {

    type: string ="";
    ce: string ="";
    te: string ="";
    tasaori:string ="";

    nameBank:String = "";
    typeCredit:String = "";

    myInfo:any =[];

    tasaShare: boolean = false;
    hideHead: boolean = false;

    pdfObj = null;

    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public events:Events,
      public socialSharing: SocialSharing,
      public plt:Platform,
      public file:File,
      public fileOpener: FileOpener,
      private activeRateProvider:ActiveRateProvider
    )
    {
        this.ce = navParams.get('ce');
        this.te = navParams.get('te');
        this.type = navParams.get('type');
        this.tasaori = navParams.get('tasaori');

        console.log("this.ce", this.ce);
        console.log("this.te", this.te);
    }

    ionViewDidLoad()
    {

        console.log('ionViewDidLoad TasasActivasResultPage');

        if(this.tasaori == "activa"){
          this.activeRateProvider.getEntitiesFiltered(this.te,this.ce, this.type).then(info => {
            this.initdatosGov(info);
          });
        }else{
          this.activeRateProvider.getEntitiesFilteredPasivas(this.te,this.ce, this.type).then(info => {
            this.initdatosGov(info);
          });
        }
    }

    initdatosGov(info){
      let myArr = []
      var size = 0, key;

      this.nameBank = " | " + info[0].sigla;
      this.typeCredit = this.tasaori == "activa" ? " | " + info[0].modalidad_de_credito : " | " + info[0].tipo;

      for (key in info[0])
      {
          if (info[0].hasOwnProperty(key))
          {
              // items hidden
              let codeHide = info[0][key] != "-2.00";
              let typeHide = key != "modalidad_de_credito";
              let nameHide = key != "sigla";
              let ceHide = key != "codigo_entidad";
              let teHide = key != "tipo_entidad";
              let dateHide = key != "fecha_corte";

              let infoName1 = key.replace(/i_n/g, 'ión');
              let infoName2 = infoName1.replace(/_/g, ' ');



              if(codeHide && nameHide && typeHide && ceHide && teHide && dateHide)
              {

                  myArr.push({"name":infoName2, "value":info[0][key]})
              }
              size++;
          }
      }

      this.myInfo = myArr
      console.log("info", myArr)
      //this.txt_btnURL._elementRef.nativeElement.textContent = this.btnURL

      this.events.subscribe('tabs:unhide', (picture) => {
        if(this.tasaShare == true){
          this.uriToBase64(picture).then((pic64:string)=>{
            var tabBarElement = document.getElementsByClassName('tabbar') as HTMLCollectionOf<HTMLElement>;

            if (tabBarElement.length != 0) {
              for(let i = 0; i < tabBarElement.length; i++ ){
                tabBarElement[i].style.opacity = "1";
              }
            }

            this.unhideHeader();
            this.socialSharing.share(this.nameBank.toString()+"\r "+this.typeCredit.toString(), null, pic64, "https://www.superfinanciera.gov.co")
                              .then(() => {
                                // Success!
                              }).catch((error) => {
                                // Error!
                                console.log(error);
                              });

          });

        }
      });
    }

    hideHeader(){
      this.hideHead = true;
      var headerElement = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
      for(let i = 0; i < headerElement.length; i++ ){
        headerElement[i].style.display = "none";
        if((headerElement.length-1) == i){
          var scrollElement = document.getElementsByClassName('scroll-content') as HTMLCollectionOf<HTMLElement>;
          for(let j = 0; j < scrollElement.length; j++ ){
            scrollElement[j].style.marginTop = "0px";//ori 56px
            scrollElement[j].scrollTop = 0;

            if((scrollElement.length-1) == j){
              var contentElement = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;

              for(let n = 0; n < contentElement.length; n++ ){
                contentElement[n].style.padding = "0px";
                if((contentElement.length-1) == n){

                  this.events.publish('tabs:hide');

                }
              }

            }
          }

        }
      }
    }

    unhideHeader(){
      this.hideHead = false;
      var headerElement = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
      for(let i = 0; i < headerElement.length; i++ ){
        headerElement[i].style.display = "block";
        if((headerElement.length-1) == i){

          var scrollElement = document.getElementsByClassName('scroll-content') as HTMLCollectionOf<HTMLElement>;
          for(let j = 0; j < scrollElement.length; j++ ){
            scrollElement[j].style.marginTop = "56px";//ori 56px
            scrollElement[j].scrollTop = 0;

            if((scrollElement.length-1) == j){
              var contentElement = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;

              for(let n = 0; n < contentElement.length; n++ ){
                contentElement[n].style.padding = "16px";

              }

            }
          }

        }
      }

    }

    uriToBase64(MY_URL){
      return new Promise((resolve) => {
        var request = new XMLHttpRequest();
        request.open('GET', MY_URL, true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  function(e){
                resolve(reader.result);
            };
        };
        request.send();
      });

    }

    picShare(){
      this.tasaShare = true;
      this.hideHeader();
    }

    createPdf(share) {
      //myInfo
      var obj_content:any = [];
      for(let i = 0; i < this.myInfo.length; i++ ){
        //var trama  = { text:this.myInfo[i].name +" "+ this.myInfo[i].value , alignment: 'center' };
        obj_content.push(
          this.myInfo[i].name +" "+ this.myInfo[i].value
        );
      }
      var docDefinition = {
        content: [
          { text: this.nameBank, style: 'header' },
          { text: this.typeCredit, style: 'subheader' },
          {
            ul: obj_content
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          }
        }
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
      if(share==true){
        this.downloadPdf(true);
      }else{
        this.downloadPdf(false);
      }
    }

    downloadPdf(share) {
      if (this.plt.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });

          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'tasaToShare.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            if(share==false){
              this.fileOpener.open(this.file.dataDirectory + 'tasaToShare.pdf', 'application/pdf');
            }else{
              this.socialSharing.share(this.nameBank.toString()+"\r "+this.typeCredit.toString(), null, this.file.dataDirectory + 'tasaToShare.pdf', "https://www.superfinanciera.gov.co")
                                .then(() => {
                                  // Success!
                                }).catch((error) => {
                                  // Error!
                                  console.log(error);
                                });
            }
          })
        });
      } else {
        // On a browser simply use download!
        this.pdfObj.download();
      }
    }

    public regularShare(){
      //this.picShare();
      this.createPdf(true);
    }

}
