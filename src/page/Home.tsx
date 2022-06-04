import React, { useState, useEffect } from "react";
import GameListing from "./GameListing";
import games from '../resource/games.json';
import { Button, Card } from "react-bootstrap";
import getServiceSingleton from "../service/FrogService";

export default () => {
  const service = getServiceSingleton();
  const [roomIdInput, setRoomIdInput] = useState();

  const handleChange = (event: any) => {
    setRoomIdInput(event.target.value);
  }

  const onClickJoin = () => {
    service.joinGame(roomIdInput);
  }

  return <div>
    <div style={{marginInline:'40px'}}>
      <div style={{paddingTop:'30px'}}>
        <Card border='primary'>
          <Card.Header>Join an Existing Lobby</Card.Header>
          <Card.Body style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{paddingRight:'10px'}}>
              <input type='text' value={roomIdInput} onChange={handleChange} />
            </div>
            <Button variant='primary' onClick={onClickJoin}>Join</Button>
          </Card.Body>
        </Card>
      </div>
      {Object.keys(games).map(id => <GameListing name={id} key={id} />)}
    </div>
  </div>
}