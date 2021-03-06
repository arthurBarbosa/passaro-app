import { Injectable } from '@angular/core';
import { Pedido } from './shared/pedido.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from './app.api';
import { catchError, map } from 'rxjs/operators';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {

  constructor(private http: HttpClient) { }

  public efetivarCompra(pedido: Pedido): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${URL_API}/pedidos`,
      pedido,
      httpOptions).pipe(
        map((resposta: Response) => {
         JSON.stringify(resposta['id']);
         console.log( JSON.stringify(resposta['id']))
        })
      );
  }
}
