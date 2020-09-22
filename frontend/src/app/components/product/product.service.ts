import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ProductService {
  baseUrl= "http://localhost:3001/products";
  
  constructor(private snakBar: MatSnackBar, private http: HttpClient ) { }


  showMessage(msg:string, isError: boolean = false): void{
    this.snakBar.open(msg, 'X', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-success'] // Aplicando css na mensagem de sucesso
    })
  }

  // Criando a função de inserir os dados no Json
  create(product:Product): Observable<Product>{
    // Feto isso é porssível mandar requisição para o backend
    return this.http.post<Product>(this.baseUrl, product)//Post retorna um observable
      .pipe(
        map((obj) => obj),
        catchError(e => this.handlerError(e))
    ) 
      }
    //Função para tratar o erro
    handlerError(e: any): Observable<any>{
      console.log(e)
      this.showMessage('Ocorreu um erro!', true)
      return EMPTY
    }
    //Como está sendo inserido um produto com nome e preço, e experado receber o produto com  nome, preço e id
  

  //Método responsável por ler os produtos cadastrados no backend

  read():Observable<Product[]> { // Observabble retorna uma lista de produtos
    return this.http.get<Product[]>(this.baseUrl)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
  ) 
  }

  // Método responsável por trazer o produto preenchido para ser alterado
  readById(id: number):Observable<Product>{
    const url = `${this.baseUrl}/${id}` //Passando o id na url
    return this.http.get<Product>(url)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
  ) 
  }

  // Método responsável por fazer a alteração do produto
  update(product: Product):Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
  ) 
  }

  delete(id: number):Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)
    .pipe(
      map((obj) => obj),
      catchError(e => this.handlerError(e))
  ) 
  }
}
