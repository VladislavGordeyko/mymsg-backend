import { IGamePayload, IPlayer, IClientArray, ISession } from './models';


// Get a list of players that remain after removing a specified player by client ID.
export const getRemainingPlayers = (players: IPlayer[], clientId: string) : IPlayer[] => {
  return players.filter(player => player.clientId !== clientId);
};

// Sends a payload to all clients within a specified session.
export const sendToAllClientsInSession = (session: ISession, connectedClients: IClientArray, payload: IGamePayload) => {
  session.players.forEach(user => {
    connectedClients[user.clientId].ws.send(JSON.stringify(payload));
  });
};

// Randomly selects a player from a list to make the next move.
export const getRandomPlayerForNextMove = (players: IPlayer[]) => {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
};