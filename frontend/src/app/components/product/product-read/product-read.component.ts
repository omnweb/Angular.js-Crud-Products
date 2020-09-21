import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  // Criando o atributo produto do tipo lista de produtos
  products: Product[]
  displayedColumns = ['id', 'name', 'price']

  // Declarando no construror
  constructor(private productService: ProductService) { }

  ngOnInit(): void { 
    this.productService.read().subscribe( products => {
      this.products = products
      console.log(products)
    })
  }

}
