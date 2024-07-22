import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../types/category';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
http = inject(HttpClient)
  constructor() { }
  getCategoryList(){
    return this.http.get<Category[]>("https://localhost:7274/api/Category ")
  }


}
