import './App.css';
import React, { useState, useEffect } from "react";
import Canvas from "./gameframe/Canvas";

class Client extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionId: undefined
		}
	};

  componentWillMount() {
    this.initWebSocket();
  }

  handleMessage(message) {
    // do actual stuff here later
    alert('Message received: ' + message);
  }

  initWebSocket() {
    const ws = new WebSocket("wss://localhost:8080/websocket");
    ws.onerror = err => alert('WebSocket connection failed: ' + err.message);
    ws.onopen = function() {
      ws.onclose = () => alert('WebSocket connection closed');
    };
    ws.onmessage = initMessage => {
      this.state.sessionId = JSON.parse(initMessage.data).sessionId;
      alert('Initialized session: ' + this.state.sessionId);
      ws.onmessage = this.handleMessage;
    }
  }

	render() {
		return (
			<div>
        		<Canvas name="canvas" width={600} height={540} />
				<div>
					hi
				</div>
			</div>
		  );
	}
}

export default Client;
