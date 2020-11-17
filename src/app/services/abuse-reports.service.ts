import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbuseReports } from '../models/abuse-reports.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AbuseReportsService {

  constructor(private config: ConfigService, private http: HttpClient) { }

  public getAbuseReports(): Observable<AbuseReports[]>{
    return this.http.get<AbuseReports[]>(`${this.config.REST_API_URL}/admin/abuse-reports`);
  }
}
