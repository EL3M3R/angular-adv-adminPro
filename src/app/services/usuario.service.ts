import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConfig } from 'src/environments/AppConfig';
import { LoginForms } from '../interfaces/login-forms.interface';
import { RegisterForm } from '../interfaces/register-forms.interface';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  private url = `${this.config.getEnv('adminPro_base_url')}`
  constructor
    (
      private http: HttpClient,
      private config: AppConfig,
      private router: Router,
      private ngZone: NgZone,
  ) { this.googleInit() }

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
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.url}login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(error => of(false))
    )
  }
  /**
   * .pipe(
      tap( (resp:any) => {
        localStorage.setItem('token' , resp.token)
      }),
      map( resp => true)
    )
    
   */

  crearUsuario(formData: RegisterForm) {
    return this.http.post(this.url + 'usuarios/registroUsuarios', formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
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
