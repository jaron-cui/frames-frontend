import React, { useState, useEffect } from "react";
import SockJsClient from 'react-stomp';

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
		  );
	}

}

export default Client;
