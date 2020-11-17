import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../models/posts.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getPosts(): Observable<Posts[]>{
    return this.http.get<Posts[]>(`${this.config.REST_API_URL}/admin/get-posts`);
  }

  public getSinglePost(id: number): Observable<Posts>{
    return this.http.get<Posts>(`${this.config.REST_API_URL}/admin/single-post/${id}`);
  }

  public addNewPost(data): Observable<Posts>{
    return this.http.post<Posts>(`${this.config.REST_API_URL}/admin/savePost`, data);
  }
}
