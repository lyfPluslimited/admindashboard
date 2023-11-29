import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  public REST_API_URL = 'http://167.99.234.178/app/public/api' 

  getConsultationPeriod(){
    return this.http.get(`${this.REST_API_URL}/admin/get-consultation-period`)
  }

  updateConsultationPeriod(data){
    return this.http.patch(`${this.REST_API_URL}/admin/update-consultation`, data);
  }
  
}
