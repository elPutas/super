import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EntitiesInfoProvider } from '../../providers/entities-info/entities-info';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DatosEntidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-entidades',
  templateUrl: 'datos-entidades.html',
})
export class DatosEntidadesPage {


    @ViewChild('txt_ciudad') txt_ciudad: ElementRef;
    @ViewChild('txt_direccion') txt_direccion: ElementRef;
    @ViewChild('txt_razon_social') txt_razon_social: ElementRef;
    @ViewChild('txt_emailprincipal') txt_emailprincipal: ElementRef;
    @ViewChild('txt_nombrepublicocargo') txt_nombrepublicocargo: ElementRef;
    @ViewChild('txt_representante') txt_representante: ElementRef;
    @ViewChild('txt_numeroidentificacion') txt_numeroidentificacion: ElementRef;
    @ViewChild('txt_btnURL') txt_btnURL: ElementRef;

    ce: string ="";
    te: string ="";
    origin:string ="";

    ciudad: string = "";
    direccion: string = "";
    razon_social: string = "";
    emailprincipal: string = "";
    nombrepublicocargo: string = "";
    representante_legal: string = "";
    numeroidentificacion: string = "";
    btnURL: string;
    hideHead: boolean = false;
    shareEntidad: boolean = false;


    text;

  constructor(
     public navCtrl: NavController,
     public events:Events,
     public navParams: NavParams,
     public socialSharing: SocialSharing,
     private entitiesInfoProvider: EntitiesInfoProvider
    )
    {
        this.ce = navParams.get('ce');
        this.te = navParams.get('te');
        //this.origin = navParams.get('origin');

    }

    ionViewDidLoad()
    {
        console.log('ionViewDidLoad DatosEntidadesPage');

        this.entitiesInfoProvider.getInfoSuperFinanc(this.te,this.ce).then((ent:any) => {

            //get info
            this.ciudad = ent.nombreCiudadEntidad;
            this.direccion = ent.direccionEntidad;
            this.emailprincipal = '';
            this.nombrepublicocargo = '';
            this.numeroidentificacion = ent.numeroIdentificacionEntidad;
            this.razon_social = ent.nombreEntidad;
            this.representante_legal = ent.nombreRepresentanteLegal;
            this.btnURL = ent.paginaWebEntidad != "null" ? ent.paginaWebEntidad : "";

            this.setInfoEntidad();
        }, err=>{
          this.entitiesInfoProvider.getInfo(this.te,this.ce).then(info => {

              //get info
              this.ciudad = info[0].ciudad
              this.direccion = info[0].direccion
              this.emailprincipal = info[0].emailprincipal
              this.nombrepublicocargo = info[0].nombrepublicocargo
              this.numeroidentificacion = info[0].numeroidentificacion
              this.razon_social = info[0].razon_social
              this.representante_legal = info[0].representante_legal
              this.btnURL = info[0].uripaginaweb

              this.setInfoEntidad();
          });
        });
  }

  setInfoEntidad(){
    this.txt_ciudad.nativeElement.textContent = this.ciudad
    this.txt_direccion.nativeElement.textContent = this.direccion
    this.txt_razon_social.nativeElement.textContent = this.razon_social
    this.txt_emailprincipal.nativeElement.textContent = this.emailprincipal
    this.txt_nombrepublicocargo.nativeElement.textContent = this.nombrepublicocargo
    this.txt_representante.nativeElement.textContent = this.representante_legal
    this.txt_numeroidentificacion.nativeElement.textContent = this.numeroidentificacion

    this.text = this.btnURL;

    this.events.subscribe('tabs:unhide', (picture) => {
      if(this.shareEntidad == true){
        this.uriToBase64(picture).then((pic64:string)=>{

          var tabBarElement = document.getElementsByClassName('tabbar') as HTMLCollectionOf<HTMLElement>;
          if (tabBarElement.length != 0) {
            for(let i = 0; i < tabBarElement.length; i++ ){
              tabBarElement[i].style.opacity = "1";
            }
          }

          this.unhideHeader();
          this.socialSharing.share("entidad", null, pic64, "https://www.superfinanciera.gov.co")
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
    var headerElement = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
    for(let i = 0; i < headerElement.length; i++ ){
      headerElement[i].style.display = "none";
      if((headerElement.length-1) == i){

        var scrollElement = document.getElementsByClassName('scroll-content') as HTMLCollectionOf<HTMLElement>;
        for(let j = 0; j < scrollElement.length; j++ ){
          scrollElement[j].style.marginTop = "0px";//ori 56px
          scrollElement[j].style.marginBottom = "0px";
          scrollElement[j].style.padding = "0px";// ori 16px
          scrollElement[j].scrollTop = 0;

          if((scrollElement.length-1) == j){
            var contentElement = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;
            for(let n = 0; n < contentElement.length; n++ ){
              contentElement[n].style.padding = "0px";
              if((contentElement.length-1) == n){
                this.hideHead = true;

                var listElement = document.getElementsByClassName('list') as HTMLCollectionOf<HTMLElement>;
                for(let m = 0; m < listElement.length; m++ ){
                  listElement[m].style.marginTop = "1px";//ori 20px
                  if((listElement.length-1) == m){

                    this.events.publish('tabs:hide');
                  }//end if listElement
                }


              }//end if scrollElement

            }

          }//end if scrollElement

        }

      }//end if headerElement

    }

  }

  unhideHeader(){
    var headerElement = document.getElementsByClassName('header') as HTMLCollectionOf<HTMLElement>;
    for(let i = 0; i < headerElement.length; i++ ){
      headerElement[i].style.display = "block";
      if((headerElement.length-1) == i){

        var scrollElement = document.getElementsByClassName('scroll-content') as HTMLCollectionOf<HTMLElement>;
        for(let j = 0; j < scrollElement.length; j++ ){
          scrollElement[j].style.marginTop = "56px";
          scrollElement[j].style.marginBottom = "56px";
          scrollElement[j].style.padding = "16px";
          //scrollElement[j].scrollTop = 0;

          if((scrollElement.length-1) == j){
            var contentElement = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;
            for(let n = 0; n < contentElement.length; n++ ){
              contentElement[n].style.padding = "16px";
              if((contentElement.length-1) == n){
                this.hideHead = true;

                var listElement = document.getElementsByClassName('list') as HTMLCollectionOf<HTMLElement>;
                for(let m = 0; m < listElement.length; m++ ){
                  listElement[m].style.marginTop = "20px";//ori 20px
                  /*if((listElement.length-1) == m){

                    //this.events.publish('tabs:hide');
                  }*///end if listElement
                }


              }//end if scrollElement

            }

          }//end if scrollElement

        }

      }//end if headerElement

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

  public regularShare(){
    this.shareEntidad = true;
    this.hideHeader();
  }

}
