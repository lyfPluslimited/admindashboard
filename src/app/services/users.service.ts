import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorSessions } from '../models/doctor-sessions.model';
import { User } from '../models/user.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.REST_API_URL}/admin/users`);
  }

  public getDocs(): Observable<[]>{
    return this.http.get<[]>(`${this.config.REST_API_URL}/admin/getDocs`);
  }

  public verifyDoctor(userID){
    return this.http.post(`${this.config.REST_API_URL}/verify-specialist`, {userID})
  }

  public unverifyDoctor(userID){
    return this.http.post(`${this.config.REST_API_URL}/unverify-specialist`, {userID})
  }

  public getUserById(userID): Observable<User>{
    return this.http.post<User>(`${this.config.REST_API_URL}/admin/getUser/${userID}`, {});
  }

  public saveDoctorDetails(data): Observable<User>{
    return this.http.patch<User>(`${this.config.REST_API_URL}/admin/update-doctor`, data);
  }

  public saveFeeDetails(data): Observable<User>{
    return this.http.patch<User>(`${this.config.REST_API_URL}/admin/saveFee`, data);
  }

  public deleteDoctorAction(userID){
    return this.http.post(`${this.config.REST_API_URL}/admin/delete-doctor/${userID}`, {});
  }

  public deleteClientAction(userID){
    return this.http.post(`${this.config.REST_API_URL}/admin/delete-client/${userID}`, {});
  }

  public getDoctorTransactions(id): Observable<DoctorSessions[]>{
    return this.http.get<DoctorSessions[]>(`${this.config.REST_API_URL}/admin/getDoctorPayments/${id}`);
  }

  public getSubscriptions(): Observable<[]>{
    return this.http.get<[]>(`${this.config.REST_API_URL}/subscription`);
  }
}
