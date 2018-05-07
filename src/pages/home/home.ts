import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http } from '@angular/http'; 

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
      

            this.lineChart = new Chart(this.lineCanvas.nativeElement, 
            {

                type: 'line',
                data: {
                    labels: ["", "", "", "", "", "", "", "", "", ""],
                    datasets: [
                        {
                         borderWidth: 0,
                            label: "",
                            fill: true,
                            lineTension: 0.3,
                            backgroundColor: "#0669eb",
                            borderColor: "#0669eb",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(6,95,232,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(6,95,232,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [2791.88, 2791.88, 2781.95, 2733.24, 2810.03, 2705.34, 2705.34, 2726.47, 2705.34, 2705.34],
                            spanGaps: false,
                        }
                    ]
                },
                options:
                {
                    scales:
                    {
                        xAxes: [{
                            display: false
                        }],
                        yAxes: [{
                            display: false
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

            });
        }

}
