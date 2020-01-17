import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
     debounceTime(1000),
     distinctUntilChanged(),
     switchMap((termo: string) => {
       console.log('requisicao http para api');

       if (termo.trim() === ''){
        return observableOf<Oferta[]>([]);
       }

    return this.ofertasService.pesquisaOfertas(termo);

    })
  );

  this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))

}

  public pesquisa(termoDaPesquisa: string): void {
    console.log('keyup caracter ' + termoDaPesquisa)
    this.subjectPesquisa.next(termoDaPesquisa);
  }
}
