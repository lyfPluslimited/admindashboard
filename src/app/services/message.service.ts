import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private config: ConfigService, private http: HttpClient) { }

  public getMessages(): Observable<Message[]>{
    return this.http.get<Message[]>(`${this.config.REST_API_URL}/admin/get-messages`)
  }
}
