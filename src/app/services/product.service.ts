import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedProduct;
  constructor() { }

  setSelectedProduct(newProduct) {
    this.selectedProduct = newProduct;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }
}
