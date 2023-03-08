import { RemoteSocket, Server, ServerOptions, Socket } from 'socket.io';
import { Constants } from './constants.js';
import debug from 'debug';

const { SOCKET_PORT } = Constants;
const log = debug('app:socket:io');

let socketIO: SocketIO;
let io: Server;

const initiateSockets = (server: any) => {
  log('Initiating Socket');
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', (socket) => {
    log('Socket Initiated: Client Connected');
    socketIO = new SocketIO(socket);
    socketIO.sendMessage('hello', 'world');
  });
};

const checkSocketConnection = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return true;
};

class SocketIO {
  constructor(private socket: Socket) {}

  sendMessage(room: string, message: string | Object) {
    log('Socket Send Message');
    log('Room: ', room);
    log('Message: ', message);
    this.socket.emit(room, message);
  }

  listenToMessage(room: string) {
    log('Socket Receive Message');
    log('Room: ', room);
    this.socket.on(room, (args) => {
      log('Args: ', args);
    });
  }
}

export { socketIO, initiateSockets };

// const data = {
//   init: (server: any) => {
//     io = new Server(server);
//     return io;
//   },
//   getIo: () => {
//     if (!io) throw new Error('Socket.io not initialized');
//     return io;
//   },
// };
