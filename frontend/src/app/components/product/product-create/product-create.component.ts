import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

product: Product = {
  name:'',
  price: null
}
// Importando o serviço
  constructor(private prductService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    // Metodo subscribe notifica quando a mensagem chegar
    this.prductService.create(this.product).subscribe(() => {
      this.prductService.showMessage('Produto criado com sucesso!') // Emitindo a mensagem
      this.router.navigate(['/products']) // Retornando para a página de produtos
    })
  }
  cancel(): void {
    this.router.navigate(['/products'])
  }
}
