import { AuthRoutingModule } from './auth/auth.routing';
import { PagesComponent } from './pages/pages.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotpagefoundComponent } from '../app/notpagefound/notpagefound.component';
import { PagesRouterModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '' , redirectTo: '/dashboard' , pathMatch: 'full'},
  { path: '**', component: NotpagefoundComponent }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRouterModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
