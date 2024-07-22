import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from '../../types/blog';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  http = inject(HttpClient)
  constructor() { 

  }
  getFeaturedBlog(){
    return this.http.get<Blog[]>(environment.apiUrls+'/api/Blog/featured');
  }
  getAllBlog(){
    return this.http.get<Blog[]>(environment.apiUrls+"/api/Blog");
  }
  getBlogByID(id:number){
    return this.http.get<Blog>(environment.apiUrls+"/api/Blog/"+id);
  }
  editBlog(id:number,blog :Blog){
    return this.http.put(environment.apiUrls +"/api/Blog/BlogidUpdate"+id,blog);

  }
  addBlog(blog :Blog){
    return this.http.post(environment.apiUrls +"/api/Blog",blog);

  }

  deleteBlog(id:number){
    return this.http.delete(environment.apiUrls+"/api/Blog/BlogidDelete"+id);

  }


}
