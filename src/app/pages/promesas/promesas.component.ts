import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log("usuarios" , usuarios)
    })

    const promesas = new Promise( (resolve , reject) => {
      if(false){
        resolve('Hola Mundo');
      }else{
        reject("Algo salio mal!!")
      }
    });
    
    promesas.then( ()=>{
        console.log("Hey termine");
    }).catch(err => console.log("Error en mi promesa" , err))
    console.log("fin de promise ");
  }


  getUsuarios(){

    const promesa = new Promise(resolve =>{
      fetch("https://reqres.in/api/users")
        .then( resp => resp.json())
        .then(bodys => resolve(bodys.data))
    }) 
    return promesa;
  }
 

} 
