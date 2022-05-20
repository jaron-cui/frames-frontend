import './App.css';
import React, { useState, useEffect } from "react";
import Canvas from "./gameframe/Canvas";
import Home from './page/Home';
import Navigation from "./page/Navigation";
import getServiceSingleton from './service/FrogService';
import Lobby from './page/Lobby';
import Game from './page/Game';

class Client extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

  componentDidMount() {
    this.service = getServiceSingleton(message => this.onMessage(message));
    this.setState({
      page: <Home />
    });
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

  handleAssignment(room) {
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
