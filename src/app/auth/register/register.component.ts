import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitteed: boolean = false;
  public registerForms = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terminos: [true, [Validators.required]],
  } , {
    validators: this.passwprdsIguales('password' , 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private usuarioService: UsuarioService
  ) { }


  crearUsuario() {
    this.formSubmitteed = true;

    if( this.registerForms.invalid ){
      return;
    }

    this.usuarioService.crearUsuario(this.registerForms.value)
      .subscribe(res => {
       //Redireccionar al dashboard
       this.router.navigateByUrl('/');
      } , (err) => {
        Swal.fire('Error' , err.error.msg , 'error')
      });
  }

  campoNoValido(campo: string): boolean {

    if (this.registerForms.get(campo).invalid && this.formSubmitteed) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForms.get('terminos').value && this.formSubmitteed;
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForms.get('password').value;
    const pass2 = this.registerForms.get('password2').value;

    if((pass1 !== pass2) && this.formSubmitteed ){
      return true;
    }else{
      return false;
    }
  }

  passwprdsIguales(pass:string , pass2:string){

    return (formGroup:FormGroup) => { 

      const pass1Control = formGroup.get(pass);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value){
        pass1Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual:true})
      }
      
      

    }
  
  }


}
