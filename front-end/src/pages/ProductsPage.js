import React from 'react';
import { Navbar } from 'react-bootstrap';

export default function ProdutosPage() {
  return (
    <div>
      <Navbar className="navBar">
        <a className="navBar-a" href="/customer/checkout">Produtos</a>
        <a className="navBar-a" href="/customer/orders"> Meus Pedidos</a>
        <a className="navBar-a" href="/register"> pessoa</a>
        <a className="navBar-a" href="/login">Sair</a>
      </Navbar>
    </div>
  );
}
