import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelRoutingModule } from './hotel-routes.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { HotelAdminComponent } from './hotel-admin/hotel-admin.component';

@NgModule({
  declarations: [
    // HotelAdminComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    // HotelAdminComponent
  ]
})
export class HotelModule { }
