import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Chart } from 'chart.js';

import { TranslateService } from '@ngx-translate/core';
import { TrmProvider } from '../../providers/trm/trm';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{


    @ViewChild('lineCanvas') lineCanvas;
    //@ViewChild('imgCanvas') imgCanvas;

    month_array:any = [
       'jan_month'
      ,'feb_month'
      ,'mar_month'
      ,'apr_month'
      ,'may_month'
      ,'jun_month'
      ,'jul_month'
      ,'ago_month'
      ,'sep_month'
      ,'oct_month'
      ,'nov_month'
      ,'dec_month'
    ];
    pathcapture:any;
    capture:boolean = false;
    lineChart: any;
    pickedDate:any;
    maxDate:any = new Date().toISOString();
    label_month:string = '';
    label_day:string = '';
    label_year:string = '';
    sel_trm:string = '';
    show_last_ten_d:boolean = true;
    shareTmr:boolean = false;
    //chart:any;

      constructor(
        public navCtrl: NavController,
        public translate: TranslateService,
        public trmProvider: TrmProvider,
        public socialSharing: SocialSharing,
        public events:Events,
        public statusBar: StatusBar
      ) {

      }



      ionViewDidLoad()
      {
            this.pickedDate = new Date().toISOString();
            console.log("start TRM")
            var originalLineDraw = Chart.controllers.line.prototype.draw;
            Chart.helpers.extend(Chart.controllers.line.prototype, {
              draw: function() {
                originalLineDraw.apply(this, arguments);

                var chart = this.chart;
                var ctx = chart.chart.ctx;

                var index = chart.config.data.lineAtIndex;
                if (index) {
                  var xaxis = chart.scales['x-axis-0'];
                  var yaxis = chart.scales['y-axis-0'];

                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(xaxis.getPixelForValue(undefined, index), yaxis.top);
                  ctx.strokeStyle = '#ffffff';
                  ctx.lineTo(xaxis.getPixelForValue(undefined, index), yaxis.bottom);
                  ctx.stroke();
                  ctx.restore();
                }
              }
            });

            var config = {
              type: 'line',
              data: {
                labels: ["", "", "", "", "", "", "", "", "", ""],
                datasets: [{
                  borderWidth: 0,
                            label: "",
                            fill: true,
                            lineTension: 0,
                            backgroundColor: "#1878bc",
                            borderColor: "#1878bc",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(255,255,255,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,

                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [2791.88, 2791.88, 2781.95, 2733.24, 2810.03, 2705.34, 2705.34, 2726.47, 2705.34, 2705.34],
                            spanGaps: false,
                    }],
                    lineAtIndex: 1
                  },
                  options:
                {
                    scales:
                    {
                        xAxes: [{
                            display: false
                        }],
                        yAxes: [{
                            display: false,

                        }]
                    },
                   legend:
                   {
                     labels:
                     {
                       boxWidth: 0,
                     }
                   }
                }
            };

            var ctx = this.lineCanvas.nativeElement;
            this.lineChart = new Chart(ctx, config);
            this.changeDatePicker();

            this.events.subscribe('tabs:unhide', (picture) => {

              if(this.shareTmr == true){

                this.capture = false;
                this.pathcapture = picture;
                //alert(this.pathcapture);
                var tabBarElement = document.getElementsByClassName('tabbar') as HTMLCollectionOf<HTMLElement>;
                if (tabBarElement.length != 0) {
                  for(let i = 0; i < tabBarElement.length; i++ ){
                    tabBarElement[i].style.opacity = "1";
                  }
                }

                var auximg = document.getElementById('imgCanvas') as HTMLImageElement;
                auximg.style.display = 'none';

                this.uriToBase64(this.pathcapture).then((pic64:string)=>{
                  //console.log(pic64);
                  this.socialSharing.share("trm: $"+this.sel_trm, null, pic64, "https://www.superfinanciera.gov.co")
                                    .then(() => {
                                      // Success!
                                    }).catch((error) => {
                                      // Error!
                                      console.log(error);
                                    });

                });

                this.shareTmr = false;

              }
            });
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

        dayInMiliseconds(){
          return (1000*60*60*24);
        }

        getAvlbleDaysForToday(choosedDate, end){
          var date_end = end;
          return Math.trunc((date_end.getTime()-choosedDate.getTime())/this.dayInMiliseconds());
        }

        orderDataArray(data){

        }

        introduceToCerosAndStringify(num){
          var finl =  "";
          if(num < 10){
            finl = '0'+num.toString();
          }else{
            finl = num.toString();
          }
          return finl;
        }

        stringifyDateForQuery(date){
          var year  = this.introduceToCerosAndStringify(date.getFullYear());
          var month = this.introduceToCerosAndStringify(date.getMonth()+1);
          var day   = this.introduceToCerosAndStringify(date.getDate());
          return year+'-'+month+'-'+day;
        }

        addData(chart, data_serie, index_line) {
            chart.data.datasets.forEach((dataset) => {
                //chart.data.labels.push("");
              for(let i = 0; i < data_serie.length; i++){
                dataset.data[i] = data_serie[i];
              }
                //dataset.data.push(data_serie);
            });
            this.sel_trm = data_serie[index_line];
            chart.data.lineAtIndex = index_line;
            chart.update();
        }

        calculateEfectiveEnd(choosed_day, start_real, end_real, end_graph, index_line){
            console.log("calculateEfectiveEnd")
          //return new Promise((resolve) => {
            var real_en_datetime = end_real;
            //var adjusted_end = false;

              this.trmProvider.httpGetTrmGovco(
                this.stringifyDateForQuery(new Date(real_en_datetime-5*this.dayInMiliseconds())),
                this.stringifyDateForQuery(new Date(real_en_datetime))
              ).then((data) =>{
                  
                  var start_ = new Date(data[data.length-1].vigenciadesde).getTime();
                  var end_ = new Date(data[data.length-1].vigenciahasta).getTime();
                  
                  console.log("calculateEfectiveEnd then", data)
                  console.log("condition", start_ <= real_en_datetime && end_ >= real_en_datetime)
                  console.log("start_", start_)
                  console.log("real_en_datetime",real_en_datetime)
                  console.log("end_",  end_)
                  
                  
                  if(start_ <= real_en_datetime && end_ >= real_en_datetime ){
                    //adjusted_end = true;
                    this.feedChart(choosed_day, start_real, real_en_datetime, end_real, index_line);
                    //resolve(real_en_datetime);
                  }else{
                    real_en_datetime = real_en_datetime +this.dayInMiliseconds();
                    this.calculateEfectiveEnd(choosed_day, start_real, real_en_datetime,end_graph, index_line);
                  }

              });
        }

        feedChart(choosed_day, start, end, end_real, index_line){
            console.log("feedChart")
          try{
            this.trmProvider.httpGetTrmGovco(
              this.stringifyDateForQuery(new Date(start)),
              this.stringifyDateForQuery(new Date(end))
            ).then((data) =>{
              //console.log(new Date(end_real));
                console.log("data",data)
              var serie = [];
              //var n = 0;
              //var index = data.length;
              var fecha_progress = end_real;
              //console.log(new Date(fecha_progress));
              for (let i = (data.length -1); i >= 0; i = i-1) {

                if(serie.length == 10){
                  break;
                }
                var days_between_range = this.getAvlbleDaysForToday(new Date(data[i].vigenciadesde), new Date(data[i].vigenciahasta));
                //console.log(days_between_range);
                for(let j=0; j <= days_between_range; j++){
                  var r_sd = new Date(data[i].vigenciahasta).setHours(0,0,0,0);
                  var r_ed = new Date(data[i].vigenciadesde).setHours(0,0,0,0);
                  //console.log(new Date(r_sd));
                  //console.log(new Date(r_ed));
                  //console.log(new Date(fecha_progress));
                  if(
                    r_sd >= fecha_progress &&
                    r_ed <= fecha_progress &&
                    serie.length <= 10
                    ){
                      serie.push( parseFloat(data[i].valor));
                      /*if(choosed_day.getTime() ==  fecha_progress){
                        index = serie.length - 1;
                      }*/
                      fecha_progress = fecha_progress - this.dayInMiliseconds();
                      if(serie.length == 10){
                        break;
                      }
                  }
                }
              }

              //var data_index = (serie.length-1) - index;
              var data_ser = serie.reverse();
              console.log(data_ser);
              this.addData(this.lineChart, data_ser, index_line);
            }).catch((error) => {
              console.log("error",error)
              this.soapProgressserial(choosed_day ,start ,end_real ,index_line);
            });
          }catch(error){
              console.log("error",error)
            this.soapProgressserial(choosed_day ,start ,end_real ,index_line);
          }
        }

        public changeDatePicker(){
          var date_today = new Date();
          date_today.setHours(0,0,0,0);
          var choosed_day = new Date(this.pickedDate);
          choosed_day.setHours(0,0,0,0);
          if(date_today.getTime() == choosed_day.getTime() ){
            this.show_last_ten_d = true;
          }else{
            this.show_last_ten_d = false;
          }
          this.label_month =  this.month_array[choosed_day.getMonth()];
          this.label_day = choosed_day.getDate().toString();
          this.label_year = choosed_day.getFullYear().toString();

          var avlDays = this.getAvlbleDaysForToday(choosed_day, new Date());
          var start_real = null;
          var end_real = null;
          var index_line = 10;
          if(avlDays == 0){
            end_real = choosed_day.getTime();
            start_real = (choosed_day.getTime() - 10*this.dayInMiliseconds());
          }else{
            if(avlDays > 5){
              end_real = choosed_day.getTime()+5*this.dayInMiliseconds();
              start_real = choosed_day.getTime()-5*this.dayInMiliseconds();
              index_line = 5;
            }else{
              end_real = choosed_day.getTime()+(avlDays)*this.dayInMiliseconds();
              start_real = choosed_day.getTime()-(11-avlDays)*this.dayInMiliseconds();
              index_line = 10 - avlDays;
            }

          }

          //this.soapProgressserial(choosed_day ,start_real ,end_real ,index_line);

          this.calculateEfectiveEnd(choosed_day, start_real, end_real, end_real, (index_line-1));
        }

        public soapProgressserial(choosed_day ,start_real ,end_real ,index_line){
          var serie = [];
          var fecha_progress = end_real;
          for (let i = 0; i <10; i++) {
            //console.log(new Date(fecha_progress));
            this.trmProvider.httpGetTrmsuperFinc(this.stringifyDateForQuery(new Date(fecha_progress)))
                .then((respo)=>{
                  console.log(respo);
                  serie.push(parseFloat(respo));
                  if(serie.length == 10){
                    var dataSerie = serie.reverse();
                    this.addData(this.lineChart, dataSerie, index_line);
                  }
                });
            fecha_progress = fecha_progress - this.dayInMiliseconds();
          }

          console.log(new Date(start_real));
          //console.log(dataSerie);

        }

        public regularShare(){
          //alert('pantalla capturada');
          /*this.screenshot.URI(80).then(
            (res)=>{
              console.log(res);
              alert(res.URI);
            },
            (error)=>{
              console.log(error);
            }
          );*/
          this.capture = true;
          //var auximg = new Image();
          var auximg = document.getElementById('imgCanvas') as HTMLImageElement;
          var cv = document.querySelector('canvas');
          auximg.style.display = 'block';
          /*auximg.style.position = 'abso';
          auximg.style.bottom = '171px';*/
          //auximg.width = cv.width;
          //auximg.height = cv.height;
          auximg.style.width = cv.style.width;
          auximg.style.height = cv.style.height;

          auximg.src = cv.toDataURL('image/png');
          //this.imgCanvas.src = this.lineChart.toDataURL('image/png');
          this.shareTmr = true;
          var instance = this;
          auximg.onload = function() {
            instance.events.publish('tabs:hide');
          }
          
        }

}
