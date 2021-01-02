import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { RouterModule } from '@angular/router'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-sideabr',
  templateUrl: './sideabr.component.html',
  styles: [
  ]
})
export class SideabrComponent implements OnInit {

  public menuItems: any[];
  public usuario: Usuario

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuarioService,
  ) {
    this.menuItems = sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
