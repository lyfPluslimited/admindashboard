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
      return this.http.get(`${this.config.REST_API_URL}/incentive/${id}`)
  }

  public displayIncentiveDoctors(): Observable<[]>{
    return this.http.get<[]>(`${this.config.REST_API_URL}/getIncentiveDoctors`)
  }

  public setKpiPricesForDoctor(data, id){
    return this.http.post(`${this.config.REST_API_URL}/storeKpiPrices/${id}`, data)
  }

  public getKpisDoneInTracking(doctorId){
    return this.http.get(`${this.config.REST_API_URL}/getDoctorTrackingKpis/${doctorId}`)
  }

  public makePayment(doctorId){
    return this.http.get(`${this.config.REST_API_URL}/incentivePayment/${doctorId}`)
  }

  public getGeneralTracking(doctorId){
    return this.http.get(`${this.config.REST_API_URL}/getGeneralTrackings/${doctorId}`)
  }

  public getDoctorKpiPrices(id){
    return this.http.get(`${this.config.REST_API_URL}/doctorKpiPrices/${id}`)
  }

  public udpateKpiPricesForDoctor(data, id){
    return this.http.post(`${this.config.REST_API_URL}/updateDoctorKpiPrices/${id}`, data)
  }

  public getKpis(){
    return this.http.get(`${this.config.REST_API_URL}/displayKPIs`)
  }

  public updateKpiQuantities(data){
    return this.http.post(`${this.config.REST_API_URL}/updateKpiQuantity`, data)
  }

  public doctorPrices(doctorId){
    return this.http.get(`${this.config.REST_API_URL}/doctorKPIprices/${doctorId}`)
  }

}
