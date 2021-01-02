import { HttpClient } from "@angular/common/http";
import { AppConfig } from "src/environments/AppConfig";
import { environment } from "src/environments/environment.prod";
import { UsuarioService } from "../services/usuario.service";

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {  }


    get ImagenUrl() {
        let urlImage: string = '';
        if (Image) {

        } else {
        }

        return urlImage;
    }

}