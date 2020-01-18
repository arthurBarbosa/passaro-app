import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, interval } from 'rxjs';
import 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      });
    });
 }

}
