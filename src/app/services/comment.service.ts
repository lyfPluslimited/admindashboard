import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private config: ConfigService, private http: HttpClient) { }

  public getComments(): Observable<Comments[]>{
    return this.http.get<Comments[]>(`${this.config.REST_API_URL}/admin/get-comments`);
  }
}
