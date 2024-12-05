import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../../models/Hotel';
import { City } from '../../../models/City';
import { HttpClientModule } from '@angular/common/http';
import { HotelService } from '../services/hotel.service';
import { CityService } from '../../../shared/services/city.service';
import { AlertsService } from '../../../shared/services/alerts.service';

@Component({
  selector: 'app-hotel-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './hotel-admin.component.html',
  styleUrl: './hotel-admin.component.css'
})
export class HotelAdminComponent {
  ;
  hotel: Hotel | null = null;
  type: number = 0;
  public informationHotel: Hotel[] = [];
  public informationCity: City[] = [];

  formHotel!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private cityService: CityService,
    private alertsService: AlertsService
  ) {
    this.getInformationCity();
    this.createForm();
  }

  ngOnInit(): void {

    this.type = Number(this.route.snapshot.paramMap.get('type') || 0);

    if (this.type == 1) {
      this.hotelService.getHotel().subscribe((hotel) => {
        this.hotel = hotel;
        if (this.hotel) {
          this.formHotel.patchValue({
            name: this.hotel.hot_name,
            amount: this.hotel.hot_quantity_rooms,
            city: this.hotel.cit_id,
            address: this.hotel.hot_address,
            nit: this.hotel.hot_nit,
          });
        } else {
          this.router.navigate(['/hotels']);
        }
      });
    }
  }

  private createForm(): void {
    this.formHotel = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      nit: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  goBack() {
    this.router.navigate(['/hotel']);
  }

  saveHotel() {
    if (this.formHotel.valid) {
      const name = this.formHotel.get('name')!.value;
      const amount = this.formHotel.get('amount')!.value;
      const city = this.formHotel.get('city')!.value;
      const nit = this.formHotel.get('nit')!.value;
      const address = this.formHotel.get('address')!.value;

      this.hotelService.saveHotel(name, amount, city, nit, address).subscribe({
        next: (response) => {
          if (response.state) {
            this.alertsService.alertSuccess(response.message);
            this.router.navigate(['/hotels']);
          } else {
            this.alertsService.alertError(response.message);
          }
        }, error: (error) => {
          this.alertsService.alertError(error.error.message);
        }
      });
    }
  }

  updateHotel() {
    if (this.formHotel.valid) {
      const name = this.formHotel.get('name')!.value;
      const amount = this.formHotel.get('amount')!.value;
      const city = this.formHotel.get('city')!.value;
      const nit = this.formHotel.get('nit')!.value;
      const address = this.formHotel.get('address')!.value;
      const idHotel = this.hotel!.hot_id;

      this.hotelService.updateHotel(idHotel, name, amount, city, nit, address).subscribe({
        next: (response) => {
          if (response.state) {
            this.alertsService.alertSuccess(response.message);
            this.router.navigate(['/hotels']);
          } else {
            this.alertsService.alertError(response.message);
          }
        }, error: (error) => {
          this.alertsService.alertError(error.error.message);
        }
      });
    }
  }

  getInformationHotelById(idHotel: number) {
    this.informationHotel = [];

    this.getInformationCity();

    // this.hotelService.getInformationHotelById(idHotel).subscribe({
    //   next: (response) => {
    //     if (response.state) {
    //       this.informationHotel = response.data;

    //       this.formHotel.patchValue({
    //         name: response.data.hot_name,
    //         amount: response.data.hot_quantity_rooms,
    //         city: response.data.cit_id,
    //         address: response.data.hot_address,
    //         nit: response.data.hot_nit,
    //       });

    //     } else {
    //       console.error('Error saving hotel', response.message);
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error saving hotel', error);
    //   }
    // });
  }

  getInformationCity() {
    this.informationHotel = [];

    this.cityService.getInformationCity().subscribe({
      next: (response) => {
        if (response.state) {
          this.informationCity = response.data;
        } else {
          // console.error('Error saving hotel', response.message);
        }
      },
      error: (error) => {
        // console.error('Error saving hotel', error);
      }
    });
  }
}
