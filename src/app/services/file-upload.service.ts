 import { Injectable } from '@angular/core';
import { AppConfig } from 'src/environments/AppConfig';
 
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private url = `${this.config.getEnv('adminPro_base_url')}`;

  constructor(
    private config: AppConfig
  ) { }
  

  get token(): string{
    return localStorage.getItem('token');
  }

  async actualizarFoto(
                        archivo: File,
                        tipo: 'usuarios'|'medicos'|'hospitales',
                        id:string
                     ) {
   try {

    const url = `${this.url}upload/${tipo}/${id}`;
    const formData = new FormData();
    formData.append('imagen' , archivo);

    const resp = await fetch( url , 
      {
        method: 'PUT', 
        headers: {
          'x-token' : this.token
        }, 
        body: formData
      });
 
      const data = await resp.json();

      if(data.ok){
        return data;
      }else{
        console.log("msg" , data.msg);
        
        return false
      }

      
    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
