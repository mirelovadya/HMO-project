import { DataService } from 'src/app/services/data.service';
import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-vaccinated',
  templateUrl: './vaccinated.component.html',
  styleUrls: ['./vaccinated.component.css']
})
export class VaccinatedComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private dataService: DataService) { }
  vaccinationSsum: any = 0
  unVaccinationSsum: any = 0
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  ngOnInit() {
    this.getAllCustomers()

  }
  getAllCustomers() {
    return new Promise((resolve, reject) => {
      // debugger
      this.dataService.apiName = "api/get-customers";
      this.dataService.getDataByObject({}).subscribe(results => {
        let customers = results.customers


        for (let i = 0; i < customers.length; i++) {
          if (customers[i].vaccinations.length > 0)
            this.vaccinationSsum++

        }
        this.unVaccinationSsum = customers.length - this.vaccinationSsum
        debugger

        this.pieChartData.datasets[0].data = [this.vaccinationSsum, this.unVaccinationSsum];
        this.chart?.update();

        resolve(true);
      }, err => {
        console.log(err);
      })
    });
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
        position: 'top',
      },

      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  // public data = [''];

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['מחוסנים', 'לא מחוסנים'],
    datasets: [{
      data: []
    }]
  };
}
