import { Card, Container, Image } from "react-bootstrap";
import {Divider} from "react";

export default function GameListing(props) {

  const onClick = () => {
    alert('joining game of ' + props.name + '!');
  }

  return <Card border='primary' style={{height:'12rem'}}>
    <Card.Header>{props.name}</Card.Header>
    <Card.Body style={{display: 'flex', flexDirection: 'row'}}>
      <Container style={{width:'12rem', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        <Image src='./chess/piece/pawn.png' />
      </Container>
      <Container style={{float:'left'}}>
        <Card.Text style={{height:'4rem'}}>TEXT</Card.Text>
        <button onClick={onClick}>PLAY</button>
      </Container>
    </Card.Body>
  </Card>
}