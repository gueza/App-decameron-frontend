import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hotel } from '../../../models/Hotel';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = environment.URL_BACKEND;
  private hotelSubject = new BehaviorSubject<Hotel | null>(null);
  hotel$ = this.hotelSubject.asObservable();

  constructor(private http: HttpClient) { }

  saveHotel(hot_name: string,
    hot_quantity_rooms: number,
    cit_id: string,
    hot_nit: string,
    hot_address: string): Observable<any> {
    const hotelData = { hot_name, hot_quantity_rooms, cit_id, hot_nit, hot_address };
    return this.http.post<any>(`${this.apiUrl}hotels`, hotelData);
  }

  updateHotel(
    idHotel: number,
    hot_name: string,
    hot_quantity_rooms: number,
    cit_id: string,
    hot_nit: string,
    hot_address: string,
  ): Observable<any> {
    const hotelData = { hot_name, hot_quantity_rooms, cit_id, hot_nit, hot_address };
    return this.http.put<any>(`${this.apiUrl}hotels/${idHotel}`, hotelData);
  }

  getHotels(): Observable<any> {
    const url = `${this.apiUrl}hotels`;
    return this.http.get<any>(url);
  }

  getInformationHotelById(idHotel: number): Observable<any> {
    const url = `${this.apiUrl}/hotels/${idHotel}`;
    return this.http.get<any>(url);
  }

  setHotel(hotel: Hotel) {
    this.hotelSubject.next(hotel);
  }

  getHotel() {
    return this.hotelSubject.asObservable();
  }
}
