import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  titulo:string;
  titleSubs$:Subscription;

  constructor(private router: Router) {
   this.titleSubs$ = this.getDataRuta().subscribe(({titulo})=>{
                  this.titulo = titulo;
                  document.title = `AdminPro - ${titulo}`;
    })
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getDataRuta(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event:ActivationEnd ) => event.snapshot.data)
    );

  }
}
