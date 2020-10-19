import { ComponentsModule } from './../components/components.module';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

 

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent]
    ,
  imports: [
    CommonModule , SharedModule, AppRoutingModule, FormsModule, ComponentsModule
 
  ],
  exports: [
    CommonModule ,
    DashboardComponent,
   ProgressComponent,
   Grafica1Component,
   PagesComponent,
   AccountSettingsComponent
  ]
})
export class PagesModule { }
