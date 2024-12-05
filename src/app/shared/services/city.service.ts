import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = environment.URL_BACKEND;

  constructor(private http: HttpClient) { }

  getInformationCity(): Observable<any> {
    const url = `${this.apiUrl }city`;
    return this.http.get<any>(url);
  }
}
