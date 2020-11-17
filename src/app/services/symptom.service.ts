import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Symptom } from '../models/symptom.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getSymptoms(): Observable<Symptom[]>{
    return this.http.get<Symptom[]>(`${this.config.REST_API_URL}/admin/symptoms`)
  }

  public saveSymptom(name){
    console.log('the data is ', name)
    return this.http.post(`${this.config.REST_API_URL}/admin/save-symptom`, {name});
  }

  public deleteSymptom(id){
    return this.http.delete(`${this.config.REST_API_URL}/admin/delete-symptom/${id}`);
  }
}
