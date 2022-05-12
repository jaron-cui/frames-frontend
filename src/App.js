import './App.css';
import React, { useState, useEffect } from "react";
import Canvas from "./gameframe/Canvas";
import Home from './page/Home';
import Navigation from "./page/Navigation";
import FrogService from './service/FrogService';
import Lobby from './page/Lobby';

class Client extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

  componentDidMount() {
    this.service = new FrogService(this);
    this.setState({
      page: <Home service={this.service} />
    });
  }

  handleMessage(message) {
    let newPage;
    switch (message.type) {
      case 'assignment':
        newPage = <Lobby gameId={message.lobby.id} service={this.service} />;
        break;
      case 'gameStart':
        newPage = undefined;
        break;
      default:
        alert('no')
    };
    this.setState({
      page: newPage
    });
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
