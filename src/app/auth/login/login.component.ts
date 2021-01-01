import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  public formSubmitteed: boolean = false;
  public auth2: any;
  public loginForms = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.renderButton()
  }

  login() {
    this.usuarioService.login(this.loginForms.value)
      .subscribe(res => {
        if (this.loginForms.get('remember').value) {
          localStorage.setItem('email', this.loginForms.get('email').value)
        } else {
          localStorage.removeItem('email');
        }

        //Redireccionar al dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
    //this.router.navigateByUrl('/');
  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let id_token = googleUser.getAuthResponse().id_token;
        console.log("id_token", id_token);
        this.usuarioService.loginGoogle(id_token).subscribe(res => {
          //Redireccionar al dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        })
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
