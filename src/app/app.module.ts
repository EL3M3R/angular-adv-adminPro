import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotpagefoundComponent } from '../app/notpagefound/notpagefound.component';
import { PagesModule } from './pages/pages.module';
import { AppConfig } from 'src/environments/AppConfig';

@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule , PagesModule , AuthModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: httpAppConfig,
    deps:[AppConfig], multi:true
  } , 
AppConfig
],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function httpAppConfig(config: AppConfig){
  return () => config.load()
}