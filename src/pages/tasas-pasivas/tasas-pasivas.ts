import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Response } from '@angular/http';

import { TasasActivasResultPage } from '../tasas-activas-result/tasas-activas-result';
import { ActiveRateProvider } from '../../providers/active-rate/active-rate';
import { ServiceBankProvider } from '../../providers/service-bank/service-bank';

/**
 * Generated class for the TasasPasivasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasas-pasivas',
  templateUrl: 'tasas-pasivas.html',
})
export class TasasPasivasPage {

  tasasActivasResultPage = TasasActivasResultPage

  @ViewChild('list_options') myListRef: ElementRef;
  @ViewChild('input_text') myInputRef: ElementRef;
  @ViewChild("creditSelect") myCreditSelectRef: ElementRef;

  showCredit:Boolean = false;
  showCreditList:Boolean = false;
  banks = [];
  sigla:any = [];
  _data = [];

  typesCredit:any = [];

  text_select = ""
  credit_select = ""

  filteredCountriesSingle: any[] =[];

  selectedEntity_te :any  = [];
  selectedEntity_ce :any = [];

  tipo_entidad:any[] = [];
  cod_entidad:any[] = [];
  type_credit:any[] = [];


  countries:any[] = [];

  server_entidades:string = "superfinanc";

  public autocompleteTags = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private activeRateProvider:ActiveRateProvider, public serviceBankProvider:ServiceBankProvider) {
  }

  ionViewDidLoad()
  {
      console.log('ionViewDidLoad TasasActivasPage');
  }


  //
  openList()
  {
      console.log("open")
      this.showCreditList = true
  }

  //credit selected
  itemTypeSelected(data)
  {
      //close it
      //this.typesCredit = []
      if(this.server_entidades == "superfinanc"){
        this.credit_select = data.nombretipocred;
      }else{
        this.selectedEntity_te = data.tipo_entidad;
        this.selectedEntity_ce = data.codigo_entidad;
        this.credit_select = data.tipo;
      }

      //this.myCreditSelectRef.nativeElement.value = data.tipo
      //console.log("data credit", this.myCreditSelectRef.nativeElement.value)
      this.showCreditList = false
  }


  //bank selected
  itemSelected(data)
  {
      console.log("data bank", data)
      //close it
      this.filteredCountriesSingle = []

      if(this.server_entidades == "superfinanc"){
        this.selectedEntity_te = data.tipoEntidad;
        this.selectedEntity_ce = data.codigoEntidad;
        this.text_select = data.nombreEntidad;
      }else{
        this.selectedEntity_te = data.tipo_entidad;
        this.selectedEntity_ce = data.codigo_entidad;
        this.text_select = data.sigla;
      }

      //this.myInputRef.inputEL.nativeElement.value = data.sigla
      this.showCredit = true;
      this.showCreditList = true
  }


  //filter access from view
  filterCountrySingle(event)
  {
      let query = event.query;

      this.serviceBankProvider.getEntitiesSuperFinanc().then(countries => {
          this.server_entidades = "superfinanc";
          this.filteredCountriesSingle = this.filterByName(query, countries);
          this.activeRateProvider.getEntitiesTiposCreditoSuperfinanc().then((types:any)=>{
            let instance = this;
            this.typesCredit = [];
            types.forEach(function (value) {
              if(value.nombretipocred.toLowerCase().indexOf("pasiva") > -1){
                instance.typesCredit.push(value);
              }
            });
          });
      },err=>{
        this.activeRateProvider.getEntitiesPasivas().then(countries =>
        {
          this.server_entidades = "datosgov";
          this.filteredCountriesSingle = this.filterByName(query, countries);
          this.typesCredit = this.filterByType(query, countries);
        });
      });

  }


  //filter by credit type
  filterByType(query, banks: any[]):any[]
  {
      let filtered : any[] = [];

      let letPushType = true;
      let lastType = "";

      let letPush = true;
      let lastSigla = ""

      for(let i = 0; i < banks.length; i++)
      {
          let bank = banks[i];

          if(bank.sigla.toLowerCase().indexOf(query.toLowerCase()) == 0)
          {

              if(bank.sigla == lastSigla)
                  letPush = false
              else
                  letPush = true
              lastSigla = bank.sigla

              if(letPush)
              {

                  if(bank.tipo == lastType)
                      letPushType = false
                  else
                      letPushType = true
                  lastType = bank.tipo

                  if(letPushType)
                      filtered.push(bank);
              }

          }
      }
      return filtered;
  }

  //filter by name bank
  filterByName(query, banks: any[]):any[]
  {
      let filtered : any[] = [];
      let letPush = true;
      let lastSigla = ""

      for(let i = 0; i < banks.length; i++) {
          let bank = banks[i];

          if(this.server_entidades == "superfinanc"){
            if(bank.nombreEntidad.toLowerCase().indexOf(query.toLowerCase()) == 0)
            {
                if(bank.nombreEntidad == lastSigla)
                    letPush = false
                else
                    letPush = true

                lastSigla = bank.sigla

                if(letPush)
                    filtered.push(bank);
            }
          }else{
            if(bank.sigla.toLowerCase().indexOf(query.toLowerCase()) == 0)
            {
                if(bank.sigla == lastSigla)
                    letPush = false
                else
                    letPush = true

                lastSigla = bank.sigla

                if(letPush)
                    filtered.push(bank);
            }
          }
      }
      return filtered;
  }

  //autocomplete change
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


  //goto
  getInfoEntity()
  {
      console.log("this.selectedEntity_ce", this.selectedEntity_ce)
      console.log("this.selectedEntity_te", this.selectedEntity_te)
      console.log("this.credit_select", this.credit_select)

      this.navCtrl.push(TasasActivasResultPage, {te:this.selectedEntity_te, ce:this.selectedEntity_ce, type:this.credit_select, tasaori:'pasiva'})

  }

  getNameEntidad(obj){
    if(this.server_entidades == "superfinanc"){
      return obj.nombreEntidad;
    }else{
      return obj.sigla;
    }
  }

  getNameType(obj){
    if(this.server_entidades == "superfinanc"){
      return obj.nombretipocred;
    }else{
      return obj.tipo;
    }
  }

}
