import axios from "axios";

const url = 'https://localhost:8080';

class FrogService {
  constructor() {
    this.messageHandlers = [];
    this._initWebSocket();
  }

  headers() {
    return {
      'headers': {
        'sessionId': this.sessionId
      }
    }
  }

  async createGame(game, mode) {
    axios.post(url + `/game/create/${game}-${mode}`, null, this.headers()).catch(error => {
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

  sendMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  onMessage(message) {
    const data = JSON.parse(message.data);
    this.messageHandlers.forEach(messageHandler => messageHandler(data));
  }

  _initWebSocket() {
    const ws = new WebSocket("wss://localhost:8080/websocket");
    this.ws = ws;
    //const ws = new WebSocket("wss://66.24.95.87:8080/websocket");
    ws.onerror = err => alert('WebSocket connection failed: ' + err);
    ws.onopen = function() {
      ws.onclose = () => alert('WebSocket connection closed');
    };
    ws.onmessage = initMessage => {
      this.sessionId = JSON.parse(initMessage.data).sessionId;
      alert('Initialized session: ' + this.sessionId);
      ws.onmessage = message => this.onMessage(message);
    }
  }
}

const service = new FrogService();
export default function getServiceSingleton(messageHandler) {
  if (messageHandler) {
    service.messageHandlers.push(messageHandler);
  }
  return service;
}