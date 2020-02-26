import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { CarrinhoService } from '../carrinho.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, interval } from 'rxjs';
import 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
   // console.log('Oferta - Array de itens do carrinho: ', this.carrinhoService.exibirItens())
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      });
    });
 }

 ngOnDestroy(): void {

 }

 public adicionarItemCarrinho(oferta: Oferta): void{
  this.carrinhoService.incluirItem(this.oferta);
 }

}
