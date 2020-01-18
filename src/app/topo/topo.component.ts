import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';
import { of as observableOf} from 'rxjs';



@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
   .pipe(
     debounceTime(1000), // executa acao do switchMap depois de 1 segundo
     distinctUntilChanged(), // faz pesquisas distintas
     switchMap((termo: string) => {
       if (termo.trim() === '') {
         // retorna um observable de array de ofertas vazio
        return observableOf<Oferta[]>([]);
       }
    return this.ofertasService.pesquisaOfertas(termo);
    }),
    catchError((err: any) => {
      return observableOf<Oferta[]>([]);
    })
  );

}

  public pesquisa(termoDaPesquisa: string): void {
    this.subjectPesquisa.next(termoDaPesquisa);
  }
}
