import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.sass']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;    
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
