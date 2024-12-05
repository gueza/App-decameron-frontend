import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../../models/Room';
import { RoomType } from '../../../models/Roomtype';
import { Accommodation } from '../../../models/Accommodation';
import { AlertsService } from '../../../shared/services/alerts.service';

@Component({
  selector: 'app-room-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './room-admin.component.html',
  styleUrl: './room-admin.component.css'
})
export class RoomAdminComponent {

  public type: number = 0;
  public room: Room | null = null;
  public idHotel: number | null = null;
  public roomTypeList: RoomType[] = [];
  public accommodationList: Accommodation[] = [];
  
  formRoom!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private alertsService: AlertsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getRoomType();

    this.type = Number(this.route.snapshot.paramMap.get('type') || 0);

    if (this.type == 1) {
      this.roomService.getRoom().subscribe((room) => {

        this.room = room;
        this.getAccommodationByRoomType(this.room!.room_type.rty_id);

        if (this.room) {
          this.formRoom.patchValue({
            roomtype: this.room.room_type.rty_id,
            accommodation: this.room.accommodation.acc_id,
            quantity: this.room.roo_quantity
        
          });
        } else {
          this.router.navigate(['/rooms']); 
        }
      });
    } else if (this.type == 2) {
      this.roomService.getIdHotel().subscribe((idHotel) => {

        this.idHotel = idHotel;
        !this.idHotel ? this.router.navigate(['/rooms']) : null; 
      });
    }
  }

  private createForm(): void {
    this.formRoom = this.formBuilder.group({
      roomtype: new FormControl('', Validators.required),
      accommodation: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }

  goBack() {
    this.router.navigate(['/rooms']);
  }

  getRoomType() {
    this.roomService.getRoomType().subscribe({
      next: (response) => {
        if (response.state) {
          this.roomTypeList = response.data;
        } else {
          console.log("else",response);
        }
      }
    });
  }

  onchangeRoomType() {
    const roomtype = this.formRoom.get('roomtype')!.value;
    this.getAccommodationByRoomType(roomtype);
    this.formRoom.patchValue({
      accommodation: ''
    });
  }

  getAccommodationByRoomType(idRoomType: number) {
    this.roomService.getAccommodationByRoomType(idRoomType).subscribe({
      next: (response) => {
        if (response.state) {
          this.accommodationList = response.data;
        } else {
          console.log("else",response);
        }
      }
    });
  }

  updateRoom() {
    if (this.formRoom.valid) {
      const roomtype = this.formRoom.get('roomtype')!.value;
      const accommodation = this.formRoom.get('accommodation')!.value;
      const quantity = this.formRoom.get('quantity')!.value;

      const idRoom = this.room!.roo_id;
      const idHotel = this.room!.hot_id;

      this.roomService.updateRoom(idRoom, roomtype, accommodation, quantity, idHotel).subscribe({
        next: (response) => {
          if (response.state) {
            this.alertsService.alertSuccess(response.message);
            this.router.navigate(['/rooms']); 
          } else {
            this.alertsService.alertError(response.message);
          }
        },  error: (error) => {
          this.alertsService.alertError(error.error.message);
        } 
      });
    }
  }

  saveRoom() {
    if (this.formRoom.valid) {
      const roomtype = this.formRoom.get('roomtype')!.value;
      const accommodation = this.formRoom.get('accommodation')!.value;
      const quantity = this.formRoom.get('quantity')!.value;

      const idHotel = this.idHotel ? this.idHotel : 0;

      this.roomService.saveRoom(roomtype, accommodation, quantity, idHotel).subscribe({
        next: (response) => {
          if (response.state) {
            this.alertsService.alertSuccess(response.message);
            this.router.navigate(['/rooms']); 
          } else {
            this.alertsService.alertError(response.message);
          }
        }, error: (error) => {
          this.alertsService.alertError(error.error.message);
        } 
      });
    }
  }
}
