import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.config.REST_API_URL}/admin/getAllArticles`);
  }

  public getSingleArticle(id): Observable<Article>{
    return this.http.get<Article>(`${this.config.REST_API_URL}/admin/getSingleArticle/${id}`);
  }

  public saveArticle(data){
    return this.http.post(`${this.config.REST_API_URL}/admin/saveArticle`, data);
  }

  public updateArticleAction(data){
    return this.http.patch(`${this.config.REST_API_URL}/admin/updateArticle`, data);
  }

  public deleteArticle(id){
    return this.http.delete(`${this.config.REST_API_URL}/admin/deleteArticle/${id}`);
  }
}
