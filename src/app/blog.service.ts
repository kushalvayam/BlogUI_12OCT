import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './blog-post.model';
import { catchError,throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:5206/api/blog'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getBlogPosts(): Observable<any> {
    debugger;
    //this.apiUrl=this.apiUrl.concat("/"+'GetAll');
    //return this.http.get<BlogPost[]>(this.apiUrl);
    return this.http.get<any>(this.apiUrl, {headers:new HttpHeaders({'Content-Type':'application/json'}) 
   });
  }
  addBlogPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, post);
  }

  updateBlogPost(post: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${post.Id}`, post);
  }

  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
