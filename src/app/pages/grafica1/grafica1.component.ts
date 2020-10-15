import { Component, OnInit } from '@angular/core';

 

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  label: string[] = ['Data 1 prueba' , 'Data 2 prueba' , 'Data prueba 3'];
  public data  = [[344, 5677 , 876] ]
}
