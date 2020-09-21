import { Product } from './product.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProductService {
  baseUrl= "http://localhost:3001/products";
  
  constructor(private snakBar: MatSnackBar, private http: HttpClient ) { }


  showMessage(msg:string): void{
    this.snakBar.open(msg, 'X', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  // Criando a função de inserir os dados no Json
  create(product:Product): Observable<Product>{
    // Feto isso é porssível mandar requisição para o backend
    return this.http.post<Product>(this.baseUrl, product) //Post retorna um observable
    //Como está sendo inserido um produto com nome e preço, e experado receber o produto com  nome, preço e id
  }

  //Metodo responsável por ler os produtos cadastrados no backend

  read():Observable<Product[]> { // Observabble retorna uma lista de produtos
    return this.http.get<Product[]>(this.baseUrl)
  }
}
