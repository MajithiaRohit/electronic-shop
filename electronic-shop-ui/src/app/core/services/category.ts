import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../../../models/categoryModel';

@Injectable({
  providedIn: 'root',
})

export class CategoryService  {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7271/api/Categories';  


  //Get all categories Featch by API
  getAll(){
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  //Get category by id Featch by API
  getById(id: number){
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  //Create new category Featch by API
  create(data : Partial<Category>){
    return this.http.post(`${this.apiUrl}`, data);
  }

  //Update category Featch by API
  update(data : Partial<Category>){
    return this.http.put(`${this.apiUrl}/${data.id}`, data);
  }

  //Delete category by id Featch by API
  delete(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
