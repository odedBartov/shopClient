import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponentComponent implements OnInit {
  currentProduct;
  constructor(private service: ProductService, private rout: Router) { }

  ngOnInit() {
    this.currentProduct = this.service.getSelectedProduct();
  }

  goBack() {
    this.rout.navigateByUrl('menu');
  }
}
