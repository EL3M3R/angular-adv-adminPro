import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";


@Injectable()
export class AppConfig {

    private config: Object = null;
    private env:Object = null;

    constructor(private http:HttpClient){}

    getHttp():HttpClient{
        return this.http;
    }

    /**
     * Use to get the data found in the second file(config file)
     */
    public getConfig(key: any){
        return this.config[key];
    }

       /**
     * Use to get the data found in the first file(env file)
     */
    public getEnv(key:any){
        return this.env[key];
    }


    public load(){
        return new Promise( (resolve , reject) =>{
            this.http.get('./assets/config/proxy/env.json').pipe(
                map(res => res )).pipe(catchError((error:any): any => {
                    resolve(true);
                    console.log("erroe" , error)
                    return Observable.throw(error.json().error || 'Server Error' );
                }))
                .subscribe( (envResponse) => {
                    this.env = envResponse;
                    console.log("env" , this.env);
                    
                    const request:any = null;
                    if( request ){
                        request
                            .map(res => res.json())
                            .catch( (error:any):any =>{
                                resolve(error);
                                return Observable.throw(error.json().error || 'Server Error');
                            })
                            .subscribe( (responseData) => {
                                this.config = responseData;
                                resolve(true)
                            } )
                    }else{
                        resolve(true);
                    }
                }); 
        });
    }

}