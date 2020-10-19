import { AuthRoutingModule } from './auth/auth.routing';
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
