import { Component, Input, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() title = 'Sin Titulo';
 
  //Doughnut
 @Input('labels') doughnutChartLabels: Label[] = ['Data 1', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [{
      backgroundColor:['#9E120E' ,'#FF5800' , '#FFB414']
    }]
}
