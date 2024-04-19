import { Component, Input } from '@angular/core';
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html',
    styleUrls: ['./product-management.component.scss'],
    // Remove 'imports' as it's used for importing modules, not components
})

export class ProductManagementComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor(){

  }

  ngOnInit(): void{

  }

  getHeadClass(): string{
    let styleClass = "";
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'head-trimed';
    }else{
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }
 
}
