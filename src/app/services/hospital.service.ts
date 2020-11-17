import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private config: ConfigService, private http: HttpClient) { }

  public getHospitals(): Observable<Hospital[]>{
    return this.http.get<Hospital[]>(`${this.config.REST_API_URL}/admin/hospital`);
  }

  public getSingleHospital(id): Observable<Hospital>{
    return this.http.get<Hospital>(`${this.config.REST_API_URL}/admin/getSingleHospital/${id}`);
  }

  public changeHospitalVerification(id) {
    return this.http.patch(`${this.config.REST_API_URL}/admin/hospitalStatus/${id}`, {});
  }

  public updateHospital(data){
    return this.http.patch(`${this.config.REST_API_URL}/admin/update-hospital`, data);
  }

  public deleteHospitalAction(id){
    return this.http.delete(`${this.config.REST_API_URL}/admin/delete-hospital/${id}`);
  }

}
