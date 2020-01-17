import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap } from 'rxjs/operators';

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
     switchMap((termo: string) => {
       console.log('requisicao http');
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
