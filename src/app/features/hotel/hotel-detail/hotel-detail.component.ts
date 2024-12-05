import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../../../models/Hotel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.css'
})
export class HotelDetailComponent {

  public hotelsList: Hotel[] = [];

  constructor(
    private router: Router,
    private hotelService: HotelService,
  ) {}

  ngOnInit(): void {
    this.getHotels();
  }

  newHotel() {
    this.router.navigate(['/hotel-admin', 2]); // 2 para nuevo
  }

  updateHotel(hotel: Hotel) {
    this.hotelService.setHotel(hotel); // Almacenar el hotel en el servicio
    this.router.navigate(['/hotel-admin', 1]); // 1 para editar
  }

  roomsHotel(hotelId: number) {
    this.router.navigate(['/rooms', hotelId]); 
  }

  getHotels() {
    this.hotelService.getHotels().subscribe({
        next: (response) => {
          if (response.state) {
            this.hotelsList = response.data;
          } else {
            console.log("else",response);
          }
        },
        error: (error) => {
          // console.log("error",error);
          // console.error('Error saving hotel', error);
        }
      });
  }
}
