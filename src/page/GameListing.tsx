import { Tab } from "bootstrap";
import React from "react";
import { Button, Card, Container, Image, Tabs } from "react-bootstrap";
import placeholder from '../resource/chess/piece/pawn.png';
import games from '../resource/games.json';
import getServiceSingleton from "../service/FrogService";

type GameListingProps = {
  name: string
}

export default function GameListing(props: GameListingProps) {
  const name: string = props.name;
  const game = games[name];
  const service = getServiceSingleton();

  const onClick = (mode) => {
    service.createGame(name, mode);
  }

  return (
    <div style={{paddingTop:'20px'}}>
      <Card border='primary' style={{height:'14rem'}}>
        <Card.Header>{game.title}</Card.Header>
        <Card.Body style={{display: 'flex', flexDirection: 'row'}}>
          <Container style={{width:'12rem', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
            <Image src={placeholder} />
          </Container>
          <Container style={{float:'left'}}>
            <Tabs
              defaultActiveKey={Object.keys(game.modes)[0]}
              transition={false}
              className="mb-3">
              {Object.keys(game.modes).map(id => {
                const mode = game.modes[id];
                return (
                  <Tab eventKey={mode.title} title={mode.title} key={mode.title}>
                    <Card.Text>{mode.description}</Card.Text>
                    <Button variant='primary' onClick={() => onClick(id)}>Play</Button>
                  </Tab>
                );
              })}
            </Tabs>
          </Container>
        </Card.Body>
      </Card>
    </div>);
}