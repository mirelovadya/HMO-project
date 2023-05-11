import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';

// import { default as Annotation } from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-active-patients',
  templateUrl: './active-patients.component.html',
  styleUrls: ['./active-patients.component.css']
})
export class ActivePatientsComponent {
  private newLabel?= 'New label';
  diseases: any
  constructor(private dataService: DataService) {
    Chart.register()
  }

  ngOnInit() {
    this.getAllCustomers()
  }

  getAllCustomers() {
    return new Promise((resolve, reject) => {
      this.dataService.apiName = "api//get-last-month-diseases";
      this.dataService.getDataByObject({}).subscribe((results) => {
        let date = new Date()
        let sumOfDays = new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate();
        let labels: any = []
        let sums: any = []
        let firstDateInMonth = new Date(date.getFullYear(), (date.getMonth()), 1)
        this.diseases = results.diseases
        for (let i = 0; i < sumOfDays; i++) {
          date = firstDateInMonth
          if (i != 0)
            date.setDate(date.getDate() + 1);
          let time = date.getTime()
          labels.push(i + 1)
          sums.push(0)
          for (let j = 0; j < this.diseases.length; j++) {
            let startDate = new Date(this.diseases[j].startDate).getTime()
            let endDate = new Date(this.diseases[j].endDate).getTime()
            if (startDate <= time && endDate >= time) {
              sums[i]++
            }
          }
        }

        this.lineChartData.labels = labels
        this.lineChartData.datasets[0].data = sums
        this.chart?.update();
        resolve(true);
      }, err => {
        console.log(err);
      })
    });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'חולים פעילים',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
      {
        position: 'left',
      }
    },

    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         display: true,
      //         position: 'center',
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold'
      //         }
      //       }
      //     },
      //   ],
      // }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}

