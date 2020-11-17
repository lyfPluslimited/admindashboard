import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Specialization } from '../models/specialization.model';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${this.config.REST_API_URL}/admin/specialization`);
  }

  public saveSpecialization(formData){
    return this.http.post(`${this.config.REST_API_URL}/admin/save-specialization`, formData);
  }

  public updateSpecialization(data){
    return this.http.patch(`${this.config.REST_API_URL}/admin/update-specialization`, data);
  }

  public deleteSpecialization(id){
    return this.http.delete(`${this.config.REST_API_URL}/admin/delete-specialization/${id}`);
  }
}
