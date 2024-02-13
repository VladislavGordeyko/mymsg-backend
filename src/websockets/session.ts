import { IGamePayload, IPlayer, ISession, WSMessageType } from './models';
import { sendToAllClientsInSession } from './utils';
import { connectedClients, sessions } from './ws';

// Handle a client's request to join an existing game session
export const joinSession = async (data: any, ws: any) => {
  const sessionId = data.sessionId;
  const clientId = data.clientId;
  connectedClients[clientId] = { ws, clientId };

  if (!sessions[sessionId]) {
    // Create a new session with the initiating player
    const newSession: ISession = {
      id: sessionId,
      players: [],
      gameStatus: {status: 'lobby', playedWords: []}
    };
    sessions[sessionId] = newSession;
  }

  const session = sessions[sessionId];
  const player: IPlayer = { ...data.player, score: 0, isCurrentMove: false, clientId};
  if (session.players.length === 0) {
    player.isHost = true;
  }

  console.log('joining', {clientId}, 'players -',session.players);
  session.players.push(player);
  console.log('pushing new player');
  const payload = {
    type: WSMessageType.SESSION_JOINED,
    sessionId,
    gameStatus: session.gameStatus,
    clientId,
    players: session.players,
  };

  // Notify all clients in the session about the new participant
  sendToAllClientsInSession(session, connectedClients, payload);
};


export const startGame = async (data: any) => {
  const sessionId = data.sessionId;
  const session = sessions[sessionId];

  session.gameStatus.status = 'started';

  const payload: IGamePayload = { 
    type: WSMessageType.START_GAME, 
    sessionId,
    gameStatus: session.gameStatus, 
  };

  sendToAllClientsInSession(session, connectedClients, payload);
};
