import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RncHeaderComponent } from './components/rnc-header/rnc-header.component';
import { RncFooterComponent } from './components/rnc-footer/rnc-footer.component';
import { RncSidenavComponent } from './components/rnc-sidenav/rnc-sidenav.component';



@NgModule({
  declarations: [RncHeaderComponent, RncFooterComponent, RncSidenavComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
