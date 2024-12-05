import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Room } from '../../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = environment.URL_BACKEND;
  private roommSubject = new BehaviorSubject<Room | null>(null);
  roomm$ = this.roommSubject.asObservable();
  
  private numberSubject = new BehaviorSubject<number | null>(null);
  number$ = this.numberSubject.asObservable();

  constructor(private http: HttpClient) { }

  getRoomms(): Observable<any> {
    const url = `${this.apiUrl}roomms`;
    return this.http.get<any>(url);
  }

  getRoomsByIdHotel(idHotel: number): Observable<any> {
    const url = `${this.apiUrl}rooms-by-hotel`;
    const params = { hot_id: idHotel.toString() };
    return this.http.get<any>(url, { params });
  }

  setRoom(room: Room) {
    this.roommSubject.next(room);
  }

  getRoom() {
    return this.roommSubject.asObservable();
  }

  getRoomType(): Observable<any> {
    const url = `${this.apiUrl}room-type`;
    return this.http.get<any>(url);
  }

  getAccommodationByRoomType(idRoomType: number): Observable<any> {
    const url = `${this.apiUrl}accommodations-by-room-type`;
    const params = { rty_id: idRoomType.toString() };
    return this.http.get<any>(url, { params });
  }

  updateRoom(
    idroomm: number,
    rty_id: string,
    acc_id: number,
    roo_quantity: string,
    hot_id: number
  ): Observable<any> {
    const roommData = { rty_id, acc_id, roo_quantity, hot_id };
    return this.http.put<any>(`${this.apiUrl}rooms/${idroomm}`, roommData);
  }

  saveRoom(
    rty_id: string,
    acc_id: number,
    roo_quantity: string,
    hot_id: number): Observable<any> {
    const roommData = { rty_id, acc_id, roo_quantity, hot_id };
    return this.http.post<any>(`${this.apiUrl}rooms`, roommData);
  }

  getInformationroommById(idroomm: number): Observable<any> {
    const url = `${this.apiUrl}/roomms/${idroomm}`;
    return this.http.get<any>(url);
  }

  setIdHotel(idHotel: any) {
    this.numberSubject.next(idHotel);
  }

  getIdHotel() {
    return this.numberSubject.asObservable();
  }
}
