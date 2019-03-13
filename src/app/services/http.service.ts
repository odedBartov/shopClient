import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  batchSize = 30;

  getProductsBatch(index) {
    return this.http.get("http://localhost:8080/products/getProductsBatch/" + index);
  }
  getFilteredProducts(name, limit = this.batchSize) {
    return this.http.get("http://localhost:8080/products/searchProducts/" + name + '/' + limit);
  }
}
