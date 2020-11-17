import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getTopics(): Observable<Topic[]>{
    return this.http.get<Topic[]>(`${this.config.REST_API_URL}/admin/topics`);
  }

  public saveTopic(data){
    return this.http.post(`${this.config.REST_API_URL}/admin/saveTopics`, data)
  }

  public getSingleTopic(id): Observable<Topic>{
    return this.http.get<Topic>(`${this.config.REST_API_URL}/admin/getSingleTopic/${id}`);
  }

  public deleteTopic(id){
    return this.http.delete(`${this.config.REST_API_URL}/admin/deleteTopic/${id}`);
  }

}
