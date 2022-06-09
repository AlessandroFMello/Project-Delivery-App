import { Container, Card, CardGroup } from 'react-bootstrap';
import React from 'react';

export default function OrderCard() {
  function rightBottomCard() {
    return (
      <Card>
        <Card.Title>Preço aqui</Card.Title>
      </Card>
    );
  }

  function rightTopCard() {
    return (
      <Card>
        <Card.Title>Data aqui</Card.Title>
      </Card>
    );
  }

  function rightCards() {
    return (
      <Card>
        { rightTopCard() }
        { rightBottomCard() }
      </Card>
    );
  }

  function middleCard() {
    return (
      <Card>
        <Card.Title>Status aqui</Card.Title>
      </Card>
    );
  }

  function leftCard() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Pedido</Card.Title>
          <Card.Text>Num aqui</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  function innerCards() {
    return (
      <CardGroup>
        { leftCard() }
        { middleCard() }
        { rightCards() }
      </CardGroup>
    );
  }

  return (
    <Container>
      { innerCards() }
    </Container>
  );
}
