import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceBankProvider} from '../../providers/service-bank/service-bank';
import { Http } from '@angular/http';
 
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

    check = true;
    banks = [];
    name = [];
    public autocompleteTags = [];
    public autocompleteItems = [
        'BANCO DE LA REPÚBLICA',
        'BANCO DE BOGOTÁ',
        'BANCO POPULAR',
        'BANCO CORPBANCA COLOMBIA S.A.',
        'BANCOLOMBIA',
        'CITIBANK COLOMBIA',
        'BANCO GNB SUDAMERIS COLOMBIA',
        'BBVA COLOMBIA'
      ];




    country: any;
    countries: any[];
    filteredCountriesSingle: any[];

    
  constructor(public navCtrl: NavController, public navParams: NavParams, private serviceBankProvider: ServiceBankProvider) 
  {
  
    
  }
  
  filterCountrySingle(event) {
        let query = event.query;
        this.serviceBankProvider.getCountries().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
            
        });
    }
    
    filterCountry(query, countries: any[]):any[] {
        
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            
                filtered.push(country);
            }
        }
        return filtered;
    }
  
  onInputTime (data)
  {
    console.log("onInputTime", data)
  }
  
  onTagAdded(data)
  {
    console.log(data)
  }
  
  
  onSelectedTag (tagName) {
    console.log("select")
            
    }
          
      onTagRemoved (tagName: string)
      {
        console.log("remove")
        
      }
      
      
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
  
  inputChanged(event) 
  {
  
    let key = event.keyCode;
    
    switch(key) {
      
      case 13: //Enter
        this.autocompleteTags.push({name: this.name, banks: this.banks});
        event.preventDefault();
        break;
        }
     
  }
  
  

  ionViewDidLoad() {
  
    console.log('ionViewDidLoad EntidadesPage');
  }

}
