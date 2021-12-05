import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public generateQR(id) {
      return this.http.get(`${this.config.REST_API_URL}/generateQRCode/${id}`);
  }

} 
