import { Card, Container, Image } from "react-bootstrap";
import placeholder from '../resource/chess/piece/pawn.png';

export default function GameListing(props) {

  const onClick = () => {
    props.service.createGame(props.name);
  }

  return (
    <Card border='primary' style={{height:'12rem'}}>
      <Card.Header>{props.name}</Card.Header>
      <Card.Body style={{display: 'flex', flexDirection: 'row'}}>
        <Container style={{width:'12rem', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
          <Image src={placeholder} />
        </Container>
        <Container style={{float:'left'}}>
          <Card.Text style={{height:'4rem'}}>TEXT</Card.Text>
          <button onClick={onClick}>PLAY</button>
        </Container>
      </Card.Body>
    </Card>);
}