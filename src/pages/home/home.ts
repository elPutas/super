import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http } from '@angular/http'; 
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{

    
    @ViewChild('lineCanvas') lineCanvas;
    lineChart: any;
    
      constructor(public navCtrl: NavController, private statusBar: StatusBar) {

      }



      ionViewDidLoad() 
      {
      

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
            new Chart(ctx, config);
            
           
            

        }

}
