import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelAdminComponent } from './features/hotel/hotel-admin/hotel-admin.component';
import { HotelDetailComponent } from './features/hotel/hotel-detail/hotel-detail.component';
import { RoomDetailComponent } from './features/room/room-detail/room-detail.component';
import { RoomAdminComponent } from './features/room/room-admin/room-admin.component';

export const routes: Routes = [
  { path: 'hotels', component: HotelDetailComponent },
  { path: 'rooms/:hotel', component: RoomDetailComponent },
  { path: 'hotel-admin/:type', component: HotelAdminComponent },
  { path: 'room-admin/:type', component: RoomAdminComponent },
  { path: '**', redirectTo: 'hotels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
