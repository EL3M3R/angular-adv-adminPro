import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario;
  public ImageUrl = '';
 
  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario
    this.ImageUrl = this.usuarioService.ArmarUrlImageUsuario(this.usuario.img)
    this.usuario.img = this.ImageUrl;

    console.log("imagen", this.ImageUrl )
  }

  ngOnInit(): void {
  }
 

  logOut() {
    this.usuarioService.logOut();
  }

}
