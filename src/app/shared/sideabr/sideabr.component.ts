import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import {RouterModule} from '@angular/router'
@Component({
  selector: 'app-sideabr',
  templateUrl: './sideabr.component.html',
  styles: [
  ]
})
export class SideabrComponent implements OnInit {

  menuItems: any[];

  constructor(private sidebarService: SidebarService) { 
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
