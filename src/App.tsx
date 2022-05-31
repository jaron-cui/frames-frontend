import './App.css';
import React, { useState, useEffect } from "react";
import Canvas from "./gameframe/Canvas";
import Home from './page/Home';
import Navigation from "./page/Navigation";
import getServiceSingleton from './service/FrogService';
import Lobby from './page/Lobby';
import Game from './page/Game';

type ClientState = {
  service: any,
  page: JSX.Element;
}

class Client extends React.Component<any, ClientState> {
  state: ClientState = {
    service: 'blehbleh',
    page: <Home />
  };

	constructor(props: any) {
		super(props);
	}

  componentDidMount() {
    this.setState({
      service: getServiceSingleton((message: any) => this.onMessage(message))
    })
  }

  onMessage(message) {
    switch (message.type) {
      case 'assignment':
        this.setState({
          page: this.handleAssignment(message.room)
        });
        break;
    };
  }

  handleAssignment(room): JSX.Element {
    if (room === null) {
        return <Home />;
    }

    switch (room.type) {
      case 'lobby':
        return <Lobby {...room} />;
      default:
        return <Game {...room} />;
    }
  }

	render() {
		return (
			<div>
      <Navigation/>  
        {this.state.page}
        		<Canvas name="canvas" width={600} height={540}/>
				<div>
					hi
				</div>
			</div>
		  );
	}
}

export default Client;
