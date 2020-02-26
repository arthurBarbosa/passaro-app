import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../../src/app/shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  public itens: ItemCarrinho[] = [];

  constructor() { }

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }

  public incluirItem(oferta: Oferta): void {
    console.log('oferta recebida ', oferta);
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    );
    /** verifica se o item nao existe dentro do this.itens */
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if(itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;

    } else {
      this.itens.push(itemCarrinho);
    }

  }

  public totalCarrinhoCompras(): number {
    let total: number = 0;

    this.itens.map((item: ItemCarrinho) => {
      total = total + (item.valor * item.quantidade);
    })

    return total;

  }

  public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
    }
  }

  public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade -= 1;

      if (itemCarrinhoEncontrado.quantidade === 0) {
        this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
      }

    }
  }

  public limpaCarrinho(): void {
    this.itens = [];
  }



}
