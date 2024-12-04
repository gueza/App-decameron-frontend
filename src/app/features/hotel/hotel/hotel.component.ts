import { Component } from '@angular/core';
import { HotelDetailComponent } from "../hotel-detail/hotel-detail.component";
import { HotelListComponent } from "../hotel-list/hotel-list.component";

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [HotelDetailComponent, HotelListComponent],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent {

}
