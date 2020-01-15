import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { HttpClient} from '@angular/common/http';
import { URL_API } from './app.api';

import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) { }


  public getOfertas(): Promise<Oferta[]> {
   return this.http.get(`${URL_API}?destaque=true`)
      .toPromise()
      .then((resposta: any) => resposta);
  }
  
  public getOfertasPorCategoria(categoria: string) {
    return this.http.get(`${URL_API}?categoria=${categoria}`)
      .toPromise()
      .then((resposta: any) => resposta);
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        console.log(resposta[0])
        return resposta[0]
      })
      
  }

}
