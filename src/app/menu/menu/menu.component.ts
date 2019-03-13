import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from 'src/app/services/product.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('scroller') scroller;
  productsIndexer = 0;
  batchSize = 30;
  products = [];
  searchTimer;
  lock = true;
  filteredProducts = [];
  constructor(private rout: Router, private productService: ProductService, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getProductsBatch(this.productsIndexer).subscribe((data: any) => {
      this.products = data;
      this.productsIndexer += 30;
    })
  }

  Scrolled(event) {
    const tableViewHeight = event.target.offsetHeight;
    const tableScrollHeight = event.target.scrollHeight; // length of all table
    const scrollLocation = event.target.scrollTop; // how far user scrolled
    const buffer = 10;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (this.lock) {
      if (scrollLocation > limit) {
        this.lock = false;
        setTimeout(() => {
          this.httpService.getProductsBatch(this.productsIndexer).subscribe((data: any) => {
            this.scroller.scrollToIndex(15);
            if (data.length > 0) {
              this.products = data;
              if (data.length < 30) {
                this.manageFinalBatch();
              }
              this.productsIndexer += data.length;
            }
            this.lock = true;
          })
        }, 100);
      } else if (event.target.scrollTop === 0) {
        setTimeout(() => {
          this.httpService.getProductsBatch(this.productsIndexer - 2 * (this.batchSize)).subscribe((data: any) => {
            this.scroller.scrollToIndex(15);
            this.products = data;
            this.productsIndexer -= this.batchSize;
            this.lock = true;
          })
        }, 100);
      }
    }
  }
  clickProduct(prod) {
    this.productService.setSelectedProduct(prod);
    this.rout.navigateByUrl('details');
  }
  sortByName() {
    this.products = this.products.concat(this.products.sort((a, b) => a.product > b.product ? 1 : -1));
  }
  sortByPrice() {
    this.products = this.products.concat(this.products.sort((a, b) => a.price > b.price ? 1 : -1));
  }
  filterInput(txt) {
    this.filteredProducts = [];
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.httpService.getFilteredProducts(txt.value, 10).subscribe((result: any) => {
        this.filteredProducts = result;
      })
    }, 300);
  }
  filterMainList(name) {
    this.httpService.getFilteredProducts(name.value).subscribe((result: any) => {
      this.products = [];
      this.products = result;
      console.log(result);
    })
  }
  manageFinalBatch() {
    for (let index = 0; index < this.batchSize - this.products.length; index++) {
      this.products.push({});
    }
  }
}
