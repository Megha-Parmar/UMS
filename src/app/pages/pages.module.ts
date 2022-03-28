import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { LayoutModule } from '../core/layout/layout.module';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    BaseComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule, RouterModule,
    MatSidenavModule

  ],
  // exports: [RouterModule]
})
export class PagesModule { }
