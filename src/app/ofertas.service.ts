import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { HttpClient} from '@angular/common/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) { }


  public getOfertas(): Promise<Oferta[]> {
   return this.http.get('http://localhost:3000/ofertas')
      .toPromise()
      .then((resposta: any) => resposta);
  }

}
