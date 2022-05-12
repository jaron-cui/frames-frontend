import axios from "axios";
import { client } from "websocket";

const url = 'https://localhost:8080';

export default class FrogService {
  constructor(client) {
    this.initWebSocket(client);
  }

  headers() {
    return {
      'headers': {
        'sessionId': this.sessionId
      }
    }
  }

  async createGame(game) {
    axios.post(url + '/game/create/' + game, null, this.headers()).catch(error => {
      alert('Error creating game.');
    });
  }

  async joinGame(gameId) {
    axios.post(url + '/game/join/' + gameId, null, this.headers()).catch(error => {
      alert('Error joining game.');
    });
  }

  async leaveGame(gameId) {
    axios.post(url + '/game/leave/' + gameId, null, this.headers()).catch(error => {
      alert('Error leaving game');
    });
  }

  initWebSocket(client) {
    const ws = new WebSocket("wss://localhost:8080/websocket");
    //const ws = new WebSocket("wss://66.24.95.87:8080/websocket");
    ws.onerror = err => alert('WebSocket connection failed: ' + err.message);
    ws.onopen = function() {
      ws.onclose = () => alert('WebSocket connection closed');
    };
    ws.onmessage = initMessage => {
      this.sessionId = JSON.parse(initMessage.data).sessionId;
      alert('Initialized session: ' + this.sessionId);
      ws.onmessage = message => client.handleMessage(JSON.parse(message.data));
    }
  }
}