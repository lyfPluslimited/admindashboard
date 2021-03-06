import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmedVisit, HomeService } from '../models/home-service.model';
import { User } from '../models/user.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeServicesService {

  constructor(private config: ConfigService, private http: HttpClient) { }

  public getServices(): Observable<HomeService[]>{
    return this.http.get<HomeService[]>(`${this.config.REST_API_URL}/services`);
  }

  public getDoctors(id): Observable<User[]>{
    return this.http.get<User[]>(`${this.config.REST_API_URL}/services/doctors/${id}`);
  }

  public addService(data){
    return this.http.post(`${this.config.REST_API_URL}/services/add`, data);
  }

  public addDoctorToService(data){
    return this.http.post(`${this.config.REST_API_URL}/services/add/doctor`, data);
  }

  public editService(data, id){
    return this.http.post(`${this.config.REST_API_URL}/services/update/${id}`, data);
  }

  public deleteService(id){
    return this.http.delete(`${this.config.REST_API_URL}/services/delete/${id}`);
  }

  public deleteDoctorFromService(id){
    return this.http.delete(`${this.config.REST_API_URL}/services/delete/doctor/${id}`);
  }

  public getConfirmedVisits(): Observable<ConfirmedVisit[]>{
    return this.http.get<ConfirmedVisit[]>(`${this.config.REST_API_URL}/services/visits`);
  }

  public approveOrDisapproveDoctor(homeserviceid, doctorid){
    return this.http.get(`${this.config.REST_API_URL}/services/approvalstatus/${homeserviceid}/${doctorid}`)
  }
}
