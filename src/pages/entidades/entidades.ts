import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatosEntidadesPage } from '../datos-entidades/datos-entidades';
import { ServiceBankProvider } from '../../providers/service-bank/service-bank';
/**
 * Generated class for the EntidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entidades',
  templateUrl: 'entidades.html',
})
export class EntidadesPage 
{
    
    @ViewChild('list_options') myListRef: ElementRef;
    @ViewChild('input_text') myInputRef: ElementRef;
    check = true;
    banks = [];
    razon_social:any = [];
    _data = [];
    
    text_select = ""
    
    filteredCountriesSingle: any[] =[];
    
    selectedEntity_te :any  = [];
    selectedEntity_ce :any = [];
    
    tipo_entidad:any[] = [];
    cod_entidad:any[] = [];
    countries:any[] = [];
    
    
    public autocompleteTags = [];


    
    constructor(public navCtrl: NavController,public navParams: NavParams,private serviceBankProvider:ServiceBankProvider ) 
    {
        console.log('EntidadesPage', this.serviceBankProvider);

        this.navParams = navParams 
        this.navCtrl = navCtrl  
    }
  
    itemSelected(data)
    {
        console.log("data", data)
        this.filteredCountriesSingle = []
        
        this.selectedEntity_te = data.tipo_entidad
        this.selectedEntity_ce = data.cod_entidad
        console.log("this.selectedEntity_ce", this.selectedEntity_ce)
        console.log("this.selectedEntity_te", this.selectedEntity_te)
        this.text_select = data.razon_social
        //this.myInputRef.inputEL.nativeElement.value = data.razon_social
    }
  
    filterCountrySingle(event) 
    {
        
        let query = event.query;
        this.serviceBankProvider.getEntities().then(countries => {
        
            this.filteredCountriesSingle = this.filterCountry(query, countries);
            
        });
        
    }
    
    filterCountry(query, countries: any[]):any[] {
        
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            
            if(country.razon_social.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                
                filtered.push(country);
            }
        }
        return filtered;
    }
  
    /* 
    showVal(data)
    {
        data.target.style.display = "none"
        this.check = false
        console.log("showVal", data.target.style.display)

        setTimeout(function () 
        {
            console.log("showVal", data.target.style.display);
            data.target.style.display = "none"
            console.log("onInputTime", data)
        }, 1000);
    }
    */
  
    inputChanged(event) 
    {
        let key = event.keyCode;
        switch(key) {
          case 13: //Enter
            this.autocompleteTags.push({razon_social: this.razon_social, banks: this.razon_social});
            event.preventDefault();
            break;
        }
    }
  
    getInfoEntity()
    {
        this.navCtrl.push(DatosEntidadesPage, {te:this.selectedEntity_te, ce:this.selectedEntity_ce}) 
        /*
        this.entitiesInfoProvider.getInfo("11","156").then(info => {
            console.log("this", info)
           
        });
        */
    }
  

    ionViewDidLoad() 
    {
  
        console.log('ionViewDidLoad EntidadesPage');
        
        //this.country =[];
        //this.countries = [];
    }

}
