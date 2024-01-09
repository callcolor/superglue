import { Server, Socket } from 'socket.io';
import { log } from './logger';

type ModMessageHandler = (io: Server, socket: Socket, message: string) => void;

type ViewerMessageHandler = (io: Server, socket: Socket, message: any) => void;

export const handleModMessage: ModMessageHandler = (io, socket, message) => {
  log('handleModMessage', message);
  process.stdout.write(message);
};

export const handleViewerMessage: ViewerMessageHandler = (io, socket, message) => {
  log('handleViewerMessage', message);
  socket.send(message);
};
