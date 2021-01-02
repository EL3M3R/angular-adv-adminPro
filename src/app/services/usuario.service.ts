import { HttpClient } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConfig } from 'src/environments/AppConfig';
import { LoginForms } from '../interfaces/login-forms.interface';
import { RegisterForm } from '../interfaces/register-forms.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  private url = `${this.config.getEnv('adminPro_base_url')}`
  constructor
    (
      private http: HttpClient,
      private config: AppConfig,
      private router: Router,
      private ngZone: NgZone,
  ) { this.googleInit() }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid;
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '572330037462-pupm10461btlcrg1vqjhohpjehh60vch.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      });

    })
  }

  logOut() {
    localStorage.removeItem('token')
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      })
    })
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${this.url}login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const {
          email,
          google,
          nombre,
          role,
          img = '',
          uid
        } = resp.usuario;

        this.usuario = new Usuario(
          nombre,
          email,
          '',
          img,
          google,
          role, uid
        )
        localStorage.setItem('token', resp.token)

        return true;
      }),
      catchError(error => of(false))
    )
  }


  ArmarUrlImageUsuario(Image) {
    let urlImage: string = '';

    if (Image.includes('https')) {
      return urlImage = Image;
    }

    if (Image) {
      urlImage = `${this.url}upload/usuarios/${Image}`;
    } else {
      urlImage = `${this.url}upload/usuarios/noimage`;
      console.log("image url ", urlImage)
    }

    return urlImage;
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(this.url + 'usuarios/registroUsuarios', formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }


  actualizarPerfil(data: { email: string, nombrea: string , role:string }) {

    data = {
      ...data, 
      role: this.usuario.role
    }  

    return this.http.put(`${this.url}usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }

    })
  }

  login(formData: LoginForms) {
    return this.http.post(this.url + 'login', formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }

  loginGoogle(token) {
    return this.http.post(this.url + 'login/google', { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }


}
