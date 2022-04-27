import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Canvas from "./gameframe/Canvas";
//import {w3cwebsocket as W3CWebSocket} from 'websocket';
const W3CWebSocket = require('websocket').w3cwebsocket;
//import WebSocket from 'ws';

//const worker = new Worker("worker.js");
//const canvas = <Canvas name="canvas" width={400} height={300} worker={worker}/>;
//const animator = new Animator("canvas");
/*const ws = new W3CWebSocket("ws://localhost:8080/websocket");
ws.onerror = function(err) {
  alert('Connection Error: ' + JSON.stringify(err));
};

ws.onopen = function() {
  alert('WebSocket Client Connected');
};

ws.onclose = function() {
  alert('echo-protocol Client Closed');
};

ws.onmessage = function(e) {
  if (typeof e.data === 'string') {
    alert("Received: '" + e.data + "'");
  }
};*/
class ClientExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lastMessage: "",
			name: "Theo",
		}
    const ws = {}//new W3CWebSocket("ws://localhost:8080/ws");
      /*let ws;
      try {ws = new WebSocket("ws://localhost:8080/ws");} catch (e) {alert(e)}
    

      ws.addEventListener('error', function(event) {
    alert('Connect Error: ' + JSON.stringify(event));
});
ws.addEventListener('close', function(event) {
  alert('Close: ' + event);
});

ws.addEventListener('open', function(connection) {
    alert('WebSocket Client Connected');
});
*/
//client.connect('ws://localhost:8080/', 'echo-protocol');
    /*
    const ws = new WebSocketClient("ws://localhost:8080/");

ws.on('open', function open() {
  console.log('connected');
  ws.send(Date.now());
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function message(data) {
  console.log(`Round-trip time: ${Date.now() - data} ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
});*/
    
    ws.onerror = function(err) {
      alert('Connection Error: ' + JSON.stringify(err));
    };
  
    ws.onopen = function() {
      alert('WebSocket Client Connected');
    };
  
    ws.onclose = function() {
      alert('echo-protocol Client Closed');
    };
  
    ws.onmessage = function(e) {
      if (typeof e.data === 'string') {
        alert("Received: '" + e.data + "'");
      }
    };
    //this.ws = ws;
	};

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

export default ClientExample;
