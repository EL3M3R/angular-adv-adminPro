import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import {filter, map, retry, take} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit , OnDestroy {

  intervalSubs: Subscription;
  constructor() { 
  
  this.intervalSubs=  this.retornaIntervalo() .subscribe( console.log);
  /*  this.retornaObservable().pipe(
      retry (1)
    )
    .subscribe(
      valor => console.log("subs" , valor),
      error=> console.warn('Error' , error),
      () => console.log('Obs terminado')
    );*/
  }
  ngOnDestroy():void {
    this.intervalSubs.unsubscribe();
  }
  ngOnInit(): void {
  }

  retornaIntervalo():Observable<number>{
    const intervalo$ = interval(100)
        .pipe(
          map( valor => {
            return   valor  +1;
          }), 
          filter( valor => ( valor % 2 === 0) ? true:false),
          take(8),
        )
    return intervalo$;
  }
  retornaObservable():Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        if(i === 4){
          clearInterval( intervalo );
          observer.complete();
        }

        if(i === 2 ){
         
          observer.error('i llego a 2 ')
        }
      } , 1000)
    });
    return obs$;

  }

}
