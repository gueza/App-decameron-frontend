import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './features/room/room/room.component';

export const routes: Routes = [
  { path: 'hotels', loadChildren: () => import('./features/hotel/hotel.module').then(m => m.HotelModule) },
  // { path: 'rooms', loadChildren: () => import('./features/room/room.module').then(m => m.RoomModule) },
  { path: 'rooms', component: RoomComponent },
  { path: '**', redirectTo: 'hotels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
