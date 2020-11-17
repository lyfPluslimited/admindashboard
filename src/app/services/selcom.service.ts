import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Selcom } from '../models/selcom.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SelcomService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getSelcomPayments(): Observable<Selcom[]>{
    return this.http.get<Selcom[]>(`${this.config.REST_API_URL}/admin/get-selcom-payments`);
  }
}
