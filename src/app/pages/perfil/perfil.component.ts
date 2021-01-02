import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, elementAt } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForms: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUpload: FileUploadService
  ) {
    this.usuario = usuarioService.usuario
  }

  ngOnInit(): void {
    this.perfilForms = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarUsuario() {
    this.usuarioService.actualizarPerfil(this.perfilForms.value)
      .subscribe((resp: any) => {
        const { nombre, email } = resp.usuario

        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Datos Guardados',
          `El usuario ${this.usuario.nombre} ha sido actualizado correctamente`,
          'success')


      }, (error: any) => {
 
 
        Swal.fire('Error al Guardar', error.error.msg, 'error')

      })

  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);

      this.imgTemp = reader.result;

    }

  }

  subirImagen() {
    this.fileUpload.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then((res) => {
        this.usuario.img = this.usuarioService.ArmarUrlImageUsuario(res.nombreArchivo);
        Swal.fire('Imagen Actualizada',
          `Se modifico la imagen del usuario ${this.usuario.nombre} coreectamente`,
          'success')
      })

  }

}
