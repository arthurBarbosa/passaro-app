import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public pedido: Pedido = new Pedido('', '', '', '');

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  // controles de validacao
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public pagamentoValido: boolean;

  //estados primitivos dos campos (pristine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  // controlar botao confirmar botao compra

  public formEstado: string = 'disabled';

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    // this.ordemCompraService.efetivarCompra();
  }

  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco;
    // console.log(this.endereco);
    this.enderecoEstadoPrimitivo = false;
    
    if (this.endereco.length > 3) {
      this.enderecoValido = true;
    } else {
      this.enderecoValido = false;
    }
    this.habilitaForm();
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero;
   // console.log(this.numero);
   this.numeroEstadoPrimitivo = false;

   if (this.numero.length > 0) {
    this.numeroValido = true;
   } else {
     this.numeroValido = false;
    }
    this.habilitaForm();

  }

  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento;
    console.log(this.complemento);
    this.formaPagamentoEstadoPrimitivo = false;
    this.complementoEstadoPrimitivo = false;
    if (complemento.length > 0) {
      this.complementoValido = true;
    }
    this.habilitaForm();
  }

  public atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento;
    console.log(this.formaPagamento);

    if (formaPagamento.length > 5) {
      this.pagamentoValido = true;
    } else {
      this.pagamentoValido = false;
    }
    this.habilitaForm();
  }

  public habilitaForm() {
    if (this.enderecoValido == true && this.numeroValido == true && this.pagamentoValido == true) {
      this.formEstado = '';
    } else {
      this.formEstado = 'disabled';
    }
  }

  public confirmarCompra(): void {
    
    this.pedido.endereco = this.endereco;
    this.pedido.numero = this.numero;
    this.pedido.complemento = this.complemento;
    this.pedido.formaPagamento = this.formaPagamento;
   
    this.ordemCompraService.efetivarCompra(this.pedido).subscribe();
  }

}
