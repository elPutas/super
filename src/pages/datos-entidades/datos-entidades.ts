import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntitiesInfoProvider } from '../../providers/entities-info/entities-info';

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
    
    ciudad: string = ""
    direccion: string = ""
    razon_social: string = ""
    emailprincipal: string = ""
    nombrepublicocargo: string = ""
    representante_legal: string = ""
    numeroidentificacion: string = ""
    btnURL: string
    
    
    text;
    
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
      
     private entitiesInfoProvider: EntitiesInfoProvider
    ) 
    {
        this.ce = navParams.get('ce');
        this.te = navParams.get('te');
     
    }

    ionViewDidLoad() 
    {
        console.log('ionViewDidLoad DatosEntidadesPage');
        
      
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

            //set info
            this.txt_ciudad.nativeElement.textContent = this.ciudad
            this.txt_direccion.nativeElement.textContent = this.direccion
            this.txt_razon_social.nativeElement.textContent = this.razon_social
            this.txt_emailprincipal.nativeElement.textContent = this.emailprincipal
            this.txt_nombrepublicocargo.nativeElement.textContent = this.nombrepublicocargo
            this.txt_representante.nativeElement.textContent = this.representante_legal
            this.txt_numeroidentificacion.nativeElement.textContent = this.numeroidentificacion
            
            this.text = this.btnURL;
            
            
            //this.txt_btnURL._elementRef.nativeElement.textContent = this.btnURL
          
        });
  }

}
