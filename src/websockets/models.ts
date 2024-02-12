import WebSocket from 'ws';

export enum WSMessageType {
  CREATE_SESSION = 'CREATE_SESSION',
  SESSION_CREATED = 'SESSION_CREATED',
  SESSION_JOINED = 'SESSION_JOINED',
  START_GAME = 'START_GAME',
  JOIN_SESSION = 'JOIN_SESSION',
  GAME_UPDATE = 'GAME_UPDATE',
  RESTART_GAME = 'RESTART_GAME',
  SESSION_ERROR = 'SESSION_ERROR',
  ERROR = 'ERROR',
  USER_DISCONNECTED = 'USER_DISCONNECTED'
}

export interface IGamePayload  {
  type: WSMessageType,
  sessionId?: string,
  clientId?: string,
  gameStatus?: IGameStatus,
  players?: IPlayer[],
  message?: string,
}

export interface ITelegramData  {
    user: {
      id: string,
      first_name: string, 
      last_name: string, 
      language_code: string, 
      username: string,
    }
    start_param?: string,
  }
  
export interface IClient  {
      clientId: string;
      ws: WebSocket;
    }
  
export interface IBaseClient  {
      clientId: string,
      userName: string,
      tgId: string,
      avatar?: string,
    }
  
export interface IPlayer extends IBaseClient {
      score: number,
      isCurrentMove: boolean,
      isHost: boolean,
    }
  
export interface IGameStatus  {
      currentMovePlayer?: IPlayer,
      currentMoveClientId?: string,
      previousMoveClientId?: string,
      currentWord?: string,
      status: 'started' | 'lobby',
      playedWords: string[],
    }
  
export interface ISession  {
      id: string;
      players: IPlayer[];
      gameStatus: IGameStatus;
    }

export interface ISessionArray { 
      [id: string]: ISession 
    }

export interface IClientArray { 
      [clientId: string]: IClient
    }