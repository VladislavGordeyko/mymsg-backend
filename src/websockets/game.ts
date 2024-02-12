import WebSocket from 'ws';
import {  sendToAllClientsInSession } from './utils';
import { connectedClients, sessions } from './ws';
import { sendSessionError } from './error';
import { IGamePayload, IGameStatus, WSMessageType } from './models';



export const gameUpdate = (data: any, ws: WebSocket) => {
  const sessionId = data.sessionId;
  const previousMoveClientId = data.clientId;
  const selectedPlayer = data.selectedPlayer;
  const word = data.word;

  if (!sessions[sessionId]) {
    sendSessionError(ws, 'Session not found!');
    return;
  }
  const session = sessions[sessionId];
  if (session.gameStatus?.currentWord) {
    session.gameStatus?.playedWords.push(session.gameStatus?.currentWord);
  }
  
  const gameStatus : IGameStatus = {...session.gameStatus, currentMovePlayer: selectedPlayer, currentMoveClientId: selectedPlayer.clientId , currentWord: word, previousMoveClientId};
  session.gameStatus = gameStatus;

  const payload : IGamePayload = {
    type: WSMessageType.GAME_UPDATE,
    gameStatus,
    players: session.players,
  }; 
      
  // Notify all clients in the session about the game update
  sendToAllClientsInSession(session, connectedClients, payload);
};