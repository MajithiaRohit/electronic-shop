import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../../../models/productModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7271/api/Products';

  //Get all products Featch by API
  getAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  //Get product by id Featch by API
  getById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  //Create new product Featch by API
  create(data: Partial<Product>) {
    return this.http.post(this.apiUrl, data);
  }

  //Update product Featch by API
  update(data: Partial<Product>) {
    return this.http.put(`${this.apiUrl}/${data.id}`, data);
  }

  //Delete product by id Featch by API
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
