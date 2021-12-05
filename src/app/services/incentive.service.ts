import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class IncentiveService {

  constructor(private config: ConfigService, private http: HttpClient) { }

  public updateIncentiveStatus(id) {
      return this.http.patch(`${this.config.REST_API_URL}/incentive/${id}`,{})
  }

  public displayIncentiveDoctors(): Observable<[]>{
    return this.http.get<[]>(`${this.config.REST_API_URL}/getIncentiveDoctors`)
  }

  public setKpiPricesForDoctor(data, id){
    return this.http.post(`${this.config.REST_API_URL}/storeKpiPrices/${id}`, data)
  }

}
