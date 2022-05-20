import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import games from '../resource/games.json';
import getServiceSingleton from "../service/FrogService";


export default function Lobby(props) {
  const [game, mode] = props.game.split('-');
  const gameMetadata = games[game];

  const [players, setPlayers] = useState(props.players);

  const handleMessage = message => {
    switch (message.type) {
      case 'player-joined':
        //alert('Player joined: ' + message.player);
        setPlayers([...players, message.player]);
        break;
      case 'player-left':
        //alert('Player left: ' + message.player);
        setPlayers(players.filter(player => player !== message.player));
        break;
      default:
  
    }
  }

  const service = getServiceSingleton(handleMessage);

  return (
    <div>
      <Card border='primary' style={{}}>
        <Card.Header>{gameMetadata.title}</Card.Header>
        <Card.Body>
          <Card.Text>Room ID: {props.id}</Card.Text>
          <Card.Text>Participants: {players.length}/{gameMetadata.modes.multiplayer.minPlayers}</Card.Text>
          {players.map(player => 
            <Card.Text>{player}</Card.Text>
          )}
          <Button variant='primary' onClick={() => service.sendMessage({type:'ready'})}>Ready</Button>
          <Button variant='primary' onClick={() => service.leaveGame(props.id)}>Leave</Button>
        </Card.Body>
      </Card>
    </div>
  )
}