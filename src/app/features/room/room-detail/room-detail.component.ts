import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { Room } from '../../../models/Room';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {

  public hotelId: number = 0;
  public roomsList: Room[] = [];

  constructor(
    private router: Router,
    private roomService: RoomService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotel') || 0);   
    this.getRoomsByHotelId();
  }

  getRoomsByHotelId() {
    this.roomService.getRoomsByIdHotel(this.hotelId).subscribe({
      next: (response) => {
        if (response.state) {
          this.roomsList = response.data;
        } else {
          console.log("else",response);
        }
      },
    });
  }

  newRoom() {
    this.roomService.setIdHotel(this.hotelId);
    this.router.navigate(['/room-admin', 2]);
  }

  updateRoom(room: Room) {
    this.roomService.setRoom(room); // Almacenar la habitacion a editar
    this.router.navigate(['/room-admin', 1]); // 1 para editar
  }

  
}
