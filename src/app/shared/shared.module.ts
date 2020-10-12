import { HeaderComponent } from './header/header.component';
import { SideabrComponent } from './sideabr/sideabr.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [

    BreadcrumbsComponent,
    HeaderComponent,
    SideabrComponent

  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SideabrComponent,
  ]
})
export class SharedModule { }
