import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import SockJsClient from 'react-stomp';
import Canvas from "./Canvas";


//const worker = new Worker("worker.js");
//const canvas = <Canvas name="canvas" width={400} height={300} worker={worker}/>;
//const animator = new Animator("canvas");

class Client extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lastMessage: "",
			name: "Theo",
		}
	};

	onMessage = (message) => {
		console.log(message);
		this.setState({lastMessage : message.content});
	}
	sendMessage = () => {
        this.clientRef.sendMessage('/app/hello', JSON.stringify({
            name: this.state.name,
        }));
    };
	handleChange = async function(event) {
		await this.setState({name : event.target.value});
		this.sendMessage()
	}
	render() {
		return (
			<div>
        		<Canvas name="canvas" width={400} height={300} />
				<div>
					<SockJsClient url={ "http://localhost:8080/gs-guide-websocket" }
					topics={["/topic/response"]}
					onConnect={ () => { this.sendMessage() }}
					onDisconnect={() => {
						console.log("Disconnected");
					}}
					onMessage={ (msg) => {this.onMessage(msg)} } 
					ref={(client) => {this.clientRef = client}}
					/>
					<input type="text" 
					name="name"
					value={this.state.name}
					onChange={ (event) => {this.handleChange(event)}}
					/>
					<span>{ this.state.lastMessage }</span>
				</div>
			</div>
		  );
	}
}

export default Client;
