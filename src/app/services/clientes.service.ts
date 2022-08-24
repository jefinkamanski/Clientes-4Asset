import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Lista todos os clientes
  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(environment.apiURL + '/clientes')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Busca por um cliente
  getClienteById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(environment.apiURL + '/clientes' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Salva um cliente
  postCliente(cliente: Cliente): Observable<Cliente> {
      return this.httpClient.post<Cliente>(environment.apiURL + '/clientes', JSON.stringify(cliente), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

   // Atualiza um Cliente
   putCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(environment.apiURL + '/' + cliente.id, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

    // Deleta um Cliente
    deleteCliente(cliente: Cliente) {
      return this.httpClient.delete<Cliente>(environment.apiURL + '/' + cliente.id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
