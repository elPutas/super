import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveRateProvider } from '../../providers/active-rate/active-rate';
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
    
    nameBank:String = ""
    typeCredit:String = ""
    
    myInfo:any =[]

    constructor(public navCtrl: NavController, public navParams: NavParams, private activeRateProvider:ActiveRateProvider) 
    {
        this.ce = navParams.get('ce');
        this.te = navParams.get('te');
        this.type = navParams.get('type');
        
        console.log("this.ce", this.ce);
        console.log("this.te", this.te);
    }

    ionViewDidLoad() 
    {
        
        console.log('ionViewDidLoad TasasActivasResultPage');
        this.activeRateProvider.getEntitiesFiltered(this.te,this.ce, this.type).then(info => {
        
            let myArr = []    
            var size = 0, key;
            
            this.nameBank = " | " + info[0].sigla
            this.typeCredit = " | " + info[0].modalidad_de_credito
            
            for (key in info[0]) 
            {
                if (info[0].hasOwnProperty(key)) 
                {
                    // items hidden
                    let codeHide = info[0][key] != "-2.00"
                    let typeHide = key != "modalidad_de_credito"
                    let nameHide = key != "sigla"
                    let ceHide = key != "codigo_entidad"
                    let teHide = key != "tipo_entidad"
                    let dateHide = key != "fecha_corte"

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
          
        });
    }

}
