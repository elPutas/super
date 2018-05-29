import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Response } from '@angular/http';

import { TasasActivasResultPage } from '../tasas-activas-result/tasas-activas-result';
import { ActiveRateProvider } from '../../providers/active-rate/active-rate';
/**
 * Generated class for the TasasActivasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasas-activas',
  templateUrl: 'tasas-activas.html',
})
export class TasasActivasPage 
{

    tasasActivasResultPage = TasasActivasResultPage

    @ViewChild('list_options') myListRef: ElementRef;
    @ViewChild('input_text') myInputRef: ElementRef;
    check = true;
    banks = [];
    sigla:any = [];
    _data = [];
    
    text_select = ""
    
    filteredCountriesSingle: any[] =[];
    
    selectedEntity_te :any  = [];
    selectedEntity_ce :any = [];
    
    tipo_entidad:any[] = [];
    cod_entidad:any[] = [];
    countries:any[] = [];
    public autocompleteTags = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private activeRateProvider:ActiveRateProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasasActivasPage');
  }
    
    
    
    itemSelected(data)
    {
        console.log("data", data)
        this.filteredCountriesSingle = []
        
        this.selectedEntity_te = data.tipo_entidad
        this.selectedEntity_ce = data.cod_entidad
        console.log("this.selectedEntity_ce", this.selectedEntity_ce)
        console.log("this.selectedEntity_te", this.selectedEntity_te)
        this.text_select = data.sigla
        //this.myInputRef.inputEL.nativeElement.value = data.razon_social
    }
  
    filterCountrySingle(event) 
    {
        
        let query = event.query;
        this.activeRateProvider.getEntities().then(countries => {
        
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

    inputChanged(event) 
    {
        let key = event.keyCode;
        switch(key) {
          case 13: //Enter
            this.autocompleteTags.push({sigla: this.sigla, banks: this.sigla});
            event.preventDefault();
            break;
        }
    }
  
    getInfoEntity()
    {
        this.navCtrl.push(TasasActivasResultPage, {te:this.selectedEntity_te, ce:this.selectedEntity_ce}) 
        
    }

}
