import { Server } from 'ws';
import WebSocket from 'ws';
import {  IClientArray, ISessionArray } from './models';
import { handleClose, handleMessage } from './handlers';

// Store connected clients and active sessions
export const connectedClients: IClientArray = {};
export const sessions: ISessionArray = {};

const setupWebSocket = (server: any) => {
  
  const wss = new Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    let clientId = '';
    // const clientId = uuidv4();
    // connectedClients.push(ws);

    // Listen for messages from this client
    ws.on('message', (message: WebSocket.RawData) => {
      const data = JSON.parse(message.toString());
      if (data.type === 'JOIN_SESSION') {
        clientId = data.clientId;
      }
      console.log('MESSAGE', {clientId});
      handleMessage(message, ws);
    });

    // Clean up when a client disconnects
    ws.on('close', () => handleClose(clientId));
  });

  setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(new Date().toTimeString());
    });
  }, 30000);
};



export default setupWebSocket;