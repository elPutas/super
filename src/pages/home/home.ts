import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { TrmProvider } from '../../providers/trm/trm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{


    @ViewChild('lineCanvas') lineCanvas;
    lineChart: any;
    pickedDate:any;
    maxDate:any = new Date().toISOString();
    //chart:any;

      constructor(
        public navCtrl: NavController,
        public translate: TranslateService,
        public trmProvider: TrmProvider,
        public statusBar: StatusBar
      ) {

      }



      ionViewDidLoad()
      {
            this.pickedDate = new Date().toISOString();

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
                            backgroundColor: "#0669eb",
                            borderColor: "#0669eb",
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

            /*this.lineChart = new Chart(this.lineCanvas.nativeElement, {
              type: 'line',
              data: {
                labels: ["", "", "", "", "", "", "", "", "", ""],
                datasets: [{
                      borderWidth: 0,
                      label: "",
                      fill: true,
                      lineTension: 0,
                      backgroundColor: "#0669eb",
                      borderColor: "#0669eb",
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
            });*/

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

        addData(chart, data_serie) {
            chart.data.datasets.forEach((dataset) => {
                //chart.data.labels.push("");
              for(let i = 0; i < data_serie.length; i++){
                dataset.data[i] = data_serie[i];
              }
                //dataset.data.push(data_serie);
            });
            chart.update();
        }

        removeData(chart) {
            chart.data.datasets.forEach((dataset) => {
              //chart.data.labels.pop();
              /*chart.data.labels.forEach((label) => {
                console.log(label);
              });*/
              dataset.data.forEach((row) => {
                row.pop();
              });

            });
            chart.update();
        }

        calculateEfectiveEnd(choosed_day, start_real, end_real, end_graph){
          //return new Promise((resolve) => {
            var real_en_datetime = end_real;
            if(this.getAvlbleDaysForToday(new Date(end_real), new Date()) == 0){
               //resolve(end_real+this.dayInMiliseconds());
               this.feedChart(choosed_day, start_real, real_en_datetime, end_real);
            }else{
              var adjusted_end = false;

              //while(adjusted_end == false) {

                this.trmProvider.httpGetTrmGovco(
                  this.stringifyDateForQuery(new Date(real_en_datetime-5*this.dayInMiliseconds())),
                  this.stringifyDateForQuery(new Date(real_en_datetime))
                ).then((data) =>{
                    var start_ = new Date(data[data.length-1].vigenciadesde).getTime();
                    var end_ = new Date(data[data.length-1].vigenciahasta).getTime();
                    if(start_ <= real_en_datetime && end_ >= real_en_datetime ){
                      adjusted_end = true;

                      this.feedChart(choosed_day, start_real, real_en_datetime, end_real);
                      //resolve(real_en_datetime);
                    }else{
                      real_en_datetime = real_en_datetime +this.dayInMiliseconds();
                      this.calculateEfectiveEnd(choosed_day, start_real, real_en_datetime,end_graph);
                    }

                });

            }
          //});
        }

        feedChart(choosed_day, start, end, end_real){
          this.trmProvider.httpGetTrmGovco(
            this.stringifyDateForQuery(new Date(start)),
            this.stringifyDateForQuery(new Date(end))
          ).then((data) =>{
            //console.log(new Date(end_real));
            var serie = [];
            //var n = 0;
            var index = data.length;
            var fecha_progress = end_real;
            for (let i = (data.length -1); i >= 0; i = i-1) {

              if(serie.length == 10){
                break;
              }
              var days_between_range = this.getAvlbleDaysForToday(new Date(data[i].vigenciadesde), new Date(data[i].vigenciahasta));
              //console.log(days_between_range);
              for(let j=0; j <= days_between_range; j++){
                if(
                  new Date(data[i].vigenciahasta).getTime() >= fecha_progress &&
                  new Date(data[i].vigenciadesde).getTime() <= fecha_progress &&
                  serie.length <= 10
                  ){
                    serie.push( parseFloat(data[i].valor));
                    if(choosed_day.getTime() ==  fecha_progress){
                      index = serie.length - 1;
                    }
                    fecha_progress = fecha_progress - this.dayInMiliseconds();
                    if(serie.length == 10){
                      break;
                    }
                }
              }
            }

            var data_index = (serie.length-1) - index;
            var data_ser = serie.reverse();
            console.log(data_ser);
            //this.chart.data = data_ser;
            //this.chart.update();
            //this.removeData(this.lineChart);
            this.lineChart.data.lineAtIndex = data_index;
            this.addData(this.lineChart, data_ser);
          });
        }

        public changeDatePicker(){
          //var date_today = new Date();
          var choosed_day = new Date(this.pickedDate);
          choosed_day.setHours(0,0,0,0);
          var avlDays = this.getAvlbleDaysForToday(choosed_day, new Date());
          var start = null;
          var start_real = null;
          var end = null;
          var end_real = null;
          if(avlDays == 0){
            end_real = choosed_day.getTime();
            start_real = (choosed_day.getTime() - 10*this.dayInMiliseconds());
          }else{
            if(avlDays > 5){
              end_real = choosed_day.getTime()+5*this.dayInMiliseconds();
              start_real = choosed_day.getTime()-5*this.dayInMiliseconds();
            }else{
              end_real = choosed_day.getTime()+(avlDays)*this.dayInMiliseconds();
              start_real = choosed_day.getTime()-(11-avlDays)*this.dayInMiliseconds();
            }

          }
          /*
          console.log(new Date(end_real));
          console.log(new Date(start_real));
          */

          this.calculateEfectiveEnd(choosed_day, start_real, end_real, end_real);/*.then((value)=>{
            start = start_real;
            end = value;
            this.trmProvider.httpGetTrmGovco(
              this.stringifyDateForQuery(new Date(start)),
              this.stringifyDateForQuery(new Date(end))
            ).then((data) =>{
              console.log(new Date(end_real));
              var serie = [];
              var index = data.length;
              var fecha_progress = end_real;
              for (let i = (data.length -1); i >= 0; i = i-1) {
                if(serie.length == 10){
                  break;
                }
                var days_between_range = this.getAvlbleDaysForToday(new Date(data[i].vigenciadesde), new Date(data[i].vigenciahasta));

                for(let j=0; j <= days_between_range; j++){
                  if(
                    new Date(data[i].vigenciahasta).getTime() >= fecha_progress &&
                    new Date(data[i].vigenciadesde).getTime() <= fecha_progress &&
                    serie.length <= 10
                    ){
                      serie.push( parseFloat(data[i].valor));
                      if(choosed_day.getTime() ==  fecha_progress){
                        index = serie.length - 1;
                      }
                      fecha_progress = fecha_progress - this.dayInMiliseconds();
                      if(serie.length == 10){
                        break;
                      }
                  }
                }
              }

              var data_index = (serie.length-1) - index;
              var data_ser = serie.reverse();
              console.log(data_ser);

            });

          });*/



        }

}
